'use client';

import { useEffect, useRef } from 'react';
import Section from '@/components/layout/Section';
import PageWrapper from './page-wrapper';

import HeroSection from '@/components/sections/HeroSection';
import WorkSection from '@/components/sections/WorkSection';
import ContactSection from '@/components/sections/ContactSection';
import gsap from 'gsap';

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

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
          wrapper: window,
          content: document.documentElement,
          lerp: 0.1,
          duration: 1.2,
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        },
      });
    })();
  }, []);

  const handleSectionRef =
    (title: string) =>
    (ref: HTMLElement | null): void => {
      sectionRefs.current[title] = ref;
    };

  return (
    <PageWrapper>
      <Section id="hero" className="relative min-h-dvh">
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
