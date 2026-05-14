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
  Upload, 
  Search, 
  ArrowRight, 
  MessageSquare, 
  Share2,
  BrainCircuit,
  CheckCircle2,
  Loader2,
  PawPrint, 
  Smile, 
  Leaf, 
  Sun, 
  Bone,
  Sparkles,
  Heart,
  Camera
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

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F5] font-sans text-slate-800 overflow-x-hidden">
      {/* Decorative Blobs */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-yellow-200/20 rounded-full blur-[150px] -z-10" />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-orange-100/50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-2 rounded-2xl shadow-lg shadow-orange-200">
              <PawPrint className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400">
              Dog-Coder
            </span>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-10">
            <a href="#how-it-works" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors uppercase tracking-widest">이용 방법</a>
            <a href="#use-cases" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors uppercase tracking-widest">분석 사례</a>
            <Button 
              onClick={() => document.getElementById('analyze-section')?.scrollIntoView({ behavior: 'smooth' })} 
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl px-6 h-12 shadow-xl shadow-orange-200 transition-all hover:scale-105 active:scale-95"
            >
              분석하기
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Badge className="mb-8 px-5 py-2 rounded-full text-xs font-bold bg-orange-100 text-orange-600 border-none uppercase tracking-[0.2em]">
                  <Sparkles className="w-3 h-3 mr-2" />
                  Next-Gen AI Dog Psychology
                </Badge>
                <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-[1] text-slate-900">
                  강아지의 <span className="relative">
                    진심
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-orange-400/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                  </span>을<br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-500">통역해 드립니다</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                  행동 하나에 담긴 수천 가지 의미, <br className="hidden md:block" />
                  최첨단 Gemini AI로 우리 아이의 속마음을 엿보세요.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button 
                    size="lg" 
                    className="h-16 px-10 text-lg font-bold rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-2xl shadow-slate-200 transition-all hover:scale-105 active:scale-95"
                    onClick={() => document.getElementById('analyze-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    지금 시작하기
                    <PawPrint className="ml-2 w-5 h-5" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg" 
                    className="h-16 px-10 text-lg font-bold rounded-2xl text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition-all"
                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    더 알아보기
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Hero Decorative Icons */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 left-[10%] opacity-20 hidden lg:block"
          >
            <Bone className="w-16 h-16 text-orange-500" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-40 right-[10%] opacity-20 hidden lg:block"
          >
            <Heart className="w-16 h-16 text-red-400" />
          </motion.div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-32 bg-white/50">
          <div className="container mx-auto px-6">
            <motion.div {...fadeInUp} className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900">어떻게 동작하나요?</h2>
              <p className="text-xl text-slate-500 font-medium">단 10초 만에 분석이 끝나는 간편한 프로세스</p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
              {[
                {
                  icon: <Camera className="w-10 h-10 text-orange-500" />,
                  title: "행동 기록",
                  desc: "강아지의 특이한 행동을 촬영하거나 텍스트로 자유롭게 묘사해주세요.",
                  bg: "bg-orange-50"
                },
                {
                  icon: <BrainCircuit className="w-10 h-10 text-purple-500" />,
                  title: "AI 매칭 분석",
                  desc: "Gemini Pro가 수천 장의 행동 데이터를 바탕으로 즉각적인 심리 분석을 수행합니다.",
                  bg: "bg-purple-50"
                },
                {
                  icon: <Sparkles className="w-10 h-10 text-yellow-500" />,
                  title: "솔루션 제안",
                  desc: "단순 해석을 넘어 보호자가 취해야 할 최적의 대처 방안을 알려드립니다.",
                  bg: "bg-yellow-50"
                }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="group relative p-10 rounded-[40px] bg-white border border-slate-100 shadow-xl shadow-slate-100/50 transition-all"
                >
                  <div className={`mb-8 w-20 h-20 ${step.bg} rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-slate-900">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Action Section */}
        <section id="analyze-section" className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <motion.div 
                {...fadeInUp}
                className="bg-white rounded-[50px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100"
              >
                <div className="grid lg:grid-cols-5">
                  <div className="lg:col-span-2 bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                      <Badge className="bg-orange-500 text-white border-none mb-6">LIVE ANALYZER</Badge>
                      <h3 className="text-4xl font-black mb-6 leading-tight">행동을<br />알려주세요</h3>
                      <p className="text-slate-400 font-medium leading-relaxed">
                        견종과 나이를 적어주시면 <br />더욱 정교한 맞춤형 분석이 가능합니다.
                      </p>
                    </div>
                    <div className="relative z-10 mt-12 space-y-4">
                      <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                        <CheckCircle2 className="w-5 h-5 text-orange-500" />
                        멀티모달 시각 분석 지원
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold text-slate-400">
                        <CheckCircle2 className="w-5 h-5 text-orange-500" />
                        실시간 감정 패턴 파악
                      </div>
                    </div>
                    <div className="absolute top-[-10%] right-[-20%] w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[80px]" />
                  </div>
                  
                  <div className="lg:col-span-3 p-12 space-y-10">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">견종</label>
                        <input 
                          type="text"
                          placeholder="골든 리트리버"
                          className="w-full h-16 px-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500/20 outline-none transition-all font-bold text-slate-900"
                          value={breed}
                          onChange={(e) => setBreed(e.target.value)}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">나이</label>
                        <input 
                          type="text"
                          placeholder="3살"
                          className="w-full h-16 px-6 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500/20 outline-none transition-all font-bold text-slate-900"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">상황 묘사</label>
                      <Textarea 
                        placeholder="어떤 행동이 궁금하신가요? 자세히 적을수록 분석이 정확해집니다."
                        className="min-h-[150px] px-6 py-5 rounded-3xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500/20 outline-none transition-all font-bold text-slate-900 resize-none"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">이미지 업로드</label>
                      <FileUpload 
                        onFileChange={handleFileChange}
                        className="h-56 rounded-[32px] border-2 border-dashed border-slate-200 bg-slate-50/50 hover:bg-white hover:border-orange-300 transition-all group overflow-hidden"
                      >
                        {filePreview ? (
                          <div className="relative w-full h-full group">
                            <img src={filePreview} alt="Preview" className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button variant="secondary" size="sm" className="rounded-xl font-bold" onClick={(e) => { e.stopPropagation(); setFile(null); setFilePreview(null); }}>변경하기</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Upload className="w-8 h-8 text-orange-500" />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-black text-slate-900 tracking-tight">여기로 파일을 드래그하세요</p>
                              <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">JPG, PNG (MAX 10MB)</p>
                            </div>
                          </div>
                        )}
                      </FileUpload>
                    </div>

                    <Button 
                      className="w-full h-20 text-xl font-black rounded-3xl bg-orange-500 hover:bg-orange-600 text-white shadow-2xl shadow-orange-200 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70"
                      disabled={analyzing}
                      onClick={handleAnalyze}
                    >
                      {analyzing ? (
                        <div className="flex items-center gap-3">
                          <Loader2 className="h-7 w-7 animate-spin" />
                          <span>AI가 분석하는 중...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <BrainCircuit className="w-6 h-6" />
                          <span>분석 시작하기</span>
                        </div>
                      )}
                    </Button>

                    <AnimatePresence>
                      {result && !analyzing && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="pt-10 border-t border-slate-100"
                        >
                          <div className="p-10 rounded-[40px] bg-orange-50 border border-orange-100 shadow-inner">
                            <div className="flex items-center justify-between mb-8">
                              <div className="flex items-center gap-4">
                                <div className="p-3 bg-white rounded-2xl shadow-sm">
                                  <Sparkles className="w-6 h-6 text-orange-500" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">분석 결과 리포트</h3>
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="rounded-xl font-bold bg-white border-slate-200 hover:bg-orange-100 hover:text-orange-600 transition-all" 
                                onClick={handleShare}
                              >
                                <Share2 className="w-4 h-4 mr-2" />
                                공유
                              </Button>
                            </div>
                            <div className="prose prose-orange max-w-none text-slate-700 leading-[1.8] font-bold text-lg whitespace-pre-line">
                              {result}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section id="use-cases" className="py-32 bg-slate-900 text-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div {...fadeInUp} className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-black mb-6">주요 분석 키워드</h2>
              <p className="text-xl text-slate-400 font-medium">가장 많은 보호자들이 궁금해한 행동들</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { q: "자꾸 핥아요", a: "단순한 애정 표현을 넘어, 스트레스 해소나 소금기 섭취, 혹은 관심을 끌기 위한 신호일 수 있습니다.", icon: <Smile className="w-6 h-6 text-orange-400" /> },
                { q: "바닥을 파요", a: "잠자리를 정리하는 본능이거나, 숨겨둔 간식을 찾으려는 행동, 또는 에너지가 넘쳐서일 수 있습니다.", icon: <Leaf className="w-6 h-6 text-green-400" /> },
                { q: "꼬리를 물어요", a: "놀이의 일종일 수도 있지만, 지루함이나 강박증, 혹은 피부 질환이 원인일 수 있습니다.", icon: <Sun className="w-6 h-6 text-yellow-400" /> },
                { q: "하품을 해요", a: "피곤함의 표현이기도 하지만, 현재 상황에서 느끼는 긴장감이나 불안감을 완화시키려는 행동입니다.", icon: <Bone className="w-6 h-6 text-blue-400" /> }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all"
                >
                  <div className="mb-6">{item.icon}</div>
                  <h4 className="text-2xl font-black mb-4 tracking-tight">&quot;{item.q}&quot;</h4>
                  <p className="text-slate-400 leading-relaxed font-medium">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[100px]" />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div {...fadeInUp} className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900">도움말</h2>
                <p className="text-xl text-slate-500 font-medium">자주 묻는 질문들을 모았습니다.</p>
              </motion.div>
              
              <Accordion type="single" collapsible className="w-full space-y-6">
                {[
                  { q: "분석 정확도가 궁금해요.", a: "Gemini Vision 엔진을 통해 수만 장의 강아지 이미지 데이터를 대조합니다. 다만, 행동 분석은 환경에 따라 달라질 수 있으므로 참고용으로 활용하시고 건강 문제는 꼭 전문가와 상담하세요." },
                  { q: "개인 정보는 안전한가요?", a: "업로드하신 이미지는 분석 즉시 처리되며, 별도로 서버에 영구 보관하거나 마케팅 용도로 사용하지 않습니다." },
                  { q: "모든 견종이 가능한가요?", a: "네, 리트리버부터 믹스견까지 모든 견종의 보편적인 신체 언어와 감정 패턴을 분석할 수 있습니다." }
                ].map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border-none bg-slate-50 rounded-[32px] px-8 mb-4 overflow-hidden">
                    <AccordionTrigger className="text-xl font-black py-8 hover:no-underline text-slate-900">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed pb-8 font-medium text-lg">
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
      <footer className="bg-slate-50 border-t border-slate-100 py-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-orange-500 p-2 rounded-xl">
                  <PawPrint className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-slate-900">Dog-Coder</span>
              </div>
              <p className="max-w-xs text-slate-500 font-medium leading-loose">
                반려견과 보호자가 더 깊은 언어로 대화할 수 있는 세상을 꿈꿉니다. AI로 시작하는 새로운 반려생활.
              </p>
            </div>
            <div>
              <h4 className="text-slate-900 font-black mb-8 uppercase tracking-widest text-xs">서비스</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li><a href="#" className="hover:text-orange-500 transition-colors">이용 약관</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">개인 정보 보호</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">분석 알고리즘</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-black mb-8 uppercase tracking-widest text-xs">커뮤니티</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-400">
                <li><a href="#" className="hover:text-orange-500 transition-colors">인스타그램</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">유튜브</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">공식 블로그</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-400 text-sm font-bold">&copy; 2026 Dog-Coder. Inspired by Dogs.</p>
            <div className="flex gap-8">
              <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center hover:border-orange-200 transition-all">
                <Smile className="w-5 h-5 text-slate-400" />
              </div>
              <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center hover:border-orange-200 transition-all">
                <Heart className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
