"use client";

import Section from '@/components/Section';
import Education from './education';
import PageWrapper from './page-wrapper';

export default function Page() {
  return (
    <PageWrapper>
      <div>
        ma page
      </div>
      <Section title='Education'>
        <Education />
      </Section>
    </PageWrapper>
  )
}
