'use client';

import { useEffect, useRef, useState } from 'react';
import Section from '@/components/layout/Section';
import PageWrapper from './page-wrapper';

import HeroSection from '@/components/sections/HeroSection';
import WorkSection from '@/components/sections/WorkSection';
import ContactSection from '@/components/sections/ContactSection';

interface SectionRef {
  [title: string]: HTMLElement | null;
}

export default function Page() {
  const sectionRefs = useRef<SectionRef>({});

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTitle = (entry.target as HTMLElement).getAttribute(
            'sectiontitle'
          );
          console.log(sectionTitle);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSectionRef =
    (title: string) =>
    (ref: HTMLElement | null): void => {
      sectionRefs.current[title] = ref;
    };

  return (
    <PageWrapper>
      <Section className="relative min-h-screen">
        <HeroSection />
      </Section>
      <Section
        className="-mt-32"
        ref={handleSectionRef('Work')}
        title="Work"
        fullscreen
      >
        <WorkSection />
      </Section>
      <Section title="Contact">
        <ContactSection />
      </Section>
      {/* <Section title="Book">
        <BookSection />
      </Section> */}
    </PageWrapper>
  );
}
