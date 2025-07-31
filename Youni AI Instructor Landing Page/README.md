# Youni Landing Page - Replit 배포용

한국 Microsoft & AI 교육 전문가 "유니"의 완전한 랜딩 페이지 및 관리자 시스템입니다.

## 🚀 Replit에서 바로 실행하기

### 1단계: 프로젝트 설정
```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 2단계: 접속
- **메인 사이트**: Replit에서 제공하는 웹뷰 URL
- **관리자 접근**: URL에 `?admin=true` 추가
- **관리자 로그인**: ID: `admin`, 비밀번호: `rhksflwk2020`

## ✨ 주요 기능

### 🎨 공개 사이트
- **🌙 다크 테마**: 전문적인 다크 UI/UX
- **🎭 인터랙티브 요소**: 마우스 추적 유니 캐릭터와 말풍선
- **📱 완전 반응형**: 모바일, 태블릿, 데스크톱 최적화
- **🎪 부드러운 애니메이션**: Framer Motion 기반 스크롤 애니메이션
- **🚫 버튼 깜빡임 방지**: 특별한 CSS로 버튼 애니메이션 완전 차단
- **📧 뉴스레터**: "준비중" 팝업과 함께하는 구독 시스템
- **📞 문의 시스템**: 상세한 모달 폼 (교육 유형, 인원 등)

### 🔧 관리자 시스템
- **🔐 보안 로그인**: 세션 기반 인증 시스템
- **📊 대시보드**: 전체 시스템 현황 및 통계
- **🎓 강의 관리**: 강의 생성, 수정, 삭제 기능
- **🤝 파트너 관리**: 클라이언트 기업 정보 관리
- **📝 블로그 시스템**: 마크다운/HTML 지원 리치 에디터
- **📰 뉴스레터 관리**: 뉴스레터 작성 및 발송 관리
- **💬 문의 관리**: 고객 문의사항 처리 시스템

## 🛠 기술 스택

### Frontend
- **React 18** + **TypeScript**
- **Tailwind CSS v4** (최신 버전)
- **Framer Motion** - 애니메이션
- **Lucide React** - 아이콘
- **Sonner** - 토스트 알림
- **React Hook Form** - 폼 관리

### Build & Deploy
- **Vite** - 빌드 도구
- **Replit** - 호스팅 플랫폼
- **ESLint** + **TypeScript** - 코드 품질

## 📁 프로젝트 구조

```
├── App.tsx                    # 메인 애플리케이션
├── main.tsx                   # React 진입점
├── index.html                 # HTML 템플릿
├── components/
│   ├── Header.tsx             # 네비게이션 헤더
│   ├── HeroSection.tsx        # 히어로 섹션
│   ├── LectureSection.tsx     # 강의 소개
│   ├── ClientsSection.tsx     # 파트너 클라이언트
│   ├── BlogSection.tsx        # 블로그/인사이트
│   ├── NewsletterSection.tsx  # 뉴스레터 구독
│   ├── Footer.tsx             # 푸터
│   ├── ContactForm.tsx        # 문의 모달
│   ├── AdminLogin.tsx         # 관리자 로그인
│   ├── AdminDashboard.tsx     # 관리자 대시보드
│   ├── BlogEditor.tsx         # 블로그 에디터
│   ├── RichTextEditor.tsx     # 리치 텍스트 에디터
│   ├── ui/                    # ShadCN UI 컴포넌트들
│   ├── figma/                 # Figma 관련 컴포넌트
│   └── utils/                 # 유틸리티 함수들
├── styles/
│   └── globals.css            # 글로벌 스타일 (버튼 깜빡임 방지 포함)
├── .replit                    # Replit 설정
├── replit.nix                 # Replit 환경 설정
├── package.json               # 의존성 및 스크립트
├── vite.config.ts             # Vite 설정
├── tailwind.config.js         # Tailwind 설정
└── tsconfig.json              # TypeScript 설정
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Background**: `#1f2937` (다크 그레이)
- **Primary**: `#6366f1` → `#a855f7` (블루-퍼플 그라데이션)
- **Text**: `#f9fafb` (라이트 그레이)
- **Admin**: 라이트 테마 (화이트 배경)

### 특별 기능
- **버튼 깜빡임 방지**: 특별한 CSS 규칙으로 모든 버튼 애니메이션 차단
- **한국어 최적화**: Inter 폰트와 한국어 텍스트 최적화
- **접근성**: 색상 대비 강화 및 스크린 리더 지원

