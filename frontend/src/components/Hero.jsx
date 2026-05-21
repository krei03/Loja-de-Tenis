import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import heroVideo from '../../assets/video_hero.mp4'

export function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const video = videoRef.current

    if (!hero || !video) {
      return undefined
    }

    let heroTop = 0
    let scrollable = 1
    let duration = 0
    let frameId = 0

    const clampProgress = (value) => Math.min(Math.max(value, 0), 1)

    const updateVideoTime = () => {
      if (!duration) {
        return
      }

      const progress = clampProgress((window.scrollY - heroTop) / scrollable)
      const nextTime = duration * progress
      hero.style.setProperty('--hero-progress', progress.toFixed(4))

      if (Math.abs(video.currentTime - nextTime) > 0.012) {
        video.currentTime = nextTime
      }
    }

    const syncVideo = () => {
      updateVideoTime()
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(updateVideoTime)
    }

    const measureHero = () => {
      const rect = hero.getBoundingClientRect()
      heroTop = rect.top + window.scrollY
      scrollable = Math.max(hero.offsetHeight - window.innerHeight, 1)
      syncVideo()
    }

    const prepareVideo = () => {
      video.pause()
      duration = Number.isFinite(video.duration) ? video.duration : 0
      measureHero()
    }

    video.pause()
    video.load()
    video.addEventListener('loadedmetadata', prepareVideo)
    video.addEventListener('durationchange', prepareVideo)
    window.addEventListener('scroll', syncVideo, { passive: true })
    window.addEventListener('resize', measureHero)
    window.addEventListener('orientationchange', measureHero)
    measureHero()

    return () => {
      video.removeEventListener('loadedmetadata', prepareVideo)
      video.removeEventListener('durationchange', prepareVideo)
      window.removeEventListener('scroll', syncVideo)
      window.removeEventListener('resize', measureHero)
      window.removeEventListener('orientationchange', measureHero)
      cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <video ref={videoRef} muted playsInline preload="auto" className="hero-video">
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="hero-copy">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles size={16} />
          Premium sneaker market
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          VERTEX
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Drops selecionados, experiencia cinematografica e curadoria para quem compra
          tenis como peca central do look.
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
        >
          <a href="#launches">Ver drops</a>
          <span>FW26 / Curadoria premium</span>
        </motion.div>
      </div>

      <div className="scroll-cue">
        <ArrowDown size={18} />
      </div>

      <div className="hero-transition" aria-hidden="true"></div>
    </section>
  )
}
