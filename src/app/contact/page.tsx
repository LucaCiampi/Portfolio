import ExternalLinkSocial from '@/components/ExternalLinkSocial'
import PageWrapper from '../page-wrapper'

export default function Page() {
  return (
    <PageWrapper>
      <div>
        <h1>Contact</h1>
        <div>
          <ExternalLinkSocial name={'github'} href={'https://github.com/LucaCiampi'} />
          <ExternalLinkSocial name={'linkedin'} href={'https://linkedin.com/in/lucaciampi'} />
        </div>
      </div>
    </PageWrapper>
  )
}