## 🔑 관리자 기능 상세

### 로그인 시스템
- **접근 방법**: `?admin=true` 파라미터 또는 헤더의 "관리자" 버튼
- **인증 정보**: ID `admin`, 비밀번호 `rhksflwk2020`
- **세션 관리**: localStorage 기반 세션 유지

### 대시보드
- **통계 현황**: 강의, 파트너, 블로그 포스트 수
- **최근 활동**: 문의, 구독, 방문자 정보
- **빠른 액션**: 각 관리 섹션으로 바로가기

### 콘텐츠 관리
- **강의**: 제목, 설명, 이미지, 태그, 난이도 관리
- **파트너**: 로고, 설명, 카테고리 관리
- **블로그**: 마크다운/HTML 에디터, 카테고리, 태그
- **뉴스레터**: 제목, 내용, 발송 일정 관리

## 🚀 배포 및 커스터마이징

### Replit에서 수정하기
1. 파일 편집 후 자동 저장
2. 핫 리로드로 즉시 변경사항 확인
3. Git을 통해 버전 관리 가능

### 콘텐츠 수정
- **이미지**: Unsplash URL 교체
- **텍스트**: 각 컴포넌트 파일에서 직접 수정
- **색상**: `styles/globals.css`의 CSS 변수 수정
- **관리자 정보**: `AdminLogin.tsx`에서 인증 정보 변경

### 환경 설정
- `.env` 파일 생성으로 환경변수 설정 가능
- API 연동시 `vite.config.ts`에서 프록시 설정

## 🎯 주요 특징

### 1. 완전한 버튼 깜빡임 방지
```css
/* 특별한 CSS 규칙으로 모든 버튼 애니메이션 차단 */
button, [role="button"], .btn, [class*="button"] {
  transition: none !important;
  animation: none !important;
  transform: none !important;
}
```

### 2. 마우스 추적 캐릭터
- 부드러운 스프링 애니메이션으로 마우스 따라다니기
- 랜덤 말풍선으로 상호작용
- 유휴 상태에서 코너에 캐릭터 표시

### 3. 스크롤 애니메이션
- Intersection Observer 기반 스크롤 트리거
- 부드러운 fade-in, slide-up 효과
- 모바일 최적화된 애니메이션

### 4. 관리자 시스템
- 완전한 CRUD 기능
- 데이터 Export/Import
- 실시간 미리보기

## 📱 반응형 디자인

- **Mobile First**: 모바일 우선 설계
- **Breakpoints**: Tailwind CSS 기본 브레이크포인트 사용
- **유연한 레이아웃**: Grid와 Flexbox 조합
- **터치 최적화**: 모바일 터치 인터페이스 고려

## 🔒 보안 고려사항

- **XSS 방지**: 사용자 입력 sanitize
- **세션 관리**: 안전한 로컬 스토리지 사용
- **환경변수**: 민감한 정보 환경변수 처리
- **CORS**: 개발/운영 환경별 CORS 설정

## 🚀 성능 최적화

- **코드 분할**: Vite의 동적 import 활용
- **이미지 최적화**: WebP 형식 및 lazy loading
- **CSS 최적화**: Tailwind CSS 미사용 클래스 제거
- **번들 크기**: Tree-shaking으로 최적화

## 🎮 사용 방법

### 일반 사용자
1. 메인 페이지에서 콘텐츠 탐색
2. 강의 정보 확인 및 문의
3. 뉴스레터 구독 (준비중 메시지)
4. 블로그 포스트 읽기

### 관리자
1. 헤더에서 "관리자" 클릭 또는 `?admin=true` 접속
2. `admin` / `rhksflwk2020`로 로그인
3. 대시보드에서 각종 콘텐츠 관리
4. 실시간으로 변경사항 확인

## 📞 지원 및 문의

- **문의 양식**: 사이트 내 문의하기 버튼
- **관리자 접근**: 비밀번호 변경 필요시 코드 수정
- **기술 지원**: 코드 주석 및 TypeScript 타입 참조

---

**🎉 이제 완전한 Youni 랜딩 페이지를 Replit에서 바로 사용할 수 있습니다!**

모든 기능이 완벽하게 작동하며, 버튼 깜빡임 없는 부드러운 사용자 경험을 제공합니다.