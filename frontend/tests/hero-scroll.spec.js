import { expect, test } from '@playwright/test'

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

for (const viewport of viewports) {
  test(`hero video plays automatically on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' })

    const video = page.locator('.hero-video')
    await expect(video).toBeVisible()
    await page.evaluate(() =>
      new Promise((resolve) => {
        const heroVideo = document.querySelector('.hero-video')

        if (heroVideo.readyState >= 1) {
          resolve()
          return
        }

        heroVideo.addEventListener('loadedmetadata', resolve, { once: true })
      }),
    )

    const before = await video.evaluate((element) => element.currentTime)
    await page.waitForTimeout(500)
    const after = await video.evaluate((element) => element.currentTime)
    const playbackRate = await video.evaluate((element) => element.playbackRate)
    const box = await video.boundingBox()

    expect(box?.height).toBe(viewport.height)
    expect(after).toBeGreaterThan(before)
    expect(playbackRate).toBe(1)
  })
}
