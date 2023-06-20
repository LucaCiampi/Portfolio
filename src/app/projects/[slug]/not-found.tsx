import LinkButton from '@/components/LinkButton'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        <LinkButton href="/projects">Back to projects</LinkButton>
      </p>
    </div>
  )
}