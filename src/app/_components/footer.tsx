import React from 'react';
import { FaXTwitter } from 'react-icons/fa6'
import { FaGithub, FaTelegramPlane } from 'react-icons/fa'

export default function Footer() {
    return (
      <footer>
        <div className="text-center py-8">
          <div className="flex flex-row gap-16 place-content-center">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://x.com/iosartem"
            >
              <FaXTwitter className="dark:invert"/>
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/artemnovichkov"
            >
              <FaGithub className="dark:invert"/>
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://t.me/artemnovichkov"
            >
              <FaTelegramPlane className="dark:invert"/>
            </a>
          </div>
          <p className="pt-4 text-gray-900 dark:text-white">Made with ❤️ by Artem Novichkov</p>
        </div>
    </footer>
    )
}