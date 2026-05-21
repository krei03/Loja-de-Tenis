import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'
import heroVideo from '../../assets/video_hero.mp4'

export function Hero() {
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return undefined
    }

    const playSlowly = () => {
      video.playbackRate = 1
      video.play().catch(() => {
        // Muted autoplay can still be blocked until the browser is ready.
      })
    }

    video.addEventListener('loadedmetadata', playSlowly)
    video.addEventListener('canplay', playSlowly)
    playSlowly()

    return () => {
      video.removeEventListener('loadedmetadata', playSlowly)
      video.removeEventListener('canplay', playSlowly)
    }
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <video ref={videoRef} muted playsInline preload="auto" autoPlay loop className="hero-video">
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
