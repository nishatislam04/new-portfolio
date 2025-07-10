'use client';

import { Container } from '@/components/ui';
import { PERSONAL_INFO } from '@/constants/personal-info';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800/50">
      <Container>
        <div className="py-16">
          {/* Bottom section */}
          <div className="">
            <div className="flex flex-col justify-center items-center gap-4">
              <p className="text-gray-500 text-sm text-center">
                © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
