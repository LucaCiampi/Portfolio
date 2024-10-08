'use client';

import { useEffect, useRef } from 'react';

import PageWrapper from '@/app/page-wrapper';
import Section from '@/components/layout/Section';

import HeroSection from '@/components/sections/HeroSection';
import WorkSection from '@/components/sections/WorkSection';
import ContactSection from '@/components/sections/ContactSection';

interface SectionRef {
  [title: string]: HTMLElement | null;
}

export default function Page() {
  const sectionRefs = useRef<SectionRef>({});

  /**
   * Observes the sections the user is currently viewing
   */
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const dataSectionTitle = (entry.target as HTMLElement).getAttribute(
            'data-sectiontitle'
          );
          console.log(dataSectionTitle);
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
  }, [sectionRefs]);

  /**
   * Adds smooth scrolling
   */
  useEffect(() => {
    let locomotiveScroll: any;

    (async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        locomotiveScroll = new LocomotiveScroll({
          lenisOptions: {
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
      } catch (error) {
        console.error('Error in LocomotiveScroll initialization:', error);
      }
    })();

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  const handleSectionRef =
    (title: string) =>
    (ref: HTMLElement | null): void => {
      sectionRefs.current[title] = ref;
    };

  return (
    <PageWrapper>
      <Section
        ref={handleSectionRef('Hero')}
        id="hero"
        className="relative min-h-lvh overflow-x-clip"
      >
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
      <Section
        ref={handleSectionRef('Contact')}
        title="Contact"
        className="overflow-x-clip"
      >
        <ContactSection />
      </Section>
    </PageWrapper>
  );
}
