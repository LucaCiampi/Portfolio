'use client';

import ExternalLinkSocial from '@/components/ExternalLinkSocial';

export default function ContactSection() {
  return (
    <div className="flex justify-between gap-8 flex-wrap max-w-3xl m-auto py-12">
      <ExternalLinkSocial
        className="icon"
        name={'github'}
        href={'https://github.com/LucaCiampi'}
      />
      <ExternalLinkSocial
        className="icon"
        name={'linkedin'}
        href={'https://linkedin.com/in/lucaciampi'}
      />
    </div>
  );
}
