import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle, X, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  
  const youniProfileImage = 'figma:asset/8a7fec4e08591e21e5facc5e236ca15973fa2ce5.png';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('이메일 주소를 입력해주세요');
      return;
    }

    // Show the popup instead of actually subscribing
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setEmail('');
  };

  const stats = [
    { label: '구독자', value: '1,200+' },
    { label: '월간 콘텐츠', value: '4+' },
    { label: '만족도', value: '98%' }
  ];

  const benefits = [
    '최신 Microsoft 365 업데이트 소식',
    'AI 도구 활용법과 실전 팁',
    '독점 교육 자료 및 템플릿',
    '업계 트렌드 분석 리포트'
  ];

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 bg-secondary/10 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 scroll-reveal-up"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-4">
            <Mail className="h-4 w-4" />
            뉴스레터 구독
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">최신 소식</span>을 가장 먼저
            <br />
            받아보세요
          </h2>
          <p className="text-xl text-muted-foreground enhanced-text max-w-2xl mx-auto">
            Microsoft 365와 AI 관련 최신 트렌드, 실무 팁, 교육 소식을 매주 전해드립니다
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Newsletter Benefits */}
          <motion.div
            className="scroll-reveal-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 bg-background/50 backdrop-blur-sm rounded-xl border border-border"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground enhanced-text">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Benefits List */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  구독 혜택
                </h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                    >
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground enhanced-text">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              <motion.div
                className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-border"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <blockquote className="text-sm text-muted-foreground enhanced-text mb-3 italic">
                  "유니님의 뉴스레터는 실무에서 바로 써먹을 수 있는 꿀팁들로 가득해요. 
                  매주 기다려지는 콘텐츠입니다!"
                </blockquote>
                <div className="flex items-center gap-3">
                  <img
                    src={youniProfileImage}
                    alt="Subscriber"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium text-foreground">김민지</div>
                    <div className="text-xs text-muted-foreground enhanced-text">IT 담당자</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Newsletter Signup */}
          <motion.div
            className="scroll-reveal-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-md rounded-2xl p-8 shadow-float border border-border">
              {!isSubscribed ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl overflow-hidden border-2 border-primary/20">
                      <img 
                        src={youniProfileImage}
                        alt="Youni"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      무료 구독하기
                    </h3>
                    <p className="text-muted-foreground enhanced-text">
                      매주 화요일, 유용한 콘텐츠를 이메일로 전해드려요
                    </p>
                  </div>

                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="이메일 주소를 입력하세요"
                        className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background/80 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-colors"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-primary text-primary-foreground font-semibold rounded-xl shadow-lg hover-lift flex items-center justify-center gap-2"
                      style={{
                        transition: 'none',
                        animation: 'none',
                        transform: 'none'
                      }}
                    >
                      <Send className="h-5 w-5" />
                      무료 구독하기
                    </button>

                    <p className="text-xs text-muted-foreground enhanced-text text-center">
                      언제든지 구독 해지할 수 있습니다. 개인정보는 안전하게 보호됩니다.
                    </p>
                  </form>

                  {/* Social Proof */}
                  <div className="flex items-center justify-center gap-4 pt-4 border-t border-border/50">
                    <div className="flex -space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
                          src={youniProfileImage}
                          alt={`Subscriber ${i + 1}`}
                          className="w-8 h-8 rounded-full border-2 border-background object-cover"
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground enhanced-text">
                      <span className="text-primary enhanced-primary-text font-semibold">1,200+</span>명이 구독 중
                    </div>
                  </div>
                </div>
              ) : (
                <motion.div
                  className="text-center space-y-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">구독 완료!</h3>
                  <p className="text-muted-foreground enhanced-text">
                    환영합니다! 곧 첫 번째 뉴스레터를 받아보실 수 있어요.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 scroll-reveal-up"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-muted-foreground enhanced-text mb-4">
            아직 고민 중이신가요? 지금까지 발행된 뉴스레터를 먼저 확인해보세요!
          </p>
          <button
            className="button-outline-enhanced px-6 py-2 rounded-lg font-medium"
            style={{
              transition: 'none',
              animation: 'none',
              transform: 'none'
            }}
          >
            이전 뉴스레터 보기
          </button>
        </motion.div>
      </div>

      {/* Newsletter Preparation Popup */}
      {showPopup && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-background rounded-2xl p-8 max-w-md w-full shadow-2xl border border-border"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden border-2 border-primary/20">
                <img 
                  src={youniProfileImage}
                  alt="Youni"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-xl font-bold text-foreground">
                뉴스레터 준비중
              </h3>
              
              <p className="text-muted-foreground enhanced-text leading-relaxed">
                유니의 뉴스레터는 준비중이라 조금만 기다려주세요~
              </p>
              
              <div className="flex justify-center pt-4">
                <button
                  onClick={closePopup}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium flex items-center gap-2"
                  style={{
                    transition: 'none',
                    animation: 'none',
                    transform: 'none'
                  }}
                >
                  <X className="h-4 w-4" />
                  확인
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}