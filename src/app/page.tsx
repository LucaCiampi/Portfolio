"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/Section";
import Education from "./education";
import PageWrapper from "./page-wrapper";
import Image from "next/image";
import FacadeImage from "public/images/facade.jpg";
import WaterImage from "public/images/water.jpg";

import Heading from "@/components/Heading";
import Frame, { BorderStyles } from "@/components/Frame";
import WorkSection from "@/components/sections/WorkSection";
import ContactSection from "@/components/sections/ContactSection";

interface SectionRef {
  [title: string]: HTMLElement | null;
}

export default function Page() {
  const sectionRefs = useRef<SectionRef>({});

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionTitle = (entry.target as HTMLElement).getAttribute(
            "sectiontitle"
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
      <Section className="flex items-center gap-11 pt-24">
        <div className="relative flex h-[650px] grow">
          <Frame
            borderStyle={BorderStyles.double}
            className="absolute -left-4 top-0"
          >
            <Image src={WaterImage} alt="Water" />
          </Frame>
          <Frame
            borderStyle={BorderStyles.solid}
            className="absolute bottom-0 right-0"
          >
            <Image src={FacadeImage} alt="Façade from Lyon" width={335} />
          </Frame>
        </div>
        <div className="relative w-[448px] h-[480px] pattern-1">
          <h1 className="font-allison text-[128px] text-brown -ml-4">
            Luca Ciampi
          </h1>
          <div className="text-[64px] leading-[76px] ml-4 font-abril-fatface text-brown">
            Front end <br />
            <span className="font-playfair-display">Developer</span>
          </div>
        </div>
      </Section>
      <Section ref={handleSectionRef("Work")} title="Work">
        <WorkSection />
      </Section>
      <Section
        ref={handleSectionRef("Education")}
        title="Education"
        isTitleRight
      >
        <Education />
      </Section>
      <Section title="Contact">
        <Heading level={"h2"} className="yess">
          coucou
        </Heading>
        <ContactSection />
      </Section>
    </PageWrapper>
  );
}
