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

    video.pause()
    video.currentTime = 0
    let frameId = 0

    const syncVideo = () => {
      cancelAnimationFrame(frameId)
      frameId = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect()
        const scrollable = hero.offsetHeight - window.innerHeight
        const rawProgress = -rect.top / scrollable
        const progress = Math.min(Math.max(rawProgress, 0), 1)

        if (Number.isFinite(video.duration)) {
          video.currentTime = video.duration * progress
        }
      })
    }

    video.addEventListener('loadedmetadata', syncVideo)
    window.addEventListener('scroll', syncVideo, { passive: true })
    window.addEventListener('resize', syncVideo)
    syncVideo()

    return () => {
      video.removeEventListener('loadedmetadata', syncVideo)
      window.removeEventListener('scroll', syncVideo)
      window.removeEventListener('resize', syncVideo)
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
      </div>

      <div className="scroll-cue">
        <ArrowDown size={18} />
      </div>
    </section>
  )
}
