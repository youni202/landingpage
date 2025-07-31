import image_2120ec5c71ea6b9093995b3faa4e983729e84f3a from 'figma:asset/2120ec5c71ea6b9093995b3faa4e983729e84f3a.png';
import image_0e9e208b63efeaac55a4c5b283621148a8ac8a86 from 'figma:asset/0e9e208b63efeaac55a4c5b283621148a8ac8a86.png';
import image_8ea8d63d5d406882b71238ea542928091915a4c6 from 'figma:asset/8ea8d63d5d406882b71238ea542928091915a4c6.png';
import image_104945010130c1134069483ec1e9150e360fefbd from 'figma:asset/104945010130c1134069483ec1e9150e360fefbd.png';
import image_b808a680a19de6d3e2c922bfe8702e7ebf79a9ad from 'figma:asset/b808a680a19de6d3e2c922bfe8702e7ebf79a9ad.png';
import image_ca640b94b9f1ab64f9aa27b2c693705732a81e51 from 'figma:asset/ca640b94b9f1ab64f9aa27b2c693705732a81e51.png';
import { motion } from 'framer-motion';
import { Building2, Users, Award, TrendingUp } from 'lucide-react';

export default function ClientsSection() {
  const clients = [
    {
      name: '경기도인재개발원',
      logo: image_ca640b94b9f1ab64f9aa27b2c693705732a81e51,
      description: '공무원 디지털 역량 강화 교육',
      category: '공공기관'
    },
    {
      name: 'SK그룹',
      logo: image_b808a680a19de6d3e2c922bfe8702e7ebf79a9ad,
      description: 'AI 업무 혁신 워크샵',
      category: '대기업'
    },
    {
      name: '삼성전자',
      logo: image_104945010130c1134069483ec1e9150e360fefbd,
      description: 'Microsoft 365 도입 교육',
      category: '대기업'
    },
    {
      name: 'LG CNS',
      logo: image_8ea8d63d5d406882b71238ea542928091915a4c6,
      description: 'Power Platform 개발 교육',
      category: '대기업'
    },
    {
      name: '중소기업진흥공단',
      logo: image_0e9e208b63efeaac55a4c5b283621148a8ac8a86,
      description: '중소기업 디지털 전환 교육',
      category: '공공기관'
    },
    {
      name: '신한은행',
      logo: image_2120ec5c71ea6b9093995b3faa4e983729e84f3a,
      description: '금융업 특화 AI 교육',
      category: '금융'
    }
  ];

  const stats = [
    {
      icon: Building2,
      label: '파트너 기업',
      value: '30+',
      description: '다양한 업계의 파트너십'
    },
    {
      icon: Users,
      label: '교육 수료생',
      value: '2,000+',
      description: '누적 교육 참여 인원'
    },
    {
      icon: Award,
      label: '성공 프로젝트',
      value: '85+',
      description: '완료된 교육 프로젝트'
    },
    {
      icon: TrendingUp,
      label: '만족도',
      value: '98%',
      description: '교육 만족도 평균'
    }
  ];

  return (
    <section id="clients" className="py-20 bg-background">
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
            <Building2 className="h-4 w-4" />
            신뢰하는 파트너들
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">다양한 기업</span>과 함께하는
            <br />
            디지털 혁신 여정
          </h2>
          <p className="text-xl text-muted-foreground enhanced-text max-w-2xl mx-auto">
            공공기관부터 대기업까지, 다양한 업계의 파트너와 함께 성공적인 교육을 진행했습니다
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 scroll-reveal-up"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover-lift"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground enhanced-text">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover-lift interactive-card scroll-reveal-up"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-background shadow-md">
                  <img
                    src={client.logo}
                    alt={`${client.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{client.name}</h3>
                    <span className="px-2 py-1 text-xs bg-primary/10 text-primary enhanced-primary-text rounded-full">
                      {client.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground enhanced-text">{client.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          className="max-w-4xl mx-auto text-center scroll-reveal-up"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 border border-primary/10">
            <blockquote className="text-xl md:text-2xl font-medium text-foreground mb-6 leading-relaxed">
              "유니님의 교육은 단순한 기술 습득을 넘어서, 실제 업무 현장에서 바로 적용할 수 있는 
              <span className="gradient-text"> 실용적인 노하우</span>를 제공합니다. 
              우리 조직의 디지털 전환에 큰 도움이 되었습니다."
            </blockquote>
            
            <div className="flex items-center justify-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
                alt="Customer"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-foreground">김대리</div>
                <div className="text-sm text-muted-foreground enhanced-text">경기도인재개발원 교육팀</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}