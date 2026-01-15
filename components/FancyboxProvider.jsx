'use client'

import { useEffect } from 'react'
import { Fancybox as NativeFancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

export default function FancyboxProvider({ children }) {
  useEffect(() => {
    NativeFancybox.bind('[data-fancybox]', {
      Thumbs: false,
      Video: {
        autoplay: true,
      },
    })

    return () => {
      NativeFancybox.destroy()
    }
  }, [])

  return children
}
