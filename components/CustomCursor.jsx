'use client'

import { useEffect } from 'react'

class Cursor {
  constructor(options = {}) {
    this.options = {
      container: 'body',
      speed: 0.7,
      ease: 'expo.out',
      visibleTimeout: 300,
      ...options,
    }

    this.body = document.querySelector(this.options.container)

    this.el = document.createElement('div')
    this.el.className = 'cb-cursor'

    this.text = document.createElement('div')
    this.text.className = 'cb-cursor-text'

    this.visible = false
    this.pos = { x: 0, y: 0 }

    this.currentTarget = null

    this.init()
  }

  async init() {
    const { gsap } = await import('gsap')
    this.gsap = gsap

    this.el.appendChild(this.text)
    this.body.appendChild(this.el)

    this.bind()
    this.move(-window.innerWidth, -window.innerHeight, 0)
  }

  bind() {
    this.onMouseMove = (e) => {
      this.pos = { x: e.clientX, y: e.clientY }
      this.detectHover(e.clientX, e.clientY)
      this.update()
    }

    this.onMouseDown = () => this.el.classList.add('-active')
    this.onMouseUp = () => this.el.classList.remove('-active')
    this.onMouseEnter = () => this.show()
    this.onMouseLeave = () => this.hide()

    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mousedown', this.onMouseDown)
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('mouseenter', this.onMouseEnter)
    document.addEventListener('mouseleave', this.onMouseLeave)
  }

  /* ===============================
     🔥 CORRECT HOVER DETECTION
  =============================== */
  detectHover(x, y) {
    // Temporarily disable cursor hit-testing
    this.el.style.pointerEvents = 'none'

    const el = document.elementFromPoint(x, y)
    const target = el?.closest?.('[data-cursor], [data-cursor-text]')

    // Restore cursor
    this.el.style.pointerEvents = ''

    if (target === this.currentTarget) return

    // remove previous state
    if (this.currentTarget) {
      if (this.currentTarget.dataset.cursor) {
        this.el.classList.remove(this.currentTarget.dataset.cursor)
      }
      if (this.currentTarget.dataset.cursorText) {
        this.removeText()
      }
    }

    this.currentTarget = target

    // apply new state
    if (target) {
      if (target.dataset.cursor) {
        this.el.classList.add(target.dataset.cursor) // ✅ NOW WORKS
      }
      if (target.dataset.cursorText) {
        this.setText(target.dataset.cursorText)
      }
    }
  }

  /* ===============================
     TEXT
  =============================== */
  setText(text) {
    this.text.textContent = text
    this.el.classList.add('-text')
  }

  removeText() {
    this.el.classList.remove('-text')
    this.text.textContent = ''
  }

  /* ===============================
     MOTION
  =============================== */
  update() {
    this.move()
    this.show()
  }

  move(x, y, duration) {
    this.gsap.to(this.el, {
      x: x ?? this.pos.x,
      y: y ?? this.pos.y,
      force3D: true,
      overwrite: true,
      ease: this.options.ease,
      duration: this.visible ? duration ?? this.options.speed : 0,
    })
  }

  show() {
    if (this.visible) return
    clearTimeout(this.visibleInt)
    this.el.classList.add('-visible')
    this.visibleInt = setTimeout(() => (this.visible = true))
  }

  hide() {
    clearTimeout(this.visibleInt)
    this.el.classList.remove('-visible')
    this.visibleInt = setTimeout(
      () => (this.visible = false),
      this.options.visibleTimeout
    )
  }

  destroy() {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mousedown', this.onMouseDown)
    document.removeEventListener('mouseup', this.onMouseUp)
    document.removeEventListener('mouseenter', this.onMouseEnter)
    document.removeEventListener('mouseleave', this.onMouseLeave)
    this.el.remove()
  }
}

/* ===============================
   REACT WRAPPER
=============================== */
export default function CursorClient() {
  useEffect(() => {
    const cursor = new Cursor()
    return () => cursor.destroy()
  }, [])

  return null
}
