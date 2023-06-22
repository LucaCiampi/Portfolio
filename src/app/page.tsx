"use client";

import { useEffect, useRef } from 'react';
import Section from '@/components/Section';
import Education from './education';
import PageWrapper from './page-wrapper';

// import Background from 'public/images/1.svg';
import Background from 'public/images/2.svg';
// import Background from 'public/images/3.svg';

interface SectionRef {
  [title: string]: HTMLElement | null;
}

export default function Page() {
  const sectionRefs = useRef<SectionRef>({});

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTitle = (entry.target as HTMLElement).getAttribute('sectiontitle');
          console.log(sectionTitle);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSectionRef = (title: string) => (ref: HTMLElement | null): void => {
    sectionRefs.current[title] = ref;
  };

  return (
    <PageWrapper>
      <Section fullscreen noRow>
      <div className="fullscreen--svg">
        <Background />
      </div>

      </Section>
      <Section ref={handleSectionRef('Éducation')} title='Éducation'>
        <Education />
      </Section>
    </PageWrapper>
  );
}