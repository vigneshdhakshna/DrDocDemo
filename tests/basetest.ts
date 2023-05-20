import { test as baseTest } from "@playwright/test";
import MainPage from "../pages/main.page";
import BasePage from "../pages/basepage";
import ItemPage from "../pages/item.page";
import * as dotenv from "dotenv";

if (process.env.NODE_ENV) {
  dotenv.config({
    path: `env/.env.${process.env.NODE_ENV}`,
    override: true,
  });
} else {
  dotenv.config({
    path: `env/.env`,
    override: true,
  });
}

const test = baseTest.extend<{
  basePage: BasePage;
  mainPage: MainPage;
  itemPage: ItemPage;
}>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  itemPage: async ({ page }, use) => {
    await use(new ItemPage(page));
  },
  
});

test.beforeEach(async ({ page }) => {
  const UrlName :any = process.env.URL;
  await page.goto(UrlName);
});



export default test;
export const expect = test.expect;
