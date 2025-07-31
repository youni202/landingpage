import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, ArrowRight, Star, CheckCircle } from 'lucide-react';

interface LectureSectionProps {
  onContactClick: () => void;
}

export default function LectureSection({ onContactClick }: LectureSectionProps) {
  const lectures = [
    {
      id: 1,
      title: 'Microsoft 365 완전정복',
      description: 'Teams, SharePoint, Power Platform을 활용한 협업 혁신',
      duration: '16시간',
      participants: '20-30명',
      level: '초급-중급',
      topics: ['Microsoft Teams 활용법', 'SharePoint 협업', 'Power Automate 자동화', 'Power BI 데이터 분석'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
      rating: 4.9,
      students: 450
    },
    {
      id: 2,
      title: 'ChatGPT & AI 업무 활용',
      description: '생성형 AI를 활용한 업무 효율성 극대화 전략',
      duration: '8시간',
      participants: '15-25명',
      level: '초급',
      topics: ['ChatGPT 프롬프트 엔지니어링', 'AI 도구 업무 적용', 'Copilot 활용법', 'AI 윤리 및 보안'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop',
      rating: 4.8,
      students: 320
    },
    {
      id: 3,
      title: 'Power BI 데이터 분석',
      description: '비즈니스 인텔리전스를 위한 데이터 시각화 마스터',
      duration: '12시간',
      participants: '10-20명',
      level: '중급',
      topics: ['Power BI Desktop', '데이터 모델링', 'DAX 함수', '대시보드 구축'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
      rating: 4.9,
      students: 280
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: '실무 중심 교육',
      description: '이론보다는 실제 업무에 바로 적용할 수 있는 실습 위주'
    },
    {
      icon: Users,
      title: '맞춤형 커리큘럼',
      description: '기업의 업무 환경과 요구사항에 맞춘 맞춤형 교육'
    },
    {
      icon: Star,
      title: '전문가 강의',
      description: 'Microsoft MVP와 다년간 경험을 바탕으로 한 전문 강의'
    }
  ];

  return (
    <section id="lectures" className="py-20 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 scroll-reveal-up"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <BookOpen className="h-4 w-4" />
            전문 교육 과정
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">실무 중심</span>의 교육 프로그램
          </h2>
          <p className="text-xl text-muted-foreground enhanced-text max-w-2xl mx-auto">
            기업의 디지털 전환과 생산성 향상을 위한 체계적인 교육 과정을 제공합니다
          </p>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16 scroll-reveal-up"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border hover-lift"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                <benefit.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground enhanced-text">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Lectures Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {lectures.map((lecture, index) => (
            <motion.div
              key={lecture.id}
              className="bg-background rounded-2xl shadow-float border border-border overflow-hidden hover-lift interactive-card scroll-reveal-up"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
            >
              <div className="relative">
                <img
                  src={lecture.image}
                  alt={lecture.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    {lecture.level}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{lecture.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-foreground">{lecture.title}</h3>
                <p className="text-muted-foreground enhanced-text mb-4">{lecture.description}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground enhanced-text mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {lecture.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {lecture.participants}
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {lecture.topics.slice(0, 3).map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground enhanced-text">{topic}</span>
                    </div>
                  ))}
                  {lecture.topics.length > 3 && (
                    <div className="text-sm text-primary enhanced-primary-text">
                      +{lecture.topics.length - 3}개 추가 주제
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground enhanced-text">
                    {lecture.students}명 수강완료
                  </div>
                  <button
                    onClick={onContactClick}
                    className="flex items-center gap-2 text-primary enhanced-primary-text hover:text-primary/80 font-medium"
                    style={{
                      transition: 'none',
                      animation: 'none',
                      transform: 'none'
                    }}
                  >
                    문의하기
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center scroll-reveal-up"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              맞춤형 교육 과정이 필요하신가요?
            </h3>
            <p className="text-muted-foreground enhanced-text mb-6">
              기업의 특별한 요구사항에 맞춘 커스터마이징 교육 프로그램을 제공합니다
            </p>
            <button
              onClick={onContactClick}
              className="px-8 py-3 text-lg font-semibold text-primary-foreground bg-gradient-primary rounded-xl shadow-lg hover-lift flex items-center gap-2 mx-auto"
              style={{
                transition: 'none',
                animation: 'none',
                transform: 'none'
              }}
            >
              맞춤 교육 문의
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}