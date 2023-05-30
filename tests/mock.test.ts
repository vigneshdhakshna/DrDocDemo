import {
  test,
  expect,
  Browser,
  Page,
  chromium,
  BrowserContext,
} from "@playwright/test";

let browser: Browser;
let context: BrowserContext;
let page: Page;

test.describe("Mock Api Automation", () => {
  test.beforeAll(async () => {
    browser = await chromium.launch();
    context = await browser.newContext();
    page = await context.newPage();

    // Set up route fulfillment
    setupRouteFulfillment();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  function setupRouteFulfillment() {
    // Mock API response
    page.route("**/temperature/*", (route) => {
      const city: string = route.request().url().split("/").pop() as string;
      const temperatureData: Record<string, { temperature: number }> = {
        Chennai: { temperature: 25 },
        Coimbatore: { temperature: 28 },
        Madurai: { temperature: 30 },
        Trichy: { temperature: 27 },
        Thanjavur: { temperature: 33 },
      };

      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(temperatureData[city]),
      });
    });
  }

  const city1 = 'Thanjavur';
  const temperature1 = 33;

  test(`Validate City - ${city1} Temperature Should be  - ${temperature1}`, async () => {
    await page.goto(`http://localhost:3000/temperature/${city1}`);
    const temperature: number = await page.evaluate(() => {
      return JSON.parse(document.body.textContent!).temperature;
    });
    console.log(`${city1} Temperature - ${temperature}`);
    expect(temperature).toBe(temperature1);
  });

  const city2 = 'Chennai';
  test(`Validate City - ${city2} Temperature Should be  - ${temperature1}`, async () => {
    await page.goto(`http://localhost:3000/temperature/${city2}`);
    const temperature: number = await page.evaluate(() => {
      return JSON.parse(document.body.textContent!).temperature;
    });
    console.log(`${city2} Temperature - ${temperature}`);
    expect(temperature).toBe(33);
  });
});
