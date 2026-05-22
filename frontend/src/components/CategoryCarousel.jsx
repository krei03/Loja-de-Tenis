import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../services/api'
import '../styles/categoryCarousel.css'

export function CategoryCarousel({ activeItemId, items: controlledItems, onSelect }) {
  const [fetchedItems, setFetchedItems] = useState([])
  const [logoShapes, setLogoShapes] = useState({})
  const trackRef = useRef(null)
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 })
  const items = controlledItems || fetchedItems

  useEffect(() => {
    if (controlledItems) {
      return
    }

    api.getCategoryCarousel().then(setFetchedItems)
  }, [controlledItems])

  const startDrag = (event) => {
    const track = trackRef.current

    if (!track) {
      return
    }

    dragState.current = {
      active: true,
      startX: event.pageX ?? event.touches?.[0]?.pageX ?? 0,
      scrollLeft: track.scrollLeft,
    }
    track.classList.add('dragging')
  }

  const drag = (event) => {
    const track = trackRef.current

    if (!track || !dragState.current.active) {
      return
    }

    const pageX = event.pageX ?? event.touches?.[0]?.pageX ?? 0
    track.scrollLeft = dragState.current.scrollLeft - (pageX - dragState.current.startX)
  }

  const stopDrag = () => {
    dragState.current.active = false
    trackRef.current?.classList.remove('dragging')
  }

  const setLogoShape = (itemId, image) => {
    const aspectRatio = image.naturalWidth / image.naturalHeight
    const shape = aspectRatio > 1.55 ? 'wide' : aspectRatio < 0.72 ? 'tall' : 'square'

    setLogoShapes((current) => ({ ...current, [itemId]: shape }))
  }

  if (!items.length) {
    return null
  }

  return (
    <section className="premium-category-section" aria-label="Categorias premium">
      <div
        ref={trackRef}
        className="premium-category-track"
        onMouseDown={startDrag}
        onMouseMove={drag}
        onMouseLeave={stopDrag}
        onMouseUp={stopDrag}
        onTouchStart={startDrag}
        onTouchMove={drag}
        onTouchEnd={stopDrag}
      >
        {items.map((item, index) => (
          <motion.article
            className={`premium-category-item ${activeItemId === item.id ? 'active' : ''}`}
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: Math.min(index * 0.035, 0.28), duration: 0.32 }}
          >
            <button type="button" onClick={() => onSelect?.(item)}>
              <span className="premium-category-logo">
                {item.logo ? (
                  <span className={`premium-category-mark ${logoShapes[item.id] || 'square'}`}>
                    <img
                      src={item.logo}
                      alt=""
                      draggable="false"
                      onLoad={(event) => setLogoShape(item.id, event.currentTarget)}
                    />
                  </span>
                ) : (
                  <span className="premium-category-fallback">{getLogoFallback(item.name)}</span>
                )}
              </span>
              <strong>{item.name}</strong>
            </button>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function getLogoFallback(name = '') {
  const compact = name.replace(/[^a-z0-9]/gi, '')

  if (compact.length <= 4) {
    return compact.toUpperCase()
  }

  return name
    .split(/\s|-/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase()
}
