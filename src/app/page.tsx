'use client';

import { useEffect, useRef, useState } from 'react';
import Section from '@/components/Section';
import PageWrapper from './page-wrapper';
import Image from 'next/image';
import WaveImage from 'public/images/wave-painting.png';

import Heading from '@/components/Heading';
import WorkSection from '@/components/sections/WorkSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

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
        <div className="absolute bottom-0 right-0">
          <Image src={WaveImage} alt="The Great Wave off Kanagawa" />
          <Button></Button>
        </div>
        <div className="relative z-10 text-brown">
          <div className="pattern-1 absolute top-24 left-0 -z-10 w-[448px] h-[448px]" />
          <h1 className="font-allison text-[164px]">Luca Ciampi</h1>
          <div className="text-[164px] leading-[180px]">
            Front<span className="font-playfair-display">-end</span> <br />
            <span className="font-playfair-display">Developer</span>
          </div>
        </div>
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
        <Heading level={'h2'} className="yess">
          coucou
        </Heading>
        <ContactSection />
      </Section>
    </PageWrapper>
  );
}
