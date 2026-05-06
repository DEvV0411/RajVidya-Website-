import '../styles/globals.css'

import { useEffect, useState } from 'react'
import Router from 'next/router'

export default function App({ Component, pageProps }) {
  const [routeLoading, setRouteLoading] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Route-loading overlay for smooth transitions.
  useEffect(() => {
    const handleStart = () => setRouteLoading(true)
    const handleDone = () => setRouteLoading(false)

    Router.events.on('routeChangeStart', handleStart)
    Router.events.on('routeChangeComplete', handleDone)
    Router.events.on('routeChangeError', handleDone)

    return () => {
      Router.events.off('routeChangeStart', handleStart)
      Router.events.off('routeChangeComplete', handleDone)
      Router.events.off('routeChangeError', handleDone)
    }
  }, [])

  // Scroll progress bar at the top.
  useEffect(() => {
    function updateProgress() {
      const el = document.documentElement
      const total = el.scrollHeight - el.clientHeight
      const p = total > 0 ? el.scrollTop / total : 0
      setScrollProgress(Math.min(1, Math.max(0, p)))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />

      {routeLoading && (
        <div className="route-loading-overlay" aria-hidden="true">
          <div className="route-loading-spinner" />
        </div>
      )}

      <Component {...pageProps} />
    </>
  )
}
