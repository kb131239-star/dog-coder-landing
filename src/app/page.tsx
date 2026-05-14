'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/ui/file-upload';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Dog, 
  Upload, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  Image as ImageIcon,
  Share2,
  BrainCircuit,
  Loader2,
  HelpCircle,
  PawPrint, // Using PawPrint for a cuter dog element
  Smile, // Representing guardian/happy owner
  Leaf, // For green accents
  Sun, // For yellow accents
  Bone // For a cute treat-like element
} from 'lucide-react';
import axios from 'axios';

export default function LandingPage() {
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleFileChange = (f: File) => {
    setFile(f);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(f);
  };

  const handleAnalyze = async () => {
    if (!text && !file) {
      toast({
        title: "입력 부족",
        description: "강아지의 행동을 설명하거나 사진을 업로드해주세요.",
        variant: "destructive"
      });
      return;
    }

    setAnalyzing(true);
    setResult(null);

    const formData = new FormData();
    if (text) formData.append('text', text);
    if (file) formData.append('file', file);
    if (breed) formData.append('breed', breed);
    if (age) formData.append('age', age);

    try {
      const response = await axios.post('/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data.analysis);
      toast({
        title: "분석 완료",
        description: "강아지의 속마음을 확인해보세요!"
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "분석 실패",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Dog-Coder 강아지 행동 분석',
        text: '우리 강아지의 속마음을 AI로 분석해봤어요!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "링크 복사됨",
        description: "SNS에 공유해보세요!"
      });
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-slate-800"> {/* Changed background to a soft orange */}
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-orange-200"> {/* Softer border */}
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg"> {/* Primary color is now orange */}
              <PawPrint className="w-6 h-6 text-white" /> {/* Changed to PawPrint */}
            </div>
            <span className="text-xl font-bold tracking-tight text-orange-600">Dog-Coder</span> {/* Primary color text */}
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors text-orange-600">이용 방법</a>
            <a href="#use-cases" className="text-sm font-medium hover:text-primary transition-colors text-orange-600">예시 사례</a>
            <Button onClick={() => document.getElementById('analyze-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-secondary hover:bg-green-500 text-white"> {/* Secondary color for CTA */}
              지금 분석하기
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </nav>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge variant="secondary" className="mb-4 px-3 py-1 rounded-full text-sm font-medium bg-yellow-200 text-orange-800 border-none"> {/* Accent yellow */}
                  AI 기반 강아지 심리 분석 서비스
                </Badge>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-[1.1] text-orange-700"> {/* Primary color text */}
                  우리 강아지, <br />
                  <span className="text-green-600">지금 무슨 말</span>을 하고 싶은 걸까요? {/* Secondary green for emphasis */}
                </h1>
                <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
                  텍스트나 사진을 올리면 AI가 강아지의 마음을 1초 만에 번역해 드립니다. <br className="hidden md:block" />
                  반려견과의 더 깊은 교감을 시작해보세요.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/30" onClick={() => document.getElementById('analyze-section')?.scrollIntoView({ behavior: 'smooth' })}>
                    지금 바로 행동 분석하기
                    <PawPrint className="ml-2 w-5 h-5" /> {/* PawPrint for CTA */}
                  </Button>
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg rounded-full border-green-500 text-green-600 hover:bg-green-500 hover:text-white" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
                    더 알아보기
                    <Leaf className="ml-2 w-5 h-5" /> {/* Leaf icon for 'learn more' */}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[800px] h-[800px] bg-yellow-300/30 rounded-full blur-3xl" /> {/* Yellow accent */}
          {/* Dog illustration - placeholder for a charming dog illustration */}
          <motion.div 
            className="absolute bottom-10 left-10 hidden md:block"
            initial={{ opacity: 0, x: -50, rotate: -10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Sun className="w-24 h-24 text-yellow-400 animate-spin-slow" /> {/* Placeholder for dog illustration */}
          </motion.div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-24 bg-green-50"> {/* Green background */}
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-primary">이용 방법</h2> {/* Primary color for heading */}
              <p className="text-slate-600">단 세 단계로 우리 아이의 마음을 알아보세요.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <PawPrint className="w-8 h-8 text-primary" />, // PawPrint icon, primary color
                  title: "행동 묘사 또는 업로드",
                  desc: "강아지의 행동을 글로 쓰거나 사진/영상을 올려주세요."
                },
                {
                  icon: <BrainCircuit className="w-8 h-8 text-secondary" />, // Using BrainCircuit but secondary color
                  title: "Gemini AI 분석",
                  desc: "최신 AI 기술이 행동의 숨겨진 의미를 파악합니다."
                },
                {
                  icon: <Smile className="w-8 h-8 text-accent" />, // Smile icon, accent color
                  title: "결과 및 솔루션 확인",
                  desc: "전문적인 분석 결과와 대처 팁을 즉시 확인하세요."
                }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5, scale: 1.03 }} // Added scale for more fun hover effect
                  className="flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-orange-200 shadow-lg shadow-orange-100" // More rounded corners, softer shadow
                >
                  <div className="mb-6 p-4 bg-yellow-100 rounded-2xl shadow-sm"> {/* Yellow accent for icon background */}
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary">{step.title}</h3> {/* Primary color for title */}
                  <p className="text-slate-700 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Action Section */}
        <section id="analyze-section" className="py-24 bg-yellow-50"> {/* Yellow background */}
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-none shadow-xl shadow-green-100/50 overflow-hidden rounded-3xl"> {/* Rounded card with green shadow */}
                <CardHeader className="bg-primary text-white p-8 rounded-t-3xl"> {/* Primary orange */}
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Search className="w-6 h-6" />
                    행동 분석 시작하기
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary flex items-center gap-2"> {/* Primary color for label */}
                        <PawPrint className="w-4 h-4" />
                        견종 (선택)
                      </label>
                      <input 
                        type="text"
                        placeholder="예: 골든 리트리버"
                        className="w-full h-14 px-4 rounded-2xl border border-orange-300 focus:ring-2 focus:ring-primary/30 outline-none transition-all text-lg"
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary flex items-center gap-2"> {/* Primary color for label */}
                        <Sun className="w-4 h-4" /> {/* Yellow accent for age */}
                        나이 (선택)
                      </label>
                      <input 
                        type="text"
                        placeholder="예: 3살"
                        className="w-full h-14 px-4 rounded-2xl border border-orange-300 focus:ring-2 focus:ring-primary/30 outline-none transition-all text-lg"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-primary flex items-center gap-2"> {/* Primary color for label */}
                      <MessageSquare className="w-4 h-4 text-secondary" />
                      행동 묘사 (텍스트)
                    </label>
                    <Textarea 
                      placeholder="예: 강아지가 자꾸 자기 꼬리를 물려고 뱅글뱅글 돌아요."
                      className="min-h-[120px] text-lg resize-none focus:ring-primary/30 rounded-2xl border-orange-300" /* Softer textarea styling */
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-primary flex items-center gap-2"> {/* Primary color for label */}
                      <Leaf className="w-4 h-4 text-secondary" /> {/* Green accent for image upload */}
                      행동 사진 (이미지)
                    </label>
                    <FileUpload 
                      onFileChange={handleFileChange}
                      className="h-48 flex flex-col items-center justify-center gap-3 bg-orange-50 border-orange-300 hover:bg-orange-100 transition-colors relative overflow-hidden rounded-2xl" // Softer FileUpload styling
                    >
                      {filePreview ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={filePreview} alt="Preview" className="h-full w-full object-contain p-2" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                            <Button variant="secondary" size="sm" onClick={(e) => { e.stopPropagation(); setFile(null); setFilePreview(null); }}>삭제</Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-10 h-10 text-orange-400" /> {/* Orange accent for upload icon */}
                          <div className="text-center">
                            <p className="text-sm font-medium text-slate-700">클릭하거나 파일을 드래그하여 업로드</p>
                            <p className="text-xs text-orange-400 mt-1">PNG, JPG, GIF (최대 10MB)</p> {/* Orange accent */}
                          </div>
                        </>
                      )}
                    </FileUpload>
                  </div>

                  <Button 
                    className="w-full h-16 text-xl font-bold rounded-3xl shadow-lg shadow-primary/40" /* Very rounded button */
                    size="lg"
                    disabled={analyzing}
                    onClick={handleAnalyze}
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                        AI 분석 중...
                      </>
                    ) : (
                      '분석 요청하기'
                    )}
                  </Button>

                  <AnimatePresence>
                    {analyzing && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="pt-8 border-t border-orange-200" // Softer border
                      >
                        <div className="p-6 bg-yellow-100 rounded-2xl border border-orange-200 shadow-md"> {/* Yellow accent background */}
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-primary"> {/* Primary color */}
                              <BrainCircuit className="w-6 h-6" />
                              분석 결과
                            </h3>
                            <Button variant="outline" size="sm" className="gap-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white" onClick={handleShare}>
                              <Share2 className="w-4 h-4" />
                              공유하기
                            </Button>
                          </div>
                          <div className="prose prose-slate max-w-none whitespace-pre-line text-slate-800 leading-relaxed"> {/* Adjusted text color */}
                            {result}
                          </div>
                        </div>
                      </motion.div>
                    )}
                    {result && !analyzing && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-8 border-t border-orange-200"
                      >
                        <div className="p-6 bg-yellow-100 rounded-2xl border border-orange-200 shadow-md">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
                              <BrainCircuit className="w-6 h-6" />
                              분석 결과
                            </h3>
                            <Button variant="outline" size="sm" className="gap-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white" onClick={handleShare}>
                              <Share2 className="w-4 h-4" />
                              공유하기
                            </Button>
                          </div>
                          <div className="prose prose-slate max-w-none whitespace-pre-line text-slate-800 leading-relaxed">
                            {result}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="py-24 bg-orange-100"> {/* Orange background */}
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-primary">자주 묻는 분석 사례</h2>
              <p className="text-slate-600">다른 보호자들은 이런 행동이 궁금했어요.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { q: "보호자를 자꾸 핥아요", a: "애정 표현이기도 하지만, 소금기를 원하거나 불안함의 표시일 수 있습니다.", icon: <PawPrint className="w-5 h-5 text-primary" /> },
                { q: "갑자기 바닥을 파요", a: "잠자리를 정리하거나, 스트레스 해소 또는 야생 본능의 발현일 수 있습니다.", icon: <Leaf className="w-5 h-5 text-secondary" /> },
                { q: "꼬리를 물려고 돌아요", a: "놀이의 일종일 수도 있지만, 강박증이나 항문낭 문제일 수도 있습니다.", icon: <Sun className="w-5 h-5 text-accent" /> },
                { q: "하품을 자꾸 해요", a: "피곤해서일 수도 있지만, 현재 상황이 불편하거나 긴장된다는 신호일 수 있습니다.", icon: <Bone className="w-5 h-5 text-primary" /> }
              ].map((item, idx) => (
                <Card key={idx} className="border-orange-200 hover:shadow-lg hover:shadow-orange-200 transition-all rounded-2xl bg-white"> {/* Softer, rounded cards */}
                  <CardHeader>
                    <CardTitle className="text-lg font-bold flex items-center gap-2 text-primary"> {/* Primary color */}
                      {item.icon}
                      &quot;{item.q}&quot;
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">{item.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-green-100"> {/* Green background */}
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4 text-primary">자주 묻는 질문</h2>
                <p className="text-slate-600">서비스 이용에 대해 궁금한 점을 확인해보세요.</p>
              </div>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  { q: "사진 분석은 얼마나 정확한가요?", a: "최신 멀티모달 AI인 Gemini Flash를 사용하여 강아지의 자세, 표정, 주변 환경을 분석합니다. 다만, 이는 행동학적 해석일 뿐이므로 질병이 의심될 경우 반드시 수의사의 진찰이 필요합니다.", icon: <PawPrint className="w-5 h-5 text-primary" /> },
                  { q: "동영상도 분석이 가능한가요?", a: "현재는 텍스트와 이미지 분석을 우선적으로 지원합니다. 동영상의 경우 핵심 장면을 캡처하여 올려주시면 정확한 분석이 가능합니다.", icon: <Leaf className="w-5 h-5 text-secondary" /> },
                  { q: "분석 결과는 저장되나요?", a: "현재 MVP 버전에서는 개인정보 보호를 위해 별도의 로그인을 지원하지 않으며, 분석 결과는 세션 동안만 유지됩니다. 중요한 결과는 '공유하기' 기능을 통해 따로 저장해두시는 것을 권장합니다.", icon: <Smile className="w-5 h-5 text-accent" /> },
                  { q: "무료로 이용할 수 있나요?", a: "네, 현재 모든 분석 기능은 무료로 제공되고 있습니다.", icon: <Sun className="w-5 h-5 text-primary" /> }
                ].map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="bg-white border border-green-200 rounded-2xl px-6 mb-4 shadow-sm"> {/* Softer border and shadow */}
                    <AccordionTrigger className="text-left font-bold py-4 hover:no-underline text-primary"> {/* Primary color */}
                      <div className="flex items-center gap-3">
                        {item.icon}
                        {item.q}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-700 leading-relaxed pb-6">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-16"> {/* Primary orange for footer */}
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 text-white mb-6">
                <PawPrint className="w-8 h-8" /> {/* PawPrint */}
                <span className="text-2xl font-bold tracking-tight">Dog-Coder</span>
              </div>
              <p className="max-w-xs leading-relaxed text-orange-100"> {/* Lighter orange text */}
                반려견의 행동 속에 숨겨진 진심을 읽어드리는 AI 반려견 행동 분석 서비스입니다.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">링크</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">이용약관</a></li> {/* Yellow accent */}
                <li><a href="#" className="hover:text-yellow-300 transition-colors">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">문의하기</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">SNS</h4>
              <ul className="space-y-4 text-sm">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">인스타그램</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">트위터</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">블로그</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-orange-200 text-sm text-center"> {/* Softer border */}
            <p className="text-orange-100">&copy; 2026 Dog-Coder. All rights reserved.</p> {/* Lighter orange text */}
          </div>
        </div>
      </footer>
    </div>
  );
}
