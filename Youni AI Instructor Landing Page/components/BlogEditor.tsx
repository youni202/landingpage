import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import RichTextEditor from './RichTextEditor';
import { ArrowLeft, Save, Eye, Tag, Image, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  htmlContent: string;
  summary: string;
  author: string;
  category: string;
  tags: string[];
  thumbnail: string;
  publishedAt: string;
  status: 'published' | 'draft';
  views: number;
  readTime: string;
}

interface BlogEditorProps {
  post?: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const categories = [
  'AI 트렌드',
  'Microsoft 365',
  'PowerBI',
  'ChatGPT',
  'Copilot',
  '디지털 혁신',
  '업무 효율성',
  '교육 노하우',
  '기술 리뷰'
];

const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes}분 읽기`;
};

export default function BlogEditor({ post, onSave, onCancel }: BlogEditorProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    htmlContent: post?.htmlContent || '',
    summary: post?.summary || '',
    author: post?.author || 'Youni',
    category: post?.category || '',
    tags: post?.tags || [],
    thumbnail: post?.thumbnail || '',
    status: post?.status || 'draft' as 'published' | 'draft'
  });

  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const handleContentChange = (content: string, htmlContent: string) => {
    setFormData(prev => ({
      ...prev,
      content,
      htmlContent
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSave = (status: 'draft' | 'published') => {
    if (!formData.title.trim()) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (!formData.content.trim()) {
      toast.error('내용을 입력해주세요.');
      return;
    }

    if (!formData.category) {
      toast.error('카테고리를 선택해주세요.');
      return;
    }

    const readTime = calculateReadTime(formData.content);
    const publishedAt = status === 'published' ? new Date().toISOString().split('T')[0] : (post?.publishedAt || '');

    const blogPost: BlogPost = {
      id: post?.id || '',
      title: formData.title,
      content: formData.content,
      htmlContent: formData.htmlContent,
      summary: formData.summary || formData.content.slice(0, 150) + '...',
      author: formData.author,
      category: formData.category,
      tags: formData.tags,
      thumbnail: formData.thumbnail || `https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop`,
      publishedAt,
      status,
      views: post?.views || 0,
      readTime
    };

    onSave(blogPost);
  };

  const generateThumbnail = () => {
    const thumbnails = [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=240&fit=crop',
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=240&fit=crop',
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=240&fit=crop'
    ];
    
    const randomThumbnail = thumbnails[Math.floor(Math.random() * thumbnails.length)];
    setFormData(prev => ({ ...prev, thumbnail: randomThumbnail }));
    toast.success('썸네일이 생성되었습니다.');
  };

  if (isPreview) {
    return (
      <div className="min-h-screen bg-gray-50 admin-light">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="ghost"
              onClick={() => setIsPreview(false)}
              className="flex items-center gap-2"
              style={{
                transition: 'none',
                animation: 'none',
                transform: 'none'
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              편집으로 돌아가기
            </Button>
          </div>

          <article className="bg-white rounded-lg shadow-sm p-8">
            {formData.thumbnail && (
              <img 
                src={formData.thumbnail} 
                alt={formData.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}

            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{formData.category}</Badge>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{formData.author}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{calculateReadTime(formData.content)}</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title}</h1>
            
            {formData.summary && (
              <p className="text-lg text-gray-600 mb-6 italic">{formData.summary}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-6">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.htmlContent }}
            />
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 admin-light">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onCancel}
              className="flex items-center gap-2"
              style={{
                transition: 'none',
                animation: 'none',
                transform: 'none'
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              목록으로 돌아가기
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              {post ? '포스트 편집' : '새 포스트 작성'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsPreview(true)}
              className="flex items-center gap-2"
              style={{
                transition: 'none',
                animation: 'none',
                transform: 'none'
              }}
            >
              <Eye className="h-4 w-4" />
              미리보기
            </Button>
            <Button
              variant="outline"
              onClick={() => handleSave('draft')}
              style={{
                transition: 'none',
                animation: 'none',
                transform: 'none'
              }}
            >
              임시저장
            </Button>
            <Button
              onClick={() => handleSave('published')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              style={{
                transition: 'none',
                animation: 'none',
                transform: 'none'
              }}
            >
              <Save className="h-4 w-4 mr-2" />
              발행
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <Card>
              <CardHeader>
                <CardTitle>제목</CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="포스트 제목을 입력하세요..."
                  className="text-lg font-medium"
                />
              </CardContent>
            </Card>

            {/* Content Editor */}
            <RichTextEditor
              content={formData.content}
              onChange={handleContentChange}
              placeholder="포스트 내용을 작성하세요..."
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  포스트 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author">작성자</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                    placeholder="작성자명"
                  />
                </div>

                <div>
                  <Label htmlFor="category">카테고리</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="summary">요약</Label>
                  <Input
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder="포스트 요약 (선택사항)"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  태그
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="태그 입력"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button 
                    onClick={addTag}
                    size="sm"
                    style={{
                      transition: 'none',
                      animation: 'none',
                      transform: 'none'
                    }}
                  >
                    추가
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="secondary" 
                      className="cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Thumbnail */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  썸네일
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={formData.thumbnail}
                  onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
                  placeholder="썸네일 URL"
                />
                <Button 
                  variant="outline" 
                  onClick={generateThumbnail}
                  className="w-full"
                  style={{
                    transition: 'none',
                    animation: 'none',
                    transform: 'none'
                  }}
                >
                  랜덤 썸네일 생성
                </Button>
                {formData.thumbnail && (
                  <img 
                    src={formData.thumbnail} 
                    alt="Thumbnail preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}