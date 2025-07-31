import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { X, Lock, User, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function AdminLogin({ isOpen, onClose, onLogin }: AdminLoginProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 간단한 하드코딩된 로그인 체크
    if (formData.username === 'admin' && formData.password === 'rhksflwk2020') {
      toast.success('관리자 로그인 성공!');
      onLogin();
      onClose();
    } else {
      toast.error('아이디 또는 비밀번호가 잘못되었습니다.');
    }
    
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="relative"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="w-full max-w-md mx-4 bg-card/95 backdrop-blur-sm border-border/50 shadow-2xl">
            <CardHeader className="relative">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Lock className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <CardTitle className="text-center text-2xl gradient-text">
                관리자 로그인
              </CardTitle>
              
              <p className="text-center text-muted-foreground mt-2">
                관리자 계정으로 로그인하세요
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="username" className="text-sm font-medium text-foreground">
                      사용자명
                    </Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        name="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={handleInputChange}
                        className="pl-10 bg-input-background text-foreground border-border focus:border-primary"
                        placeholder="관리자 아이디를 입력하세요"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">
                      비밀번호
                    </Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="pl-10 pr-10 bg-input-background text-foreground border-border focus:border-primary"
                        placeholder="비밀번호를 입력하세요"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium py-2.5 transition-opacity"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        로그인 중...
                      </>
                    ) : (
                      '로그인'
                    )}
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    <p className="mb-2">관리자 전용 로그인</p>
                    <p className="text-xs">
                      보안을 위해 관리자 계정 정보는 별도로 문의해주세요
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}