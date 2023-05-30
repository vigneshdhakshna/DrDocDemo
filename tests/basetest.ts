import { test as baseTest } from "@playwright/test";
import MainPage from "../pages/main.page";
import BasePage from "../pages/basepage";
import ItemPage from "../pages/item.page";
import * as dotenv from "dotenv";
import { port } from "../utils/mockApi.util";

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
  UrlName : any;
  apiUrl : any;
  cityName : any;


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
  UrlName: async ({  }, use) => {
    await use(process.env.URL);
  },
  apiUrl: async ({  }, use) => {
    await use(`http://localhost:${port}/`);
  },
  cityName: async ({  }, use) => {
    await use('Thanjavur');
  },
});



export default test;
export const expect = test.expect;
