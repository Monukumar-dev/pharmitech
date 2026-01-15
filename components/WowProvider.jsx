'use client'

import useWowObserver from '@/hooks/useWowObserver'

export default function WowProvider({ children }) {
  useWowObserver()
  return children
}
