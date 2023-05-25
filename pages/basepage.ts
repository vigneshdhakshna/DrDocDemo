import { Page } from "@playwright/test";
export default class BasePage {
  constructor(public page: Page) {}

  public getUrl(): string {
    return this.page.url();
  }
  public openApp(url:string) {
    return this.page.goto(url);
  }
  public async closeTab(options?: { tabId?: number }) {
    if (options?.tabId) {
      await this.page.context().pages()[options.tabId].close();
    } else {
      await this.page.close();
    }
  }
}
