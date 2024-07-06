'use client';

import { useEffect, useRef, useState } from 'react';
import Section from '@/components/Section';
import PageWrapper from './page-wrapper';
import Image from 'next/image';
import WaveImage from 'public/images/wave-painting.png';

import Heading from '@/components/Heading';
import WorkSection from '@/components/sections/WorkSection';
import ContactSection from '@/components/sections/ContactSection';
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
        <div className="absolute bottom-0 right-0 w-1/2">
          <Image
            src={WaveImage}
            className="w-full"
            alt="The Great Wave off Kanagawa"
          />
          <Button>See my work</Button>
        </div>
        <div className="lg:pt-[120px] pt-24 z-10 text-brown">
          <div className="relative">
            <div className="pattern-1 absolute top-0 left-0 -z-10 w-full h-44 md:w-[448px] md:h-[448px]" />
            <h1 className="font-allison text-2xl lg:leading-[170px] lg:text-[164px]">
              Luca Ciampi
            </h1>
            <div className="text-2xl lg:text-[144px] lg:leading-[160px]">
              Front<span className="font-playfair-display">-end</span> <br />
              <span className="font-playfair-display hero--developer">
                Developer
              </span>
            </div>
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
        <ContactSection />
      </Section>
    </PageWrapper>
  );
}
