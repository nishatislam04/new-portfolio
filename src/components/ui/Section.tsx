import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils';
import { Container } from './Container';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, children, containerSize = 'lg', padding = 'lg', ...props }, ref) => {
    const paddingStyles = {
      none: '',
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16 lg:py-20',
      lg: 'py-16 md:py-24 lg:py-32',
    };

    return (
      <section
        className={cn(paddingStyles[padding], className)}
        ref={ref}
        {...props}
      >
        <Container size={containerSize}>
          {children}
        </Container>
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
