import { motion } from 'framer-motion';
import { Award, BookOpen, Users } from 'lucide-react';
import instructorImage from 'figma:asset/e6ed5aa96b80478acb6ed8b2b62fcdc2041ecb9e.png';

export default function InstructorBio() {
  const companies = [
    { name: '경기도인재개발원', logo: 'https://via.placeholder.com/140x50/374151/9CA3AF?text=경기도인재개발원' },
    { name: 'SK', logo: 'https://via.placeholder.com/100x50/374151/9CA3AF?text=SK' },
    { name: 'SKT', logo: 'https://via.placeholder.com/100x50/374151/9CA3AF?text=SKT' },
    { name: '현대모비스', logo: 'https://via.placeholder.com/120x50/374151/9CA3AF?text=현대모비스' },
    { name: 'KT', logo: 'https://via.placeholder.com/80x50/374151/9CA3AF?text=KT' },
    { name: '한국예탁결제원', logo: 'https://via.placeholder.com/140x50/374151/9CA3AF?text=한국예탁결제원' },
    { name: '차의과학대학교', logo: 'https://via.placeholder.com/130x50/374151/9CA3AF?text=차의과학대' },
    { name: '경기도의회', logo: 'https://via.placeholder.com/120x50/374151/9CA3AF?text=경기도의회' },
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Microsoft 공인 전문가',
      description: 'Microsoft 365, Azure, Power Platform 등 다양한 분야의 전문 자격증을 보유하고 있습니다.'
    },
    {
      icon: BookOpen,
      title: '1000+ 시간 교육 경험',
      description: '대기업, 공공기관, 대학교 등에서 실무 중심의 교육을 진행해온 풍부한 경험을 가지고 있습니다.'
    },
    {
      icon: Users,
      title: '기업 맞춤 솔루션',
      description: '각 조직의 특성과 업무 환경에 맞는 맞춤형 디지털 혁신 전략을 제공합니다.'
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            강사 <span className="gradient-text">소개</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            3년 이상의 Microsoft 기술 및 AI 교육 경험을 바탕으로, 
            실무에 바로 적용할 수 있는 실용적인 교육을 제공합니다.
          </p>
        </motion.div>

        {/* Bio Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute inset-0 gradient-primary rounded-full blur-2xl opacity-20 scale-110"></div>
              
              {/* Main image */}
              <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full animate-pulse"></div>
              </div>
              
              {/* Experience badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-xl p-3 shadow-lg backdrop-blur-sm"
              >
                <div className="text-center">
                  <div className="text-lg font-bold gradient-text">3년+</div>
                  <div className="text-xs text-muted-foreground">전문 경력</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Youni</h3>
              <p className="text-lg text-muted-foreground">
                Microsoft & AI 전문 컨설턴트
              </p>
              <p className="text-muted-foreground leading-relaxed">
                최신 기술과 실무 적용 사이의 격차를 해소하는 것에 열정을 가지고 있습니다. 
                Microsoft Azure, Power Platform, Microsoft 365, 그리고 기업용 AI 솔루션 분야를 전문으로 하며, 
                실무에 바로 적용할 수 있는 교육을 통해 측정 가능한 비즈니스 성과를 창출하는 것을 목표로 합니다.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">전문 분야:</h4>
              <div className="flex flex-wrap gap-2">
                {['Microsoft Azure', 'Power Platform', 'Microsoft 365', 'AI & 머신러닝', '디지털 혁신', '업무 자동화'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <achievement.icon className="h-8 w-8 text-primary" />
              </div>
              <h5 className="font-semibold mb-2">{achievement.title}</h5>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h4 className="text-lg font-semibold mb-8 text-muted-foreground">
            교육 파트너 기관
          </h4>
          
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ 
                duration: 25, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
              className="flex items-center gap-8 whitespace-nowrap"
            >
              {[...companies, ...companies].map((company, index) => (
                <div
                  key={`${company.name}-${index}`}
                  className="flex-shrink-0 w-36 h-14 bg-card rounded-lg border border-border flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-w-full max-h-full object-contain px-2"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}