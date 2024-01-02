import { test, expect } from '@playwright/test'

test('should show title', async ({ page }) => {
    // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
    await page.goto('/')
    // The page should be titled "Vite App"
    await expect(page).toHaveTitle('日语轻松练')
})

test('should show album list', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('Test Album')).toBeVisible()
    await expect(page.getByText('Many Track')).toBeVisible()
})

test('should enter alum page', async ({ page }) => {
    await page.goto('/')

    await page.click('text=Test Album')
    // example: /listen/album/100
    await expect(page).toHaveURL(/listen\/album\/\d+/)

    await expect(page.getByText('Test Album')).toBeVisible()
    await expect(page.getByText('开始播放')).toBeVisible()
})
