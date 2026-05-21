import { expect, test } from '@playwright/test'

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 900 },
  { name: 'notebook', width: 1024, height: 768 },
  { name: 'desktop', width: 1366, height: 768 },
  { name: 'wide', width: 1920, height: 1080 },
]

for (const viewport of viewports) {
  test(`home layout stays proportional at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })

    await expect(page.locator('.navbar')).toBeVisible()
    await expect(page.locator('.hero-video')).toBeVisible()
    await expect(page.locator('.product-card').first()).toBeVisible()

    const metrics = await page.evaluate(() => {
      const body = document.body
      const html = document.documentElement
      const title = document.querySelector('.launches .section-heading h2')
      const firstCard = document.querySelector('.product-card')
      const heroTitle = document.querySelector('.hero h1')

      return {
        overflow: Math.max(body.scrollWidth, html.scrollWidth) - window.innerWidth,
        titleHeight: title?.getBoundingClientRect().height ?? 0,
        cardWidth: firstCard?.getBoundingClientRect().width ?? 0,
        heroTitleHeight: heroTitle?.getBoundingClientRect().height ?? 0,
      }
    })

    expect(metrics.overflow).toBeLessThanOrEqual(2)
    expect(metrics.cardWidth).toBeGreaterThanOrEqual(viewport.width < 640 ? 300 : 220)
    expect(metrics.titleHeight).toBeLessThan(viewport.width < 640 ? 150 : 130)
    expect(metrics.heroTitleHeight).toBeLessThan(viewport.height * 0.45)
  })
}
