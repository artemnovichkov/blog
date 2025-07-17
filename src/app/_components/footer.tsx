import React from 'react';
import { FaXTwitter } from 'react-icons/fa6'
import { FaGithub, FaTelegramPlane } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa';

const socialLinks = [
  {
    href: 'https://x.com/iosartem',
    label: 'X (Twitter)',
    Icon: FaXTwitter,
  },
  {
    href: 'https://github.com/artemnovichkov',
    label: 'GitHub',
    Icon: FaGithub,
  },
  {
    href: 'https://www.linkedin.com/in/artemnovichkov',
    label: 'LinkedIn',
    Icon: FaLinkedin,
  },
];

function SocialButton({ href, label, Icon }: { href: string; label: string; Icon: React.ComponentType<any> }) {
  return (
    <a
      rel="noopener noreferrer"
      target="_blank"
      href={href}
      aria-label={label}
      className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      <Icon className="w-5 h-5 dark:invert" />
    </a>
  );
}

export default function Footer() {
    return (
      <footer>
        <div className="text-center py-8">
          <div className="flex flex-row gap-16 place-content-center">
            {socialLinks.map((item) => (
              <SocialButton key={item.href} {...item} />
            ))}
          </div>
          <p className="pt-4 text-gray-900 dark:text-white">Made with ❤️ by Artem Novichkov</p>
        </div>
    </footer>
    )
}