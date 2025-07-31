import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { 
  LayoutDashboard,
  BookOpen,
  Building2,
  FileText,
  Mail,
  MessageSquare,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  Users,
  Eye,
  Send,
  Download,
  Upload,
  Settings,
  BarChart3,
  TrendingUp,
  X,
  Save,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

interface LectureItem {
  id: string;
  title: string;
  company: string;
  date: string;
  content: string;
  summary: string;
  materials: string;
  status: 'completed' | 'scheduled' | 'cancelled';
  participants: number;
  duration: string;
  createdAt: string;
}

interface PartnerItem {
  id: string;
  name: string;
  type: string;
  description: string;
  logo?: string;
  website?: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastContact: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  htmlContent: string;
  author: string;
  category: string;
  tags: string[];
  thumbnail: string;
  publishedAt: string;
  status: 'published' | 'draft';
  views: number;
  readTime: string;
}

interface NewsletterItem {
  id: string;
  title: string;
  content: string;
  subject: string;
  scheduledAt: string;
  sentAt?: string;
  status: 'draft' | 'scheduled' | 'sent';
  subscriberCount: number;
  openRate?: number;
  clickRate?: number;
}

interface NewsletterSubscriber {
  id: string;
  email: string;
  name?: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  source: string;
  lastActivity?: string;
}

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company?: string;
  position?: string;
  phone?: string;
  service: string;
  message: string;
  status: 'new' | 'in-progress' | 'completed';
  submittedAt: string;
  response?: string;
  respondedAt?: string;
}

export default function AdminDashboard({ isOpen, onClose, onLogout }: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [formData, setFormData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Data states
  const [lectures, setLectures] = useState<LectureItem[]>([]);
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);

  // Stats
  const [stats, setStats] = useState({
    totalLectures: 0,
    totalPartners: 0,
    totalSubscribers: 0,
    newInquiries: 0,
    monthlyViews: 0,
    activeNewsletters: 0
  });

  // Initialize sample data
  useEffect(() => {
    if (isOpen) {
      const sampleLectures: LectureItem[] = [
        {
          id: '1',
          title: 'Microsoft 365 실무 활용 교육',
          company: '경기도인재개발원',
          date: '2024-01-15',
          content: 'Teams, SharePoint, Power Platform 활용법',
          summary: '기업 업무 효율성을 위한 Microsoft 365 완전 정복',
          materials: 'PPT, 실습 파일, 매뉴얼',
          status: 'completed',
          participants: 45,
          duration: '16시간',
          createdAt: '2024-01-10'
        },
        {
          id: '2',
          title: 'AI 업무 혁신 워크샵',
          company: 'SK그룹',
          date: '2024-01-20',
          content: 'ChatGPT, Copilot 업무 적용',
          summary: 'AI를 활용한 업무 자동화 및 효율성 향상',
          materials: 'AI 활용 가이드, 실습 예제',
          status: 'completed',
          participants: 30,
          duration: '8시간',
          createdAt: '2024-01-18'
        }
      ];

      const samplePartners: PartnerItem[] = [
        {
          id: '1',
          name: '경기도인재개발원',
          type: '공공기관',
          description: '경기도 공무원 및 시민 대상 교육 프로그램 제공',
          logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
          website: 'https://gghrd.or.kr',
          contactPerson: '김교육',
          email: 'education@gghrd.or.kr',
          phone: '031-123-4567',
          status: 'active',
          createdAt: '2024-01-01',
          lastContact: '2024-01-15'
        },
        {
          id: '2',
          name: 'SK그룹',
          type: '대기업',
          description: 'SK 계열사 임직원 대상 디지털 혁신 교육',
          contactPerson: '이혁신',
          email: 'innovation@sk.com',
          phone: '02-123-4567',
          status: 'active',
          createdAt: '2024-01-05',
          lastContact: '2024-01-20'
        }
      ];

      const sampleBlogPosts: BlogPost[] = [
        {
          id: '1',
          title: '2025년 기업 AI 도입 트렌드: 꼭 알아야 할 5가지',
          content: '올해 주목해야 할 기업용 AI 트렌드를 분석하고...',
          htmlContent: '<h2>2025년 AI 트렌드</h2><p>올해 주목해야 할...</p>',
          author: 'Youni',
          category: 'AI 트렌드',
          tags: ['AI', '트렌드', '2025'],
          thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=240&fit=crop',
          publishedAt: '2025-01-10',
          status: 'published',
          views: 1250,
          readTime: '8분 읽기'
        }
      ];

      const sampleNewsletters: NewsletterItem[] = [
        {
          id: '1',
          title: '2025년 1월 뉴스레터',
          content: '새해 첫 번째 뉴스레터입니다...',
          subject: '[Youni] 새해 첫 AI 트렌드 소식',
          scheduledAt: '2025-01-25T09:00:00',
          status: 'draft',
          subscriberCount: 156
        }
      ];

      const sampleSubscribers: NewsletterSubscriber[] = [
        {
          id: '1',
          email: 'user1@company.com',
          name: '김영희',
          subscribedAt: '2024-01-18',
          status: 'active',
          source: '웹사이트',
          lastActivity: '2024-01-20'
        },
        {
          id: '2',
          email: 'manager@corp.com',
          subscribedAt: '2024-01-19',
          status: 'active',
          source: '강의',
          lastActivity: '2024-01-19'
        }
      ];

      const sampleContacts: ContactInquiry[] = [
        {
          id: '1',
          name: '박민수',
          email: 'park@example.com',
          company: 'ABC기업',
          position: '인사팀 과장',
          phone: '010-1234-5678',
          service: 'Microsoft 365 교육',
          message: 'Microsoft 365 교육에 대한 문의드립니다. 직원 50명 대상으로...',
          status: 'new',
          submittedAt: '2024-01-20T14:30:00'
        }
      ];

      setLectures(sampleLectures);
      setPartners(samplePartners);
      setBlogPosts(sampleBlogPosts);
      setNewsletters(sampleNewsletters);
      setSubscribers(sampleSubscribers);
      setContacts(sampleContacts);

      setStats({
        totalLectures: sampleLectures.length,
        totalPartners: samplePartners.length,
        totalSubscribers: sampleSubscribers.length,
        newInquiries: sampleContacts.filter(c => c.status === 'new').length,
        monthlyViews: 3250,
        activeNewsletters: sampleNewsletters.filter(n => n.status !== 'sent').length
      });
    }
  }, [isOpen]);

  const handleLogout = () => {
    toast.success('로그아웃되었습니다.');
    onLogout();
    onClose();
  };

  const handleCreateItem = (type: string) => {
    setShowCreateModal(type);
    setEditingItem(null);
    setFormData({});
  };

  const handleEditItem = (item: any, type: string) => {
    setEditingItem(item);
    setShowCreateModal(type);
    setFormData(item);
  };

  const handleDeleteItem = (id: string, type: string) => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      switch (type) {
        case 'lecture':
          setLectures(prev => prev.filter(item => item.id !== id));
          break;
        case 'partner':
          setPartners(prev => prev.filter(item => item.id !== id));
          break;
        case 'blog':
          setBlogPosts(prev => prev.filter(item => item.id !== id));
          break;
        case 'newsletter':
          setNewsletters(prev => prev.filter(item => item.id !== id));
          break;
        case 'subscriber':
          setSubscribers(prev => prev.filter(item => item.id !== id));
          break;
      }
      toast.success('삭제되었습니다.');
    }
  };

  const sendEmailResponse = (contact: ContactInquiry, response: string) => {
    // Simulate email sending
    setContacts(prev => prev.map(c => 
      c.id === contact.id 
        ? { ...c, status: 'completed', response, respondedAt: new Date().toISOString() }
        : c
    ));
    toast.success('이메일이 발송되었습니다.');
  };

  const handleSaveItem = async (type: string) => {
    setIsSubmitting(true);
    try {
      if (editingItem) {
        // Update existing item
        switch (type) {
          case 'lecture':
            setLectures(prev => prev.map(item => 
              item.id === editingItem.id ? { ...item, ...formData } : item
            ));
            break;
          case 'partner':
            setPartners(prev => prev.map(item => 
              item.id === editingItem.id ? { ...item, ...formData } : item
            ));
            break;
          case 'blog':
            setBlogPosts(prev => prev.map(item => 
              item.id === editingItem.id ? { ...item, ...formData } : item
            ));
            break;
          case 'newsletter':
            setNewsletters(prev => prev.map(item => 
              item.id === editingItem.id ? { ...item, ...formData } : item
            ));
            break;
        }
        toast.success('수정되었습니다.');
      } else {
        // Create new item
        const newItem = { 
          ...formData, 
          id: Date.now().toString(),
          createdAt: new Date().toISOString().split('T')[0]
        };
        
        switch (type) {
          case 'lecture':
            setLectures(prev => [newItem, ...prev]);
            break;
          case 'partner':
            setPartners(prev => [newItem, ...prev]);
            break;
          case 'blog':
            setBlogPosts(prev => [newItem, ...prev]);
            break;
          case 'newsletter':
            setNewsletters(prev => [newItem, ...prev]);
            break;
        }
        toast.success('등록되었습니다.');
      }
      setShowCreateModal(null);
      setFormData({});
      setEditingItem(null);
    } catch (error) {
      toast.error('오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      active: { label: '활성', className: 'bg-green-100 text-green-800 border-green-200' },
      inactive: { label: '비활성', className: 'bg-gray-100 text-gray-800 border-gray-200' },
      completed: { label: '완료', className: 'bg-blue-100 text-blue-800 border-blue-200' },
      scheduled: { label: '예정', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      cancelled: { label: '취소', className: 'bg-red-100 text-red-800 border-red-200' },
      published: { label: '발행', className: 'bg-green-100 text-green-800 border-green-200' },
      draft: { label: '임시저장', className: 'bg-gray-100 text-gray-800 border-gray-200' },
      sent: { label: '발송완료', className: 'bg-blue-100 text-blue-800 border-blue-200' },
      new: { label: '신규', className: 'bg-purple-100 text-purple-800 border-purple-200' },
      'in-progress': { label: '진행중', className: 'bg-orange-100 text-orange-800 border-orange-200' },
      unsubscribed: { label: '구독취소', className: 'bg-red-100 text-red-800 border-red-200' }
    };

    const config = statusMap[status] || { label: status, className: 'bg-gray-100 text-gray-800' };
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white admin-light">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Settings className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Youni 관리자</h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {[
                { id: 'dashboard', icon: LayoutDashboard, label: '대시보드' },
                { id: 'lectures', icon: BookOpen, label: '강의 관리' },
                { id: 'partners', icon: Building2, label: '파트너 관리' },
                { id: 'blog', icon: FileText, label: '인사이트 관리' },
                { id: 'newsletters', icon: Mail, label: '뉴스레터' },
                { id: 'contacts', icon: MessageSquare, label: '문의 관리' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              로그아웃
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {activeSection === 'dashboard' && '대시보드'}
                  {activeSection === 'lectures' && '강의 관리'}
                  {activeSection === 'partners' && '파트너 관리'}
                  {activeSection === 'blog' && '인사이트 관리'}
                  {activeSection === 'newsletters' && '뉴스레터'}
                  {activeSection === 'contacts' && '문의 관리'}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {activeSection === 'dashboard' && '전체 현황을 한눈에 확인하세요'}
                  {activeSection === 'lectures' && '강의 일정과 내용을 관리하세요'}
                  {activeSection === 'partners' && '파트너 기관 정보를 관리하세요'}
                  {activeSection === 'blog' && '블로그 포스트를 작성하고 관리하세요'}
                  {activeSection === 'newsletters' && '뉴스레터를 작성하고 발송하세요'}
                  {activeSection === 'contacts' && '고객 문의를 처리하세요'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {/* Dashboard */}
            {activeSection === 'dashboard' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">총 강의</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.totalLectures}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">파트너 기관</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.totalPartners}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">뉴스레터 구독자</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.totalSubscribers}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Mail className="h-6 w-6 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">신규 문의</p>
                          <p className="text-2xl font-bold text-gray-900">{stats.newInquiries}</p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-6 w-6 text-orange-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="bg-white border-gray-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      최근 활동
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {contacts.slice(0, 5).map((contact) => (
                        <div key={contact.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <MessageSquare className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{contact.name}님의 문의</p>
                              <p className="text-sm text-gray-500">{contact.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            {getStatusBadge(contact.status)}
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(contact.submittedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Lectures Management */}
            {activeSection === 'lectures' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="강의 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCreateItem('lecture')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    새 강의 등록
                  </Button>
                </div>

                <Card className="bg-white border-gray-200">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200">
                          <TableHead className="text-gray-900 font-medium">강의명</TableHead>
                          <TableHead className="text-gray-900 font-medium">기업명</TableHead>
                          <TableHead className="text-gray-900 font-medium">일정</TableHead>
                          <TableHead className="text-gray-900 font-medium">시간</TableHead>
                          <TableHead className="text-gray-900 font-medium">참가자</TableHead>
                          <TableHead className="text-gray-900 font-medium">상태</TableHead>
                          <TableHead className="text-gray-900 font-medium">작업</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lectures
                          .filter(lecture => 
                            lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            lecture.company.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((lecture) => (
                          <TableRow key={lecture.id} className="border-gray-200">
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-900">{lecture.title}</p>
                                <p className="text-sm text-gray-500">{lecture.summary}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600">{lecture.company}</TableCell>
                            <TableCell className="text-gray-600">{lecture.date}</TableCell>
                            <TableCell className="text-gray-600">{lecture.duration}</TableCell>
                            <TableCell className="text-gray-600">{lecture.participants}명</TableCell>
                            <TableCell>{getStatusBadge(lecture.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditItem(lecture, 'lecture')}
                                  className="text-gray-600 hover:text-blue-600"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteItem(lecture.id, 'lecture')}
                                  className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Partners Management */}
            {activeSection === 'partners' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="파트너 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCreateItem('partner')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    새 파트너 등록
                  </Button>
                </div>

                <Card className="bg-white border-gray-200">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200">
                          <TableHead className="text-gray-900 font-medium">기관명</TableHead>
                          <TableHead className="text-gray-900 font-medium">유형</TableHead>
                          <TableHead className="text-gray-900 font-medium">담당자</TableHead>
                          <TableHead className="text-gray-900 font-medium">연락처</TableHead>
                          <TableHead className="text-gray-900 font-medium">최근 연락</TableHead>
                          <TableHead className="text-gray-900 font-medium">상태</TableHead>
                          <TableHead className="text-gray-900 font-medium">작업</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {partners
                          .filter(partner => 
                            partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            partner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((partner) => (
                          <TableRow key={partner.id} className="border-gray-200">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                {partner.logo && (
                                  <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="w-8 h-8 rounded object-cover"
                                  />
                                )}
                                <div>
                                  <p className="font-medium text-gray-900">{partner.name}</p>
                                  <p className="text-sm text-gray-500">{partner.description}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-gray-100 text-gray-800">{partner.type}</Badge>
                            </TableCell>
                            <TableCell className="text-gray-600">{partner.contactPerson}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <p className="text-gray-900">{partner.email}</p>
                                <p className="text-gray-500">{partner.phone}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600">{partner.lastContact}</TableCell>
                            <TableCell>{getStatusBadge(partner.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditItem(partner, 'partner')}
                                  className="text-gray-600 hover:text-blue-600"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteItem(partner.id, 'partner')}
                                  className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Blog Management */}
            {activeSection === 'blog' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="포스트 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => handleCreateItem('blog')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    새 포스트 작성
                  </Button>
                </div>

                <Card className="bg-white border-gray-200">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200">
                          <TableHead className="text-gray-900 font-medium">제목</TableHead>
                          <TableHead className="text-gray-900 font-medium">카테고리</TableHead>
                          <TableHead className="text-gray-900 font-medium">태그</TableHead>
                          <TableHead className="text-gray-900 font-medium">조회수</TableHead>
                          <TableHead className="text-gray-900 font-medium">발행일</TableHead>
                          <TableHead className="text-gray-900 font-medium">상태</TableHead>
                          <TableHead className="text-gray-900 font-medium">작업</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blogPosts
                          .filter(post => 
                            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.category.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((post) => (
                          <TableRow key={post.id} className="border-gray-200">
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <img
                                  src={post.thumbnail}
                                  alt={post.title}
                                  className="w-12 h-12 rounded object-cover"
                                />
                                <div>
                                  <p className="font-medium text-gray-900">{post.title}</p>
                                  <p className="text-sm text-gray-500">{post.readTime} • {post.author}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-blue-100 text-blue-800">{post.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {post.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                                {post.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{post.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600">{post.views.toLocaleString()}</TableCell>
                            <TableCell className="text-gray-600">{post.publishedAt}</TableCell>
                            <TableCell>{getStatusBadge(post.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-600 hover:text-blue-600"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditItem(post, 'blog')}
                                  className="text-gray-600 hover:text-blue-600"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteItem(post.id, 'blog')}
                                  className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Newsletter Management */}
            {activeSection === 'newsletters' && (
              <div className="space-y-6">
                {/* Newsletter Creation/Management */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <Mail className="h-5 w-5 text-blue-600" />
                        뉴스레터 관리
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Button
                          onClick={() => handleCreateItem('newsletter')}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          새 뉴스레터 작성
                        </Button>
                        <div className="space-y-3">
                          {newsletters.map((newsletter) => (
                            <div key={newsletter.id} className="p-4 border border-gray-200 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-900">{newsletter.title}</h4>
                                  <p className="text-sm text-gray-500">구독자 {newsletter.subscriberCount}명</p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getStatusBadge(newsletter.status)}
                                  <Button variant="ghost" size="sm">
                                    <Send className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Subscriber Management */}
                  <Card className="bg-white border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-gray-900">
                        <Users className="h-5 w-5 text-green-600" />
                        구독자 관리
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">
                              {subscribers.filter(s => s.status === 'active').length}
                            </p>
                            <p className="text-sm text-gray-600">활성 구독자</p>
                          </div>
                          <div className="text-center p-3 bg-red-50 rounded-lg">
                            <p className="text-2xl font-bold text-red-600">
                              {subscribers.filter(s => s.status === 'unsubscribed').length}
                            </p>
                            <p className="text-sm text-gray-600">구독 취소</p>
                          </div>
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {subscribers.map((subscriber) => (
                            <div key={subscriber.id} className="flex items-center justify-between p-2 border border-gray-200 rounded">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{subscriber.email}</p>
                                <p className="text-xs text-gray-500">{subscriber.source}</p>
                              </div>
                              {getStatusBadge(subscriber.status)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Contact Management */}
            {activeSection === 'contacts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="문의 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-500"
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32 bg-white border-gray-200">
                        <SelectValue placeholder="상태" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        <SelectItem value="new">신규</SelectItem>
                        <SelectItem value="in-progress">진행중</SelectItem>
                        <SelectItem value="completed">완료</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Card className="bg-white border-gray-200">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200">
                          <TableHead className="text-gray-900 font-medium">문의자</TableHead>
                          <TableHead className="text-gray-900 font-medium">회사/직책</TableHead>
                          <TableHead className="text-gray-900 font-medium">서비스</TableHead>
                          <TableHead className="text-gray-900 font-medium">문의일</TableHead>
                          <TableHead className="text-gray-900 font-medium">상태</TableHead>
                          <TableHead className="text-gray-900 font-medium">작업</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts
                          .filter(contact => 
                            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            contact.email.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((contact) => (
                          <TableRow key={contact.id} className="border-gray-200">
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-900">{contact.name}</p>
                                <p className="text-sm text-gray-500">{contact.email}</p>
                                {contact.phone && (
                                  <p className="text-sm text-gray-500">{contact.phone}</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                {contact.company && (
                                  <p className="text-gray-900">{contact.company}</p>
                                )}
                                {contact.position && (
                                  <p className="text-sm text-gray-500">{contact.position}</p>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600">{contact.service}</TableCell>
                            <TableCell className="text-gray-600">
                              {new Date(contact.submittedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{getStatusBadge(contact.status)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-600 hover:text-blue-600"
                                  onClick={() => {
                                    // 문의 상세 보기 모달
                                    setEditingItem(contact);
                                    setShowCreateModal('contact-detail');
                                  }}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-600 hover:text-green-600"
                                  onClick={() => {
                                    // 이메일 답변 모달
                                    setEditingItem(contact);
                                    setShowCreateModal('contact-reply');
                                  }}
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Detail Modal */}
      {showCreateModal === 'contact-detail' && editingItem && (
        <Dialog open={true} onOpenChange={() => setShowCreateModal(null)}>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle className="text-gray-900">문의 상세 정보</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-700">문의자명</Label>
                  <p className="mt-1 text-gray-900">{editingItem.name}</p>
                </div>
                <div>
                  <Label className="text-gray-700">이메일</Label>
                  <p className="mt-1 text-gray-900">{editingItem.email}</p>
                </div>
                <div>
                  <Label className="text-gray-700">회사명</Label>
                  <p className="mt-1 text-gray-900">{editingItem.company || '-'}</p>
                </div>
                <div>
                  <Label className="text-gray-700">직책</Label>
                  <p className="mt-1 text-gray-900">{editingItem.position || '-'}</p>
                </div>
              </div>
              <div>
                <Label className="text-gray-700">서비스</Label>
                <p className="mt-1 text-gray-900">{editingItem.service}</p>
              </div>
              <div>
                <Label className="text-gray-700">문의 내용</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded border min-h-[100px]">
                  <p className="text-gray-900">{editingItem.message}</p>
                </div>
              </div>
              {editingItem.response && (
                <div>
                  <Label className="text-gray-700">답변 내용</Label>
                  <div className="mt-1 p-3 bg-blue-50 rounded border">
                    <p className="text-gray-900">{editingItem.response}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      답변일: {new Date(editingItem.respondedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(null)}
                className="border-gray-200 text-gray-600"
              >
                닫기
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Contact Reply Modal */}
      {showCreateModal === 'contact-reply' && editingItem && (
        <Dialog open={true} onOpenChange={() => setShowCreateModal(null)}>
          <DialogContent className="max-w-2xl bg-white">
            <DialogHeader>
              <DialogTitle className="text-gray-900">이메일 답변</DialogTitle>
              <DialogDescription className="text-gray-600">
                {editingItem.name}님 ({editingItem.email})에게 답변을 보냅니다.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-gray-700">제목</Label>
                <Input
                  defaultValue={`Re: ${editingItem.service} 문의에 대한 답변`}
                  className="mt-1 bg-white border-gray-200"
                />
              </div>
              <div>
                <Label className="text-gray-700">답변 내용</Label>
                <Textarea
                  placeholder="답변 내용을 입력하세요..."
                  rows={8}
                  className="mt-1 bg-white border-gray-200"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(null)}
                className="border-gray-200 text-gray-600"
              >
                취소
              </Button>
              <Button
                onClick={() => {
                  sendEmailResponse(editingItem, '답변이 발송되었습니다.');
                  setShowCreateModal(null);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="h-4 w-4 mr-2" />
                답변 발송
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Lecture Form Modal */}
      {showCreateModal === 'lecture' && (
        <Dialog open={true} onOpenChange={() => setShowCreateModal(null)}>
          <DialogContent className="max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                {editingItem ? '강의 수정' : '새 강의 등록'}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                강의 정보를 입력하세요. 모든 필드는 필수입니다.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">강의명 *</Label>
                  <Input
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="강의명을 입력하세요"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">기업명 *</Label>
                  <Input
                    value={formData.company || ''}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="교육 기업명을 입력하세요"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">강의일 *</Label>
                  <Input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">교육 시간 *</Label>
                  <Input
                    value={formData.duration || ''}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="예: 8시간, 16시간"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">참가자 수</Label>
                  <Input
                    type="number"
                    value={formData.participants || ''}
                    onChange={(e) => setFormData({...formData, participants: parseInt(e.target.value) || 0})}
                    placeholder="참가자 수를 입력하세요"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">상태 *</Label>
                  <Select 
                    value={formData.status || 'scheduled'} 
                    onValueChange={(value) => setFormData({...formData, status: value})}
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-200">
                      <SelectValue placeholder="상태를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">예정</SelectItem>
                      <SelectItem value="completed">완료</SelectItem>
                      <SelectItem value="cancelled">취소</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">강의 내용 *</Label>
                  <Textarea
                    value={formData.content || ''}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="강의에서 다룰 주요 내용을 입력하세요"
                    rows={4}
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">강의 요약 *</Label>
                  <Textarea
                    value={formData.summary || ''}
                    onChange={(e) => setFormData({...formData, summary: e.target.value})}
                    placeholder="강의에 대한 간단한 요약을 작성하세요"
                    rows={3}
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">강의 자료</Label>
                  <Textarea
                    value={formData.materials || ''}
                    onChange={(e) => setFormData({...formData, materials: e.target.value})}
                    placeholder="제공되는 강의 자료를 입력하세요 (예: PPT, 실습파일, 매뉴얼)"
                    rows={3}
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(null)}
                className="border-gray-200 text-gray-600"
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button
                onClick={() => handleSaveItem('lecture')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting || !formData.title || !formData.company || !formData.date}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingItem ? '수정' : '등록'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Partner Form Modal */}
      {showCreateModal === 'partner' && (
        <Dialog open={true} onOpenChange={() => setShowCreateModal(null)}>
          <DialogContent className="max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                {editingItem ? '파트너 수정' : '새 파트너 등록'}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                파트너 기관 정보를 입력하세요.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">기관명 *</Label>
                  <Input
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="파트너 기관명을 입력하세요"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">기관 유형 *</Label>
                  <Select 
                    value={formData.type || ''} 
                    onValueChange={(value) => setFormData({...formData, type: value})}
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-200">
                      <SelectValue placeholder="기관 유형을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="대기업">대기업</SelectItem>
                      <SelectItem value="중견기업">중견기업</SelectItem>
                      <SelectItem value="중소기업">중소기업</SelectItem>
                      <SelectItem value="공공기관">공공기관</SelectItem>
                      <SelectItem value="교육기관">교육기관</SelectItem>
                      <SelectItem value="비영리단체">비영리단체</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-700">담당자명 *</Label>
                  <Input
                    value={formData.contactPerson || ''}
                    onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                    placeholder="담당자 이름을 입력하세요"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">이메일 *</Label>
                  <Input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="담당자 이메일을 입력하세요"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">전화번호</Label>
                  <Input
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="전화번호를 입력하세요"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">기관 설명</Label>
                  <Textarea
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="기관에 대한 간단한 설명을 입력하세요"
                    rows={4}
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">웹사이트</Label>
                  <Input
                    type="url"
                    value={formData.website || ''}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    placeholder="https://example.com"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">로고 URL</Label>
                  <Input
                    type="url"
                    value={formData.logo || ''}
                    onChange={(e) => setFormData({...formData, logo: e.target.value})}
                    placeholder="로고 이미지 URL을 입력하세요"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">최근 연락일</Label>
                  <Input
                    type="date"
                    value={formData.lastContact || ''}
                    onChange={(e) => setFormData({...formData, lastContact: e.target.value})}
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">상태 *</Label>
                  <Select 
                    value={formData.status || 'active'} 
                    onValueChange={(value) => setFormData({...formData, status: value})}
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-200">
                      <SelectValue placeholder="상태를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">활성</SelectItem>
                      <SelectItem value="inactive">비활성</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(null)}
                className="border-gray-200 text-gray-600"
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button
                onClick={() => handleSaveItem('partner')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting || !formData.name || !formData.type || !formData.contactPerson || !formData.email}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingItem ? '수정' : '등록'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Blog Form Modal */}
      {showCreateModal === 'blog' && (
        <Dialog open={true} onOpenChange={() => setShowCreateModal(null)}>
          <DialogContent className="max-w-5xl bg-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                {editingItem ? '포스트 수정' : '새 포스트 작성'}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                블로그 포스트를 작성하세요. HTML 형식으로 작성 가능합니다.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <Label className="text-gray-700">제목 *</Label>
                  <Input
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="포스트 제목을 입력하세요"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">내용 (텍스트) *</Label>
                  <Textarea
                    value={formData.content || ''}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="포스트 내용을 입력하세요"
                    rows={6}
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">HTML 내용</Label>
                  <Textarea
                    value={formData.htmlContent || ''}
                    onChange={(e) => setFormData({...formData, htmlContent: e.target.value})}
                    placeholder="<h2>제목</h2><p>내용...</p> 형식으로 HTML을 입력하세요"
                    rows={8}
                    className="mt-1 bg-white border-gray-200 text-gray-900 font-mono text-sm"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">작성자</Label>
                  <Input
                    value={formData.author || 'Youni'}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">카테고리 *</Label>
                  <Input
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    placeholder="예: AI 트렌드, Microsoft 팁"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">태그 (쉼표로 구분)</Label>
                  <Input
                    value={formData.tags ? formData.tags.join(', ') : ''}
                    onChange={(e) => setFormData({
                      ...formData, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                    })}
                    placeholder="AI, 트렌드, 2025"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">썸네일 이미지 URL</Label>
                  <Input
                    type="url"
                    value={formData.thumbnail || ''}
                    onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                    placeholder="https://images.unsplash.com/..."
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">읽기 시간</Label>
                  <Input
                    value={formData.readTime || ''}
                    onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                    placeholder="5분 읽기"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">발행일</Label>
                  <Input
                    type="date"
                    value={formData.publishedAt || ''}
                    onChange={(e) => setFormData({...formData, publishedAt: e.target.value})}
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">상태 *</Label>
                  <Select 
                    value={formData.status || 'draft'} 
                    onValueChange={(value) => setFormData({...formData, status: value})}
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-200">
                      <SelectValue placeholder="상태를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">임시저장</SelectItem>
                      <SelectItem value="published">발행</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-700">조회수</Label>
                  <Input
                    type="number"
                    value={formData.views || 0}
                    onChange={(e) => setFormData({...formData, views: parseInt(e.target.value) || 0})}
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(null)}
                className="border-gray-200 text-gray-600"
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button
                onClick={() => handleSaveItem('blog')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting || !formData.title || !formData.content || !formData.category}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingItem ? '수정' : '발행'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Newsletter Form Modal */}
      {showCreateModal === 'newsletter' && (
        <Dialog open={true} onOpenChange={() => setShowCreateModal(null)}>
          <DialogContent className="max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gray-900">
                {editingItem ? '뉴스레터 수정' : '새 뉴스레터 작성'}
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                뉴스레터를 작성하고 발송 일정을 설정하세요.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <Label className="text-gray-700">뉴스레터 제목 *</Label>
                  <Input
                    value={formData.title || ''}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="뉴스레터 제목을 입력하세요"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">이메일 제목 *</Label>
                  <Input
                    value={formData.subject || ''}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="[Youni] 이메일 제목"
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">뉴스레터 내용 *</Label>
                  <Textarea
                    value={formData.content || ''}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="뉴스레터 내용을 작성하세요. HTML 태그를 사용할 수 있습니다."
                    rows={12}
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700">발송 예정일 *</Label>
                  <Input
                    type="datetime-local"
                    value={formData.scheduledAt?.slice(0, 16) || ''}
                    onChange={(e) => setFormData({...formData, scheduledAt: e.target.value + ':00'})}
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                  />
                </div>
                <div>
                  <Label className="text-gray-700">상태 *</Label>
                  <Select 
                    value={formData.status || 'draft'} 
                    onValueChange={(value) => setFormData({...formData, status: value})}
                  >
                    <SelectTrigger className="mt-1 bg-white border-gray-200">
                      <SelectValue placeholder="상태를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">임시저장</SelectItem>
                      <SelectItem value="scheduled">발송예정</SelectItem>
                      <SelectItem value="sent">발송완료</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-gray-700">예상 구독자 수</Label>
                  <Input
                    type="number"
                    value={formData.subscriberCount || subscribers.filter(s => s.status === 'active').length}
                    onChange={(e) => setFormData({...formData, subscriberCount: parseInt(e.target.value) || 0})}
                    className="mt-1 bg-white border-gray-200 text-gray-900"
                    readOnly
                  />
                </div>
                {editingItem && editingItem.status === 'sent' && (
                  <>
                    <div>
                      <Label className="text-gray-700">오픈율</Label>
                      <Input
                        value={`${formData.openRate || 0}%`}
                        readOnly
                        className="mt-1 bg-gray-50 border-gray-200 text-gray-700"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700">클릭율</Label>
                      <Input
                        value={`${formData.clickRate || 0}%`}
                        readOnly
                        className="mt-1 bg-gray-50 border-gray-200 text-gray-700"
                      />
                    </div>
                  </>
                )}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">💡 작성 팁</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• HTML 태그 사용 가능</li>
                    <li>• 이미지는 URL로 삽입</li>
                    <li>• 링크는 &lt;a&gt; 태그 사용</li>
                    <li>• 발송 후 수정 불가</li>
                  </ul>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(null)}
                className="border-gray-200 text-gray-600"
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button
                onClick={() => handleSaveItem('newsletter')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isSubmitting || !formData.title || !formData.subject || !formData.content || !formData.scheduledAt}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    저장 중...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingItem ? '수정' : '저장'}
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}