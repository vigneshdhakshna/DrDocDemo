import { expect } from "@playwright/test";
import test from "./basetest";
import { ExcelUtils } from "../utils/excel.util";

const itemNames = ExcelUtils.getBookList(
  "test-data/BookList.xlsx",
  "BookList",
  "Books For Audio"
);
for (const itemName of itemNames) {
  test(`Check Audio book Play - ${itemName}`, async ({ UrlName,itemPage }) => {
    await itemPage.openApp(UrlName);
    await itemPage.seacrhItem(itemName);
    await itemPage.checkAudioRadioButton();
    await itemPage.clickFirstItem(itemName);
    await expect(itemPage.isPlayButtonVisible()).toBeVisible();
    await itemPage.clickPlayButton();
    expect(await itemPage.isDownloadOptionAvailable("VBR MP3")).toBeTruthy();
    await itemPage.getViewDetails();
    await expect(itemPage.isShareButtonVisible()).toBeVisible();
    await itemPage.clickShareButton();
    await itemPage.closeShareBox();
    await expect(itemPage.isFavoriteButtonVisible()).toBeVisible();
    await itemPage.clickFavoriteButton();
    await itemPage.closeFavoriteBox();
    await expect(itemPage.isReviewVisible()).toBeVisible();
  });
}
