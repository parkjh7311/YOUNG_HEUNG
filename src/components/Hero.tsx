import { motion } from 'motion/react';

interface HeroProps {
  onScrollToExplore: () => void;
}

export default function Hero({ onScrollToExplore }: HeroProps) {
  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 }
    },
  };

  return (
    <section 
      id="hero"
      className="relative min-h-[480px] lg:min-h-[560px] bg-[#1c1816] flex items-center justify-center text-white overflow-hidden py-24 px-4 md:px-8 border-b border-stone-850"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-radial-gradient-hero pointer-events-none opacity-25"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:28px_24px] pointer-events-none"></div>

      {/* Decorative Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full bg-amber-600/10 blur-[90px] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 md:space-y-6"
        >
          {/* Subheader */}
          <motion.div 
            variants={itemVariants} 
            className="text-xs sm:text-sm md:text-base font-extrabold text-[#ffa200] tracking-widest"
          >
            50년 전통의 동력분무기 피스톤펌프전문기업
          </motion.div>

          {/* Main Title (Korean, matches screenshot exactly) */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.3] text-stone-100 font-sans"
          >
            <span className="block mb-1 sm:mb-2 text-white">고성능 강한내구력</span>
            <span className="block mb-2 sm:mb-3 text-white">철저한 AS를 바탕으로 하는</span>
            <span className="block text-[#ffa200]">
              농기계 생산기업
            </span>
          </motion.h1>

          <motion.div 
            variants={itemVariants}
            className="max-w-3xl mx-auto px-4 pt-2"
          >
            <p className="text-stone-400 text-sm md:text-base lg:text-md leading-relaxed font-sans font-medium max-w-2xl mx-auto">
              영흥분무기는 50년 이상 동력분무기 및 피스톤 펌프를 생산하여 국내 한성/한아/한서를
              <br className="hidden sm:inline" /> 비롯한 SS기 업체 및 관수/방역업체 및 농가에 제품을 공급한 전문 기업입니다
            </p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Visual bottom curves fade out */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#13100f] to-transparent pointer-events-none"></div>
    </section>
  );
}
