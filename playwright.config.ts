import { defineConfig, devices } from '@playwright/test';

const junitOptions = {
  embedAnnotationsAsProperties: true,
  textContentAnnotations: ['test_description'],
  embedAttachmentsAsProperty: 'testrun_evidence',
  outputFile: './junitReport/report.xml'
};

const allureOptions = {
  detail: true, 
  outputFolder :'allure-results',
  suiteTitle: false,
};

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['allure-playwright', allureOptions],['html', { open: 'never'}],['dot'],['list', {printSteps: true }],['junit', junitOptions],['./utils/myReporter.ts']],
  expect :{
    timeout : 24000,
  },
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: true,
  },

 // globalTeardown: './tests/globalTeardown.ts',
 //xcopy /E allure-report\history allure-results
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /*  {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

   Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
