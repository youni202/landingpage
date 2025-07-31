import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Award, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onContactClick: () => void;
}

export default function HeroSection({ onContactClick }: HeroSectionProps) {
  // Import the actual Youni character image
  const youniProfileImage = 'figma:asset/8a7fec4e08591e21e5facc5e236ca15973fa2ce5.png';

  const stats = [
    { icon: BookOpen, label: '강의 수', value: '50+' },
    { icon: Users, label: '수강생', value: '2,000+' },
    { icon: Award, label: '파트너 기업', value: '30+' }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Sparkles className="h-4 w-4" />
            Microsoft & AI 교육 전문가
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="gradient-text">디지털 혁신</span>을 위한
            <br />
            <span className="text-foreground">교육 플랫폼</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Microsoft 365, AI 기술을 활용한 기업 교육으로
            <br className="hidden sm:block" />
            <span className="enhanced-primary-text">업무 효율성을 극대화</span>하세요
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={onContactClick}
              className="px-8 py-4 text-lg font-semibold text-primary-foreground bg-gradient-primary rounded-xl shadow-lg hover-lift flex items-center gap-2 min-w-[200px] justify-center"
              style={{
                transition: 'none',
                animation: 'none',
                transform: 'none'
              }}
            >
              강의 문의하기
              <ArrowRight className="h-5 w-5" />
            </button>

            <button
              onClick={() => document.getElementById('lectures')?.scrollIntoView({ behavior: 'smooth' })}
              className="button-outline-enhanced px-8 py-4 text-lg font-medium rounded-xl min-w-[200px] justify-center flex items-center gap-2"
              style={{
                transition: 'none',
                animation: 'none',
                transform: 'none'
              }}
            >
              강의 둘러보기
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground enhanced-text">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Youni Profile Image */}
      <motion.div
        className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden xl:block"
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        <div className="relative">
          <div className="w-72 h-72 rounded-full bg-gradient-primary p-1 shadow-2xl">
            <img
              src={youniProfileImage}
              alt="Youni Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          
          {/* Floating Elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <BookOpen className="h-8 w-8 text-primary" />
          </motion.div>

          <motion.div
            className="absolute -bottom-4 -left-4 w-12 h-12 bg-secondary rounded-full shadow-lg flex items-center justify-center"
            animate={{
              y: [0, -8, 0],
              x: [0, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <Sparkles className="h-6 w-6 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-2 bg-muted-foreground/50 rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <p className="text-xs text-muted-foreground mt-2 text-center enhanced-text">스크롤하세요</p>
      </motion.div>
    </section>
  );
}