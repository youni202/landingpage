import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Youtube, 
  MessageCircle, 
  Instagram, 
  Linkedin,
  BookOpen,
  Users,
  Award,
  ArrowUp,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const youniProfileImage = 'figma:asset/8a7fec4e08591e21e5facc5e236ca15973fa2ce5.png';

  const quickLinks = [
    { name: '홈', href: '#hero' },
    { name: '강의', href: '#lectures' },
    { name: '파트너', href: '#clients' },
    { name: '인사이트', href: '#blog' },
    { name: '뉴스레터', href: '#newsletter' }
  ];

  const services = [
    { name: 'Microsoft 365 교육', href: '#lectures' },
    { name: 'AI 업무 활용', href: '#lectures' },
    { name: 'Power BI 분석', href: '#lectures' },
    { name: '맞춤형 교육', href: '#lectures' },
    { name: '기업 컨설팅', href: '#lectures' }
  ];

  const socialLinks = [
    {
      name: 'YouTube',
      icon: Youtube,
      href: 'https://youtube.com/@youni-edu',
      color: 'hover:text-red-500',
      description: '교육 동영상'
    },
    {
      name: 'KakaoTalk',
      icon: MessageCircle,
      href: 'https://open.kakao.com/o/youni-edu',
      color: 'hover:text-yellow-500',
      description: '카톡 상담'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/youni.edu',
      color: 'hover:text-pink-500',
      description: '일상 공유'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/youni-educator',
      color: 'hover:text-blue-500',
      description: '전문 네트워크'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      label: '이메일',
      value: 'hello@youni.kr',
      href: 'mailto:hello@youni.kr'
    },
    {
      icon: Phone,
      label: '전화',
      value: '010-1234-5678',
      href: 'tel:010-1234-5678'
    },
    {
      icon: MapPin,
      label: '위치',
      value: '서울, 대한민국',
      href: '#'
    }
  ];

  const achievements = [
    { icon: BookOpen, label: '총 강의', value: '50+' },
    { icon: Users, label: '수강생', value: '2,000+' },
    { icon: Award, label: '만족도', value: '98%' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card/30 border-t border-border/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #6366f1 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #a855f7 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1 scroll-reveal-up"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">
                {/* Logo with actual profile image */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border-2 border-primary/20">
                    <img 
                      src={youniProfileImage}
                      alt="Youni Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold gradient-text">Youni</h3>
                    <p className="text-sm text-muted-foreground enhanced-text">
                      Microsoft & AI 전문가
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground enhanced-text leading-relaxed">
                  기업의 디지털 혁신을 위한 Microsoft 365와 AI 교육 전문 플랫폼입니다. 
                  실무 중심의 교육으로 생산성 향상을 도와드립니다.
                </p>

                {/* Achievements */}
                <div className="grid grid-cols-3 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.label}
                      className="text-center p-3 bg-background/50 rounded-lg border border-border/50"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <achievement.icon className="h-5 w-5 text-primary mx-auto mb-1" />
                      <div className="text-lg font-bold text-foreground">{achievement.value}</div>
                      <div className="text-xs text-muted-foreground enhanced-text">{achievement.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="scroll-reveal-up"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-6">바로가기</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground enhanced-text hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              className="scroll-reveal-up"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-6">교육 서비스</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="text-muted-foreground enhanced-text hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Social */}
            <motion.div
              className="scroll-reveal-up"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-6">연락처</h4>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                {contactInfo.map((contact) => (
                  <div key={contact.label} className="flex items-center gap-3">
                    <contact.icon className="h-4 w-4 text-primary flex-shrink-0" />
                    <div>
                      <div className="text-xs text-muted-foreground enhanced-text">{contact.label}</div>
                      <a
                        href={contact.href}
                        className="text-sm text-foreground hover:text-primary transition-colors"
                      >
                        {contact.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <h5 className="text-sm font-medium text-foreground mb-4">소셜 미디어</h5>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 p-3 rounded-lg bg-background/50 border border-border/50 hover:bg-primary/5 ${social.color} transition-all duration-200 group`}
                    >
                      <social.icon className="h-4 w-4" />
                      <div>
                        <div className="text-xs font-medium text-foreground">{social.name}</div>
                        <div className="text-xs text-muted-foreground enhanced-text">{social.description}</div>
                      </div>
                      <ExternalLink className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          className="py-8 border-t border-border/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground enhanced-text">
                © {currentYear} Youni. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground enhanced-text mt-1">
                Made with ❤️ for the Korean education community
              </p>
            </div>

            {/* Links */}
            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground enhanced-text hover:text-primary transition-colors"
              >
                개인정보처리방침
              </a>
              <a
                href="#"
                className="text-muted-foreground enhanced-text hover:text-primary transition-colors"
              >
                이용약관
              </a>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 text-muted-foreground enhanced-text hover:text-primary transition-colors"
                style={{
                  transition: 'none',
                  animation: 'none',
                  transform: 'none'
                }}
              >
                <ArrowUp className="h-4 w-4" />
                맨 위로
              </button>
            </div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-10 right-10 w-4 h-4 bg-primary/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-20 left-20 w-6 h-6 border border-secondary/30 rounded"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </footer>
  );
}