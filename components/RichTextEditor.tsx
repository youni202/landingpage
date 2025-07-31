import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { 
  Bold, 
  Italic, 
  Underline,
  Link,
  List,
  ListOrdered,
  Quote,
  Code,
  Image,
  Undo,
  Redo,
  Eye,
  Edit
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string, htmlContent: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder = "내용을 입력하세요..." }: RichTextEditorProps) {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'html'>('edit');
  const [markdownContent, setMarkdownContent] = useState(content);
  const [htmlContent, setHtmlContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Simple markdown to HTML converter
  const markdownToHtml = (markdown: string): string => {
    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]*)\)/gim, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg" />')
      // Code blocks
      .replace(/```([\s\S]*?)```/gim, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]*)`/gim, '<code class="bg-gray-100 px-2 py-1 rounded text-sm">$1</code>')
      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 pl-4 italic">$1</blockquote>')
      // Unordered lists
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-6">$1</ul>')
      // Ordered lists
      .replace(/^1\. (.*$)/gim, '<li>$1</li>')
      // Line breaks
      .replace(/\n\n/gim, '</p><p>')
      .replace(/\n/gim, '<br />');

    // Wrap in paragraphs
    if (html && !html.startsWith('<h') && !html.startsWith('<ul') && !html.startsWith('<ol') && !html.startsWith('<blockquote')) {
      html = `<p>${html}</p>`;
    }

    return html;
  };

  // Update content when markdown changes
  useEffect(() => {
    const html = markdownToHtml(markdownContent);
    setHtmlContent(html);
    onChange(markdownContent, html);
  }, [markdownContent, onChange]);

  // Insert text at cursor position
  const insertAtCursor = (before: string, after: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdownContent.substring(start, end);
    
    const newText = markdownContent.substring(0, start) + 
                   before + selectedText + after + 
                   markdownContent.substring(end);
    
    setMarkdownContent(newText);
    
    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertAtCursor('**', '**'), tooltip: '굵게' },
    { icon: Italic, action: () => insertAtCursor('*', '*'), tooltip: '기울임' },
    { icon: Link, action: () => insertAtCursor('[', '](URL)'), tooltip: '링크' },
    { icon: List, action: () => insertAtCursor('\n* ', ''), tooltip: '목록' },
    { icon: ListOrdered, action: () => insertAtCursor('\n1. ', ''), tooltip: '번호 목록' },
    { icon: Quote, action: () => insertAtCursor('\n> ', ''), tooltip: '인용' },
    { icon: Code, action: () => insertAtCursor('`', '`'), tooltip: '코드' },
    { icon: Image, action: () => insertAtCursor('![alt](', ')'), tooltip: '이미지' },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-5 w-5" />
          리치 텍스트 에디터
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              편집
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              미리보기
            </TabsTrigger>
            <TabsTrigger value="html" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              HTML
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded-lg bg-gray-50">
              {toolbarButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={button.action}
                  title={button.tooltip}
                  className="h-8 w-8 p-0"
                  style={{
                    transition: 'none',
                    animation: 'none',
                    transform: 'none'
                  }}
                >
                  <button.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>

            {/* Editor */}
            <Textarea
              ref={textareaRef}
              value={markdownContent}
              onChange={(e) => setMarkdownContent(e.target.value)}
              placeholder={placeholder}
              rows={20}
              className="font-mono text-sm resize-none"
              style={{
                minHeight: '400px'
              }}
            />

            <div className="text-sm text-gray-500">
              <p><strong>팁:</strong> 마크다운 문법을 사용하여 텍스트를 포맷할 수 있습니다.</p>
              <p>
                # 제목1, ## 제목2, **굵게**, *기울임*, `코드`, [링크](URL), ![이미지](URL)
              </p>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div 
              className="min-h-[400px] p-4 border border-gray-200 rounded-lg bg-white prose max-w-none"
              dangerouslySetInnerHTML={{ __html: htmlContent || '<p class="text-gray-500">내용을 입력하면 미리보기가 표시됩니다.</p>' }}
            />
          </TabsContent>

          <TabsContent value="html" className="space-y-4">
            <Textarea
              value={htmlContent}
              onChange={(e) => {
                setHtmlContent(e.target.value);
                onChange(markdownContent, e.target.value);
              }}
              placeholder="HTML 코드를 직접 편집할 수 있습니다..."
              rows={20}
              className="font-mono text-sm resize-none"
              style={{
                minHeight: '400px'
              }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}