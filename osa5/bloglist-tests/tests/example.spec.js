const { test, describe, expect, beforeEach } = require("@playwright/test")
import { login, createBlog } from "./helper.js"

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:5173/api/testing/reset")
    await request.post("http://localhost:5173/api/users", {
      data: {
        name: "ville",
        username: "ville",
        password: "123456",
      },
    })
    await page.goto("http://localhost:5173/")
  })

  test("Login form is shown", async ({ page }) => {
    const locator = await page.getByText("login")
    await expect(locator).toBeVisible()
    await expect(page.getByText("Log in to application")).toBeVisible()
  })

  describe("when logged in", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await login(page, "ville", "123456")
      await expect(page.getByText("Logged in!")).toBeVisible()
    })

    test("fails with wrong credentials", async ({ page }) => {
      await login(page, "ville", "123321")
      await expect(page.getByText("Wrong credentials!")).toBeVisible()
    })

    test.only("a new blog can be created", async ({ page }) => {
      await login(page, "ville", "123456")
      await createBlog(page, "jes!", "bro", "www.google.com")
      await expect(
        page.getByText(`New blog "jes!" posted succesfully!`)
      ).toBeVisible()
      await page.waitForTimeout(2000)
      await expect(page.getByText("bro")).toBeVisible()
    })

    test("a blog can be liked", async ({ page }) => {
      await login(page, "ville", "123456")
      await createBlog(page, "jes!", "bro", "www.google.com")
      await page.getByRole("button", { name: "show" }).click()
      await expect(page.getByText(`like`)).toBeVisible()
    })

    test("a blog can be removed", async ({ page }) => {
      page.on("dialog", (dialog) => dialog.accept())
      await login(page, "ville", "123456")
      await createBlog(page, "jes!", "bro", "www.google.com")
      await page.getByRole("button", { name: "show" }).click()
      await page.getByRole("button", { name: "remove" }).click()
      await page.waitForTimeout(1000)
      await expect(page.getByText("jes!")).toBeHidden()
    })
    describe("multiple blogs", () => {
      beforeEach(async ({ page, request }) => {
        await request.post("http://localhost:5173/api/users", {
          data: {
            name: "markus",
            username: "markus",
            password: "123456",
          },
        })
        await login(page, "markus", "123456")
        await createBlog(page, "jes!2", "bro2", "www.google.com2")
        await page.getByRole("button", { name: "logout" }).click()
        await page.getByRole("button", { name: "show" }).click()
        await page.getByRole("button", { name: "like" }).click()
        await page.waitForTimeout(500)
        await page.getByRole("button", { name: "like" }).click()
        await page.getByRole("button", { name: "hide" }).click()
        await createBlog(page, "jes!3", "bro3", "www.google.com3")
        await page.waitForTimeout(2000)
        await page
          .locator("p")
          .filter({ hasText: "jes!3 bro3show" })
          .getByRole("button")
          .click()
        await page.getByRole("button", { name: "like" }).click()
        await page.waitForTimeout(500)
        await page.getByRole("button", { name: "like" }).click()
        await page.waitForTimeout(500)
        await page.getByRole("button", { name: "like" }).click()
        await page.waitForTimeout(500)
        await page.goto("http://localhost:5173/")
      })
      test("only the user that created the blog can remove it", async ({
        page,
      }) => {
        page.on("dialog", (dialog) => dialog.accept())
        await login(page, "ville", "123456")
        await page
          .locator("div")
          .filter({ hasText: /^jes!3 bro3show$/ })
          .getByRole("button")
          .click()
        await expect(page.getByText("remove")).toBeHidden()
      })
      test("blog are in like order", async ({ page }) => {
        page.on("dialog", (dialog) => dialog.accept())
        await login(page, "ville", "123456")
        await page.waitForTimeout(500)
        const blog1 = await page
          .locator("p")
          .filter({ hasText: "jes!3 bro3show" })
          .getByRole("button")

        const blog2 = await page
          .locator("p")
          .filter({ hasText: "jes!2 bro2show" })
          .getByRole("button")

        const blog1Box = await blog1.boundingBox()
        const blog2Box = await blog2.boundingBox()
        expect(blog1Box.y).toBeLessThan(blog2Box.y)
      })
    })
  })
})
