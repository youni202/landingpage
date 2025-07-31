import { motion } from 'framer-motion';
import { FileText, ArrowRight, Clock, Eye, Calendar } from 'lucide-react';

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      title: '2025년 기업 AI 도입 트렌드: 꼭 알아야 할 5가지',
      summary: '올해 주목해야 할 기업용 AI 트렌드를 분석하고, 성공적인 도입을 위한 전략을 제시합니다.',
      category: 'AI 트렌드',
      readTime: '8분',
      views: '1.2k',
      publishedAt: '2025-01-10',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop',
      tags: ['AI', '트렌드', '2025', '기업']
    },
    {
      id: 2,
      title: 'Microsoft Copilot 실무 활용 완전 가이드',
      summary: '업무 효율성을 극대화하는 Copilot 활용법을 실제 사례와 함께 상세히 설명합니다.',
      category: 'Microsoft 365',
      readTime: '6분',
      views: '892',
      publishedAt: '2025-01-08',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop',
      tags: ['Copilot', 'Microsoft', '실무', '생산성']
    },
    {
      id: 3,
      title: 'Power BI로 만드는 경영진 대시보드 베스트 프랙티스',
      summary: '경영진이 원하는 인사이트를 제공하는 효과적인 대시보드 구축 방법을 알아봅니다.',
      category: 'Power BI',
      readTime: '10분',
      views: '756',
      publishedAt: '2025-01-05',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop',
      tags: ['Power BI', '대시보드', '데이터 분석', '경영진']
    }
  ];

  const categories = [
    { name: 'AI 트렌드', count: 12, color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { name: 'Microsoft 365', count: 18, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { name: 'Power BI', count: 8, color: 'bg-green-100 text-green-800 border-green-200' },
    { name: '디지털 혁신', count: 15, color: 'bg-orange-100 text-orange-800 border-orange-200' }
  ];

  return (
    <section id="blog" className="py-20 bg-card/30">
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
            <FileText className="h-4 w-4" />
            최신 인사이트
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">전문 지식</span>을 공유합니다
          </h2>
          <p className="text-xl text-muted-foreground enhanced-text max-w-2xl mx-auto">
            최신 기술 트렌드와 실무 노하우를 통해 여러분의 디지털 여정을 지원합니다
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="bg-background rounded-2xl shadow-float border border-border overflow-hidden hover-lift interactive-card scroll-reveal-up"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                >
                  <div className="md:flex">
                    <div className="md:w-80 flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-primary/10 text-primary enhanced-primary-text text-sm font-medium rounded-full">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground enhanced-text">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(post.publishedAt).toLocaleDateString('ko-KR')}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {post.views}
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-foreground leading-tight">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground enhanced-text mb-4 line-clamp-2">
                        {post.summary}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="tag-enhanced px-2 py-1 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        className="flex items-center gap-2 text-primary enhanced-primary-text hover:text-primary/80 font-medium"
                        style={{
                          transition: 'none',
                          animation: 'none',
                          transform: 'none'
                        }}
                      >
                        더 읽어보기
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Load More Button */}
            <motion.div
              className="text-center mt-12 scroll-reveal-up"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                className="button-outline-enhanced px-8 py-3 font-medium rounded-xl flex items-center gap-2 mx-auto"
                style={{
                  transition: 'none',
                  animation: 'none',
                  transform: 'none'
                }}
              >
                더 많은 글 보기
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-24 space-y-8 scroll-reveal-up"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Categories */}
              <div className="bg-background rounded-2xl p-6 shadow-float border border-border">
                <h3 className="text-lg font-semibold mb-4 text-foreground">카테고리</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left hover:bg-primary/5 transition-colors ${category.color.replace('bg-', 'hover:bg-').replace('100', '50')}`}
                      style={{
                        transition: 'none',
                        animation: 'none',
                        transform: 'none'
                      }}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm opacity-70">{category.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
                <h3 className="text-lg font-semibold mb-2 text-foreground">뉴스레터 구독</h3>
                <p className="text-sm text-muted-foreground enhanced-text mb-4">
                  최신 기술 트렌드와 교육 소식을 받아보세요
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="이메일 주소"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    className="w-full px-4 py-2 bg-gradient-primary text-primary-foreground font-medium rounded-lg shadow-lg hover-lift"
                    style={{
                      transition: 'none',
                      animation: 'none',
                      transform: 'none'
                    }}
                  >
                    구독하기
                  </button>
                </div>
              </div>

              {/* Popular Posts */}
              <div className="bg-background rounded-2xl p-6 shadow-float border border-border">
                <h3 className="text-lg font-semibold mb-4 text-foreground">인기 글</h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post, index) => (
                    <button
                      key={post.id}
                      className="flex gap-3 text-left hover:bg-primary/5 p-3 rounded-lg transition-colors w-full"
                      style={{
                        transition: 'none',
                        animation: 'none',
                        transform: 'none'
                      }}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-foreground line-clamp-2 mb-1">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground enhanced-text">
                          <Eye className="h-3 w-3" />
                          {post.views}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}