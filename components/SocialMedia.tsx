import { motion } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';

interface SocialMediaProps {
  className?: string;
  showLabels?: boolean;
}

export default function SocialMedia({ className = '', showLabels = false }: SocialMediaProps) {
  const socialLinks = [
    {
      name: 'Litt.ly',
      url: 'https://litt.ly/youni',
      icon: () => (
        <div className="w-5 h-5 rounded-full bg-current flex items-center justify-center">
          <span className="text-xs font-bold text-background">L</span>
        </div>
      ),
      hoverColor: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/younni_me/',
      icon: Instagram,
      hoverColor: 'hover:text-pink-400'
    },
    {
      name: 'Threads',
      url: 'https://www.threads.com/@younni_me',
      icon: () => (
        <div className="w-5 h-5 rounded-full bg-current flex items-center justify-center">
          <span className="text-xs font-bold text-background">@</span>
        </div>
      ),
      hoverColor: 'hover:text-purple-400'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/younni/',
      icon: Linkedin,
      hoverColor: 'hover:text-blue-500'
    }
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            group flex items-center gap-2 p-2 rounded-lg 
            text-muted-foreground transition-all duration-300
            hover:text-foreground hover:bg-card/50 hover:scale-110
            ${social.hoverColor}
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <social.icon className="w-5 h-5" />
          {showLabels && (
            <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {social.name}
            </span>
          )}
        </motion.a>
      ))}
    </div>
  );
}