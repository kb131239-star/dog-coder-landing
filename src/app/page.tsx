'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
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
  Camera,
  Layers,
  Zap,
  ShieldCheck,
  Image as ImageIcon
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
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 font-sans">
      {/* Premium Header */}
      <header className="fixed top-0 w-full z-50 glass">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <PawPrint className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dog-Coder
            </span>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">How it works</a>
            <a href="#analyze-section" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Analyzer</a>
            <a href="#use-cases" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">Cases</a>
            <div className="h-4 w-[1px] bg-border mx-2" />
            <Button 
              onClick={() => document.getElementById('analyze-section')?.scrollIntoView({ behavior: 'smooth' })} 
              className="rounded-full px-5 h-10 font-semibold shadow-sm active:scale-95 transition-all"
            >
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section - SaaS style */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <Badge variant="outline" className="mb-8 px-4 py-1.5 rounded-full text-xs font-bold bg-primary/5 text-primary border-primary/20 uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 mr-2" />
                  Next-Generation Dog Intelligence
                </Badge>
                <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                  강아지의 행동 속에 <br />
                  <span className="text-gradient">진심이 보입니다</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                  최첨단 Gemini AI가 반려견의 미세한 움직임과 표정을 분석하여 <br className="hidden md:block" />
                  지금 이 순간 아이가 전하고 싶은 마음을 정확하게 읽어드립니다.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 text-base font-bold rounded-full shadow-xl shadow-primary/25 hover:shadow-primary/40 active:scale-95 transition-all"
                    onClick={() => document.getElementById('analyze-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    지금 무료로 시작하기
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="h-14 px-8 text-base font-bold rounded-full bg-white dark:bg-slate-900 transition-all hover:bg-slate-50"
                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    작동 원리 보기
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Mockup / Visual Element */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-20 max-w-5xl mx-auto"
            >
              <div className="relative p-2 rounded-[2rem] bg-gradient-to-b from-slate-200 to-transparent dark:from-slate-800 shadow-2xl">
                <div className="bg-white dark:bg-slate-950 rounded-[1.8rem] overflow-hidden border border-slate-200 dark:border-slate-800">
                  <div className="aspect-[16/9] md:aspect-[21/9] bg-slate-50 dark:bg-slate-900 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
                    <div className="flex flex-col items-center gap-6 z-10">
                      <motion.div 
                        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center blur-xl"
                      />
                      <div className="text-center space-y-2">
                        <div className="h-2 w-32 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto animate-pulse" />
                        <div className="h-2 w-48 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto animate-pulse delay-75" />
                      </div>
                    </div>
                    <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-1/4 left-1/4 p-4 glass rounded-2xl shadow-lg">
                      <Camera className="w-6 h-6 text-primary" />
                    </motion.div>
                    <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-1/4 right-1/4 p-4 glass rounded-2xl shadow-lg">
                      <BrainCircuit className="w-6 h-6 text-orange-400" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-[100px]" />
          </div>
        </section>

        {/* Features / How it Works Section */}
        <section id="how-it-works" className="section-padding bg-slate-50/50 dark:bg-slate-900/20">
          <div className="container mx-auto px-6">
            <motion.div {...fadeInUp} className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">지능형 분석 프로세스</h2>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">복잡한 데이터 처리는 AI가 담당합니다. 당신은 아이의 마음만 확인하세요.</p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Layers className="w-6 h-6" />,
                  title: "데이터 수집",
                  desc: "행동 상황 설명이나 이미지를 입력받아 분석을 위한 구조화된 데이터를 생성합니다.",
                  color: "bg-blue-500"
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "실시간 AI 추론",
                  desc: "Gemini Vision 엔진이 강아지의 생체학적, 환경적 요소를 실시간으로 대조 분석합니다.",
                  color: "bg-primary"
                },
                {
                  icon: <ShieldCheck className="w-6 h-6" />,
                  title: "맞춤형 리포트",
                  desc: "분석된 결과를 바탕으로 보호자가 즉시 실천할 수 있는 최적의 솔루션을 제공합니다.",
                  color: "bg-emerald-500"
                }
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="group p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                >
                  <div className={`mb-8 w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{feature.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product / Analyzer Section */}
        <section id="analyze-section" className="section-padding relative">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                {...fadeInUp}
                className="bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden border border-slate-200 dark:border-slate-800"
              >
                <div className="grid lg:grid-cols-12 min-h-[600px]">
                  <div className="lg:col-span-4 bg-slate-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-8">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">Live Processor</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-6 leading-tight">행동을 <br />데이터로 변환</h3>
                      <p className="text-slate-400 font-medium leading-relaxed">
                        텍스트 묘사와 이미지가 결합될 때 <br />가장 정확한 결과가 산출됩니다.
                      </p>
                    </div>
                    
                    <div className="relative z-10 mt-20 space-y-6">
                      <div className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <Search className="w-5 h-5 text-primary group-hover:text-white" />
                        </div>
                        <div className="text-sm font-semibold text-slate-300">맥락적 상황 파악</div>
                      </div>
                      <div className="flex items-center gap-4 group">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                          <ImageIcon className="w-5 h-5 text-primary group-hover:text-white" />
                        </div>
                        <div className="text-sm font-semibold text-slate-300">비언어적 신호 분석</div>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
                      <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
                    </div>
                  </div>
                  
                  <div className="lg:col-span-8 p-8 md:p-12 lg:p-16 space-y-12">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">견종 (Optional)</label>
                        <input 
                          type="text"
                          placeholder="Ex. Golden Retriever"
                          className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all font-semibold"
                          value={breed}
                          onChange={(e) => setBreed(e.target.value)}
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">나이 (Optional)</label>
                        <input 
                          type="text"
                          placeholder="Ex. 3 years"
                          className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-transparent focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none transition-all font-semibold"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">상태 기술</label>
                      <Textarea 
                        placeholder="아이가 지금 어떤 행동을 하고 있나요? 상세히 적어주세요."
                        className="min-h-[160px] px-6 py-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900 border-none focus:ring-4 focus:ring-primary/5 outline-none transition-all font-medium leading-relaxed resize-none"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">이미지 소스</label>
                      <FileUpload 
                        onFileChange={handleFileChange}
                        className="h-60 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 hover:border-primary/40 transition-all group relative overflow-hidden"
                      >
                        {filePreview ? (
                          <div className="relative w-full h-full group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={filePreview} alt="Preview" className="h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Button variant="outline" size="sm" className="rounded-full font-bold bg-white text-slate-900 border-none px-6" onClick={(e) => { e.stopPropagation(); setFile(null); setFilePreview(null); }}>Change Image</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:scale-110 group-hover:text-primary transition-all">
                              <Upload className="w-6 h-6 text-slate-400 group-hover:text-primary" />
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 tracking-tight">드래그하거나 클릭하여 업로드</p>
                              <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-[0.2em]">JPG, PNG, GIF (Up to 10MB)</p>
                            </div>
                          </div>
                        )}
                      </FileUpload>
                    </div>

                    <Button 
                      className="w-full h-16 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98] disabled:opacity-50"
                      disabled={analyzing}
                      onClick={handleAnalyze}
                    >
                      {analyzing ? (
                        <div className="flex items-center gap-3">
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>AI 분석 엔진 구동 중...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Zap className="w-5 h-5 fill-current" />
                          <span>행동 분석 시작하기</span>
                        </div>
                      )}
                    </Button>

                    <AnimatePresence>
                      {result && !analyzing && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-12 border-t border-slate-100 dark:border-slate-800"
                        >
                          <div className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-8">
                              <div className="flex items-center gap-4">
                                <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                  <BrainCircuit className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">AI 분석 리포트</h3>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="rounded-full font-bold text-slate-500 hover:text-primary transition-all" 
                                onClick={handleShare}
                              >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                              </Button>
                            </div>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-[1.8] font-medium text-lg whitespace-pre-line">
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
        <section id="use-cases" className="section-padding bg-slate-950 text-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div {...fadeInUp} className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight text-white leading-tight">Insight Database</h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">수많은 강아지들이 보낸 보편적 신호들, <br className="hidden md:block" />우리 아이에게도 해당되는지 확인해보세요.</p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { q: "자꾸 핥아요", a: "애정의 표현이기도 하지만, 소금기를 원하거나 불안감을 해소하려는 심리가 기저에 있을 수 있습니다.", icon: <Heart className="w-5 h-5" /> },
                { q: "바닥을 파요", a: "야생 본능의 발현으로, 잠자리를 안전하게 구축하거나 에너지를 발산하려는 행동입니다.", icon: <Leaf className="w-5 h-5" /> },
                { q: "꼬리를 물어요", a: "지루함이나 피부 질환, 드물게는 강박적인 증상일 수 있어 맥락 파악이 중요합니다.", icon: <Sun className="w-5 h-5" /> },
                { q: "하품을 해요", a: "피곤해서이기도 하지만, 현재 상황에 대한 스트레스나 긴장을 진정시키려는 신호입니다.", icon: <Bone className="w-5 h-5" /> }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="mb-6 p-4 w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-5 tracking-tight">&quot;{item.q}&quot;</h4>
                  <p className="text-slate-400 leading-relaxed font-medium">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] -z-10" />
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-white dark:bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <motion.div {...fadeInUp} className="text-center mb-20">
                <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">도움이 필요하신가요?</h2>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">자주 묻는 질문들을 통해 궁금증을 해결해 드립니다.</p>
              </motion.div>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  { q: "분석 정확도는 어떤 수준인가요?", a: "Dog-Coder는 최신 멀티모달 LLM인 Gemini 엔진을 사용합니다. 수만 건의 행동 데이터를 기반으로 추론하지만, 질병이나 의학적 문제는 반드시 수의사와 상담하셔야 합니다." },
                  { q: "개인 정보와 사진은 안전한가요?", a: "업로드하신 이미지는 분석 즉시 처리되며, 별도로 저장되거나 학습용으로 사용되지 않으므로 안심하고 이용하셔도 됩니다." },
                  { q: "모든 견종 분석이 가능한가요?", a: "네, 리트리버부터 믹스견까지 모든 반려견의 보편적인 신체 언어를 분석할 수 있습니다." }
                ].map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border border-slate-100 dark:border-slate-800 rounded-3xl px-8 mb-4 overflow-hidden transition-all data-[state=open]:border-primary/20 data-[state=open]:bg-primary/5">
                    <AccordionTrigger className="text-lg font-bold py-6 hover:no-underline text-slate-900 dark:text-white">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed pb-6 font-medium text-base">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      {/* Premium Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary p-2 rounded-xl">
                  <PawPrint className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Dog-Coder</span>
              </div>
              <p className="max-w-sm text-slate-500 dark:text-slate-400 font-medium leading-loose text-lg">
                반려견의 마음을 이해하고 더 깊은 유대감을 형성할 수 있도록 <br />최고의 AI 기술을 지원합니다.
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-slate-900 dark:text-white font-bold mb-8 text-sm uppercase tracking-widest">Service</h4>
              <ul className="space-y-4 text-sm font-semibold text-slate-400">
                <li><a href="#" className="hover:text-primary transition-colors">Analyzer</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Database</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">How it works</a></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-slate-900 dark:text-white font-bold mb-8 text-sm uppercase tracking-widest">Legal</h4>
              <ul className="space-y-4 text-sm font-semibold text-slate-400">
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-slate-900 dark:text-white font-bold mb-8 text-sm uppercase tracking-widest">Contact</h4>
              <ul className="space-y-4 text-sm font-semibold text-slate-400">
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Feedback</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-slate-400 text-sm font-bold tracking-tight">&copy; 2026 Dog-Coder. Empowered by AI.</p>
            <div className="flex gap-6">
              <div className="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"><Smile className="w-5 h-5" /></div>
              <div className="p-2 text-slate-400 hover:text-primary transition-colors cursor-pointer"><Heart className="w-5 h-5" /></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
