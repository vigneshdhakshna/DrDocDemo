import { Locator, Page, expect, test } from "@playwright/test";
import MainPage from "./main.page";

export default class ItemPage extends MainPage {
  constructor(public page: Page) {
    super(page);
  }

  private productPageElements = {
    flipRightBtn: this.page.getByRole("button", { name: "Flip right" }),
    pageNumber: this.page.locator(".BRcurrentpage"),
    playButton: this.page.getByRole("button", { name: "Play", exact: true }),
    seekBar: this.page.getByRole("slider", { name: "Seek" }),
    fullTextDownload: this.page.getByRole("link", {
      name: "FULL TEXT download",
    }),
    shareButton: this.page.getByRole("button", { name: "Share" }),
    shareBoxHeader: this.page.getByText("Share or Embed This Item"),
    shareBoxClose: this.page.locator("#cher-modal button"),
    favoriteButton: this.page.getByRole("button", { name: "Favorite" }),
    favoriteBoxHeader: this.page.getByText("Log In", { exact: true }),
    favoriteBoxClose: this.page.locator("#favorite-modal button"),
    pdfDownload: this.page.getByRole('link', { name: 'PDF download' }),
  };

  public isFlipRightBtnVisible(): Locator {
    return this.productPageElements.flipRightBtn;
  }

  public async clickNextPage(clickPage: number) {
    await test.step(`clickNextPage ${clickPage} Times`, async () => {
      await this.productPageElements.flipRightBtn.click({
        clickCount: clickPage,
        delay: 600,
      });
    });
  }

  public async clickFullTextDownload() {
    await test.step("clickFullTextDownload", async () => {
      await this.productPageElements.fullTextDownload.click();
    });
  }

  public async clickPDFDownload() {
    await test.step("clickPDFDownload", async () => {
      await this.productPageElements.pdfDownload.click();
    });
  }

  public async clickPlayButton() {
    await test.step("clickPlayButton", async () => {
      await this.productPageElements.playButton.click();
    });
  }

  public isPlayButtonVisible(): Locator {
    return this.productPageElements.playButton;
  }

  public isReviewVisible(): Locator {
    const regexPattern = new RegExp("Reviews", "i");
    return this.page.getByRole("heading", { name: regexPattern.source });
  }

  public isShareButtonVisible(): Locator {
    return this.productPageElements.shareButton;
  }

  public async clickShareButton() {
    await test.step("clickShareButton", async () => {
      await this.productPageElements.shareButton.click();
    });
  }

  public isShareBoxHeaderVisible(): Locator {
    return this.productPageElements.shareBoxHeader;
  }

  public async closeShareBox() {
    await test.step("closeShareBox", async () => {
      await this.productPageElements.shareBoxClose.click();
    });
  }

  public isFavoriteButtonVisible(): Locator {
    return this.productPageElements.favoriteButton;
  }

  public async clickFavoriteButton() {
    await test.step("clickFavoriteButton", async () => {
      await this.productPageElements.favoriteButton.click();
    });
  }

  public isFavoriteBoxHeaderVisible(): Locator {
    return this.productPageElements.favoriteBoxHeader;
  }

  public async closeFavoriteBox() {
    await test.step("closeFavoriteBox", async () => {
      await this.productPageElements.favoriteBoxClose.click();
    });
  }


  public async getDownloadOptions(): Promise<string[]> {
    const downloadOptions = await this.page.$$("a.format-summary");
    const downloadOptList: string[] = [];

    for (const element of downloadOptions) {
      const text = await element.textContent();
      if (text !== null) {
        downloadOptList.push(text.replace(" download", "").trim());
      }
    }

    await test.step(`Download Options List [ ${downloadOptList} ] Available`, async () => {});

    return downloadOptList;
  }

  public async isDownloadOptionAvailable(optionName: string): Promise<boolean> {
    const optionList = await this.getDownloadOptions();
    return optionList.includes(optionName);
  }

  public async getPageNumber() {
    let pageNo = await this.productPageElements.pageNumber.textContent();
    await test.step(`Page Number is - ${pageNo}`, async () => {});
  }

  public isBacktoItemPageVisible(itemName: string): Locator {
    const regexPattern = new RegExp(itemName, "i");
    return this.page.getByRole("link", { name: regexPattern.source });
  }

  public async getViewDetails() {
    const detailName = await this.page
      .locator(".item-stats-summary > p:nth-child(1)")
      .textContent();
    await test.step(`${detailName}`, async () => {});
  }
}
