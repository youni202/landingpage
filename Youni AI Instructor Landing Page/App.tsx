import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from './components/ui/sonner';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LectureSection from './components/LectureSection';
import ClientsSection from './components/ClientsSection';
import BlogSection from './components/BlogSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import ContactForm from './components/ContactForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import youniCharacter from 'figma:asset/8a7fec4e08591e21e5facc5e236ca15973fa2ce5.png';

// Check if this is admin subdomain or admin mode
const isAdminMode = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    const search = window.location.search;
    
    return hostname.startsWith('admin.') || 
           hostname.includes('admin') || 
           pathname.startsWith('/admin') ||
           search.includes('admin=true');
  }
  return false;
};

// Floating animation elements configuration
const floatingElements = [
  { id: 1, size: 'w-4 h-4', color: 'bg-primary/20', x: 10, y: 20, speed: 0.5 },
  { id: 2, size: 'w-6 h-6', color: 'bg-accent/15', x: 80, y: 15, speed: 0.7 },
  { id: 3, size: 'w-3 h-3', color: 'bg-chart-3/25', x: 25, y: 70, speed: 0.4 },
  { id: 4, size: 'w-5 h-5', color: 'bg-chart-4/20', x: 75, y: 80, speed: 0.6 },
  { id: 5, size: 'w-2 h-2', color: 'bg-chart-5/30', x: 50, y: 10, speed: 0.3 },
  { id: 6, size: 'w-4 h-4', color: 'bg-primary/15', x: 90, y: 50, speed: 0.8 },
  { id: 7, size: 'w-3 h-3', color: 'bg-accent/20', x: 15, y: 90, speed: 0.5 },
  { id: 8, size: 'w-5 h-5', color: 'bg-chart-2/18', x: 60, y: 30, speed: 0.7 },
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminView, setIsAdminView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [speechBubbleMessage, setSpeechBubbleMessage] = useState('안녕하세요! 👋');
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollRevealElements, setScrollRevealElements] = useState(new Set());

  // Speech bubble messages array
  const speechMessages = ['안녕하세요! 👋', '유니입니다! 😉'];

  useEffect(() => {
    // Check if we're in admin mode
    const adminMode = isAdminMode();
    setIsAdminView(adminMode);
    
    // If in admin mode, check for existing session and skip/reduce loading
    if (adminMode) {
      const adminSession = localStorage.getItem('youni-admin-session');
      if (adminSession === 'true') {
        setIsAdminAuthenticated(true);
        setIsAdminDashboardOpen(true);
        setIsLoading(false); // Skip loading for admin
        return;
      } else {
        setIsAdminLoginOpen(true);
        setIsLoading(false); // Skip loading for admin
        return;
      }
    }

    // Regular loading for public site
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // NUCLEAR BUTTON FLICKER PREVENTION - JavaScript based
    const forceStaticButtons = () => {
      // Find ALL possible button elements
      const buttonSelectors = [
        'button',
        '[role="button"]',
        '.btn',
        '[class*="button"]',
        '[data-button]',
        'input[type="button"]',
        'input[type="submit"]',
        'input[type="reset"]',
        '.bg-primary',
        '.border-primary',
        '[onclick]'
      ];

      buttonSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach((element: any) => {
            if (element) {
              // Force static styles directly on the element
              element.style.transition = 'none !important';
              element.style.animation = 'none !important';
              element.style.transform = 'none !important';
              element.style.willChange = 'auto';
              element.style.animationDuration = '0s';
              element.style.transitionDuration = '0s';
              element.style.animationPlayState = 'paused';
              element.style.animationIterationCount = '0';
              element.style.animationFillMode = 'none';
              element.style.animationDelay = '0s';
              element.style.transitionDelay = '0s';
              element.style.transitionTimingFunction = 'step-start';
              element.style.transitionProperty = 'none';
              element.style.backfaceVisibility = 'visible';
              
              // Remove any CSS classes that might cause animations
              const classesToRemove = [
                'hover:bg-primary/80',
                'hover:scale-105',
                'hover:shadow-lg',
                'transition-all',
                'transition-colors',
                'transition-transform',
                'duration-300',
                'duration-200',
                'ease-in-out',
                'ease-out'
              ];
              
              classesToRemove.forEach(className => {
                element.classList.remove(className);
              });

              // Add event listeners to prevent any animations on interaction
              ['mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'focus', 'blur'].forEach(eventType => {
                element.addEventListener(eventType, (e: any) => {
                  e.target.style.transition = 'none !important';
                  e.target.style.animation = 'none !important';
                  e.target.style.transform = 'none !important';
                }, { passive: true });
              });
            }
          });
        } catch (error) {
          // Ignore selector errors
        }
      });
    };

    // Run immediately
    forceStaticButtons();

    // Run again after a short delay to catch dynamically added buttons
    setTimeout(forceStaticButtons, 100);
    setTimeout(forceStaticButtons, 500);
    setTimeout(forceStaticButtons, 1000);

    // Set up MutationObserver to catch any new buttons added to the DOM
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node: any) => {
            if (node.nodeType === 1) { // Element node
              const tagName = node.tagName?.toLowerCase();
              if (tagName === 'button' || 
                  node.getAttribute?.('role') === 'button' ||
                  node.className?.includes('button') ||
                  node.className?.includes('btn')) {
                shouldUpdate = true;
              }
            }
          });
        }
      });
      if (shouldUpdate) {
        setTimeout(forceStaticButtons, 10);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    let speechBubbleTimeout: NodeJS.Timeout;

    // Mouse tracking for cursor effects and repelling animations (only for public site)
    const handleMouseMove = (e: MouseEvent) => {
      if (!isAdminView) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        
        // Force static buttons on every mouse move to prevent flickering
        forceStaticButtons();
        
        // Show speech bubble occasionally when mouse moves
        if (Math.random() < 0.03) { // 3% chance on each mouse move
          // Randomly select a message
          const randomMessage = speechMessages[Math.floor(Math.random() * speechMessages.length)];
          setSpeechBubbleMessage(randomMessage);
          setShowSpeechBubble(true);
          clearTimeout(speechBubbleTimeout);
          speechBubbleTimeout = setTimeout(() => {
            setShowSpeechBubble(false);
          }, 2500);
        }
      }
    };

    // Smooth scroll for anchor links
    const handleClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.substring(1);
        const element = id ? document.getElementById(id) : null;
        if (element) {
          const headerHeight = 80; // Approximate header height
          const elementPosition = element.offsetTop - headerHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Enhanced scroll handler - scroll-to-top button and scroll reveal animations
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 500);
      
      // Scroll reveal animations (only for public site)
      if (!isAdminView) {
        const revealElements = document.querySelectorAll('.scroll-reveal-up, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
        revealElements.forEach((element: any) => {
          if (element && !scrollRevealElements.has(element)) {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Trigger animation when element is 70% visible
            if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
              element.classList.add('revealed');
              setScrollRevealElements(prev => new Set(prev).add(element));
            }
          }
        });
        
        // Stagger animations for children
        const staggerContainers = document.querySelectorAll('.stagger-children');
        staggerContainers.forEach((container: any) => {
          if (container && !scrollRevealElements.has(container)) {
            const containerTop = container.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (containerTop < windowHeight * 0.8) {
              container.classList.add('revealed');
              setScrollRevealElements(prev => new Set(prev).add(container));
            }
          }
        });
      }
    };

    if (!isAdminView) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('scroll', handleScroll);
      
      // Initial scroll check
      handleScroll();
    }
    
    document.addEventListener('click', handleClick);

    return () => {
      clearTimeout(timer);
      clearTimeout(speechBubbleTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isAdminView]);

  const openContactForm = () => {
    setIsContactFormOpen(true);
  };

  const closeContactForm = () => {
    setIsContactFormOpen(false);
  };

  const openAdminLogin = () => {
    if (isAdminMode()) {
      // If already in admin mode, just show login
      setIsAdminLoginOpen(true);
    } else {
      // Redirect to admin subdomain or add admin parameter
      if (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')) {
        // Development - use query parameter
        window.location.href = window.location.origin + '?admin=true';
      } else {
        // Production - redirect to admin subdomain
        window.location.href = `https://admin.${window.location.hostname.replace('www.', '')}`;
      }
    }
  };

  const closeAdminLogin = () => {
    setIsAdminLoginOpen(false);
    if (isAdminView && !isAdminAuthenticated) {
      // If in admin view but not authenticated and closing login, redirect to main site
      window.location.href = window.location.origin.replace('admin.', '').replace('?admin=true', '');
    }
  };

  const handleAdminLoginSuccess = () => {
    localStorage.setItem('youni-admin-session', 'true');
    setIsAdminAuthenticated(true);
    setIsAdminLoginOpen(false);
    setIsAdminDashboardOpen(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('youni-admin-session');
    setIsAdminAuthenticated(false);
    setIsAdminDashboardOpen(false);
    setIsAdminLoginOpen(false);
    
    // Redirect to main site
    if (isAdminView) {
      window.location.href = window.location.origin.replace('admin.', '').replace('?admin=true', '');
    }
  };

  const closeAdminDashboard = () => {
    setIsAdminDashboardOpen(false);
  };

  // Calculate repel distance based on mouse position (only for public site)
  const calculateRepelEffect = (elementX: number, elementY: number) => {
    if (isAdminView) return { x: 0, y: 0 };
    
    const mouseX = (mousePosition.x / window.innerWidth) * 100;
    const mouseY = (mousePosition.y / window.innerHeight) * 100;
    
    const distance = Math.sqrt(
      Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2)
    );
    
    if (distance < 15) { // Repel radius
      const repelStrength = (15 - distance) / 15;
      const angle = Math.atan2(elementY - mouseY, elementX - mouseX);
      return {
        x: Math.cos(angle) * repelStrength * 20,
        y: Math.sin(angle) * repelStrength * 20,
      };
    }
    
    return { x: 0, y: 0 };
  };

  // Loading Screen - Only show for public site or if not in admin mode
  if (isLoading && !isAdminView) {
    return (
      <motion.div
        className="fixed inset-0 bg-background flex items-center justify-center z-50"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-6">
          <motion.div
            className="text-4xl font-bold gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Youni
          </motion.div>
          
          <motion.div
            className="flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
          
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            디지털 혁신을 위한 교육 플랫폼
          </motion.p>
        </div>
      </motion.div>
    );
  }

  // Admin View - Clean interface (immediate display)
  if (isAdminView) {
    return (
      <div className="min-h-screen bg-white admin-light">
        {/* Show loading state briefly only if needed */}
        {isLoading ? (
          <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold text-gray-900">Youni 관리자</div>
              <div className="flex items-center justify-center space-x-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm">관리자 시스템 준비중...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Admin Login Modal */}
            <AdminLogin 
              isOpen={isAdminLoginOpen} 
              onClose={closeAdminLogin}
              onLoginSuccess={handleAdminLoginSuccess}
            />

            {/* Admin Dashboard */}
            <AdminDashboard 
              isOpen={isAdminDashboardOpen} 
              onClose={closeAdminDashboard}
              onLogout={handleAdminLogout}
            />
          </>
        )}

        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          richColors
          theme="light"
        />
      </div>
    );
  }

  // Public Site View - Full experience
  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen bg-background text-foreground relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Original Small Cursor Effect */}
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 bg-primary/20 rounded-full pointer-events-none z-30 mix-blend-multiply"
          animate={{
            x: mousePosition.x - 12,
            y: mousePosition.y - 12,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        />

        {/* Floating Background Elements with Mouse Repel Effect */}
        {floatingElements.map((element) => {
          const repelEffect = calculateRepelEffect(element.x, element.y);
          
          return (
            <motion.div
              key={element.id}
              className={`fixed ${element.size} ${element.color} rounded-full pointer-events-none z-10 opacity-60`}
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
              }}
              animate={{
                x: [0, 10, -10, 0, repelEffect.x],
                y: [0, -15, 15, 0, repelEffect.y],
                scale: [1, 1.2, 0.8, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8 + element.speed * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: element.id * 0.5,
              }}
            />
          );
        })}

        {/* Additional Geometric Shapes */}
        <motion.div
          className="fixed top-20 right-20 w-8 h-8 border-2 border-primary/30 pointer-events-none z-10"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          className="fixed bottom-32 left-16 w-6 h-6 bg-accent/20 pointer-events-none z-10"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 120, 240, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="fixed top-1/3 left-8 w-12 h-1 bg-gradient-to-r from-chart-3/30 to-chart-4/30 pointer-events-none z-10"
          animate={{
            width: ['3rem', '6rem', '3rem'],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Particle System */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="fixed w-1 h-1 bg-primary/20 rounded-full pointer-events-none z-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Youni Character Following Mouse */}
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-40"
          animate={{
            x: mousePosition.x - 40, // Offset to center the character
            y: mousePosition.y - 60, // Offset to position above cursor
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 20,
            mass: 0.8
          }}
        >
          <motion.img
            src={youniCharacter}
            alt="Youni Character"
            className="w-20 h-20 object-contain select-none"
            animate={{
              y: [0, -5, 0], // Gentle floating animation
              rotate: [0, 2, -2, 0] // Subtle rotation
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))"
            }}
          />
          
          {/* Enhanced Speech Bubble with Alternating Messages */}
          <AnimatePresence>
            {showSpeechBubble && (
              <motion.div
                className="absolute -top-10 -right-4 bg-white text-black text-xs px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {speechBubbleMessage}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                  <div className="w-0 h-0 border-l-3 border-r-3 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Enhanced Background Gradient Animation */}
        <motion.div
          className="fixed inset-0 opacity-20 pointer-events-none z-5"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(79, 70, 229, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(79, 70, 229, 0.1) 0%, transparent 50%)",
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Ambient Light Effects */}
        <motion.div
          className="fixed top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none z-5"
          animate={{
            x: ['-50%', '20%', '-50%'],
            y: ['-50%', '30%', '-50%'],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="fixed bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none z-5"
          animate={{
            x: ['50%', '-20%', '50%'],
            y: ['50%', '-30%', '50%'],
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Interactive Mesh Gradient */}
        <motion.div
          className="fixed inset-0 opacity-10 pointer-events-none z-5"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, rgba(79, 70, 229, 0.3) 0%, transparent 50%)`
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20
          }}
        />

        {/* Orbital Elements */}
        <motion.div
          className="fixed top-1/4 right-1/4 pointer-events-none z-10"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="relative w-32 h-32">
            <motion.div 
              className="absolute top-0 left-1/2 w-2 h-2 bg-primary/40 rounded-full transform -translate-x-1/2"
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Character Floating Effect on Idle */}
        <motion.div
          className="fixed bottom-8 left-8 pointer-events-none z-30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: mousePosition.x === 0 && mousePosition.y === 0 ? 1 : 0,
            scale: mousePosition.x === 0 && mousePosition.y === 0 ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={youniCharacter}
            alt="Youni Character Idle"
            className="w-16 h-16 object-contain select-none"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        <Header onContactClick={openContactForm} onAdminClick={openAdminLogin} />
        
        {/* Main Content - Static Sections */}
        <main>
          <HeroSection onContactClick={openContactForm} />
          <LectureSection onContactClick={openContactForm} />
          <ClientsSection />
          <BlogSection />
          <NewsletterSection />
        </main>
        
        <Footer />

        {/* Static Scroll to Top Button */}
        <button
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg z-40 flex items-center justify-center cursor-pointer"
          style={{
            opacity: isScrolled ? 1 : 0,
            backgroundColor: '#4f46e5',
            color: '#ffffff',
            transition: 'none',
            animation: 'none',
            transform: 'none'
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>

        {/* Contact Form Modal */}
        <ContactForm 
          isOpen={isContactFormOpen} 
          onClose={closeContactForm} 
        />

        {/* Admin Login Modal - Only show in public view */}
        <AdminLogin 
          isOpen={isAdminLoginOpen} 
          onClose={closeAdminLogin}
          onLoginSuccess={handleAdminLoginSuccess}
        />

        {/* Admin Dashboard - Only show in public view */}
        <AdminDashboard 
          isOpen={isAdminDashboardOpen} 
          onClose={closeAdminDashboard}
          onLogout={handleAdminLogout}
        />

        {/* Toast Notifications */}
        <Toaster 
          position="bottom-right"
          richColors
          theme="dark"
        />
      </motion.div>
    </AnimatePresence>
  );
}