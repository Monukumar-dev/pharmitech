'use client'

import dynamic from 'next/dynamic'

const WowAnimations = dynamic(
  () => import('./WowAnimations'),
  { ssr: false }
)

export default function ClientOnlyAnimations() {
  return <WowAnimations />
}
