import test, { expect } from "./basetest";
import { ExcelUtils } from "../utils/excel.util";
import axios from "axios";
import fs from "fs";

test.describe("Web Automation", () => {
  const audioItems = ExcelUtils.getBookList(
    "test-data/BookList.xlsx",
    "BookList",
    "Books For Audio"
  );
  for (const itemName of audioItems) {
    test(`Check Audio book Play - ${itemName}`, async ({
      UrlName,
      itemPage,
    }) => {
      await itemPage.openApp(UrlName);
      await itemPage.searchItem(itemName);
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

  const pageScrollItems = ExcelUtils.getBookList(
    "test-data/BookList.xlsx",
    "BookList",
    "Books for page Scroll"
  );
  for (const itemName of pageScrollItems) {
    test(`Scroll the Page - ${itemName}`, async ({ UrlName, itemPage }) => {
      await itemPage.openApp(UrlName);
      await itemPage.searchItem(itemName);
      await itemPage.checkTextRadioButton();
      await itemPage.clickFirstItem(itemName);
      await expect(itemPage.isFlipRightBtnVisible()).toBeVisible();
      await itemPage.clickNextPage(5);
      await expect(itemPage.getItemHeader(itemName)).toBeVisible();
      await itemPage.getPageNumber();
      await itemPage.getDownloadOptions();
      await itemPage.getViewDetails();
      await expect(itemPage.isFavoriteButtonVisible()).toBeVisible();
      await itemPage.clickFavoriteButton();
      await expect(itemPage.isFavoriteBoxHeaderVisible()).toBeVisible();
      await itemPage.closeFavoriteBox();
      await expect(itemPage.isReviewVisible()).toBeVisible();
    });
  }

  const pdfItems = ExcelUtils.getBookList(
    "test-data/BookList.xlsx",
    "BookList",
    "PDF Download"
  );
  for (const itemName of pdfItems) {
    test(`Check Full Text & PDF Download - ${itemName}`, async ({
      UrlName,
      itemPage,
      page,
    }) => {
      await itemPage.openApp(UrlName);
      await itemPage.searchItem(itemName);
      await itemPage.checkTextRadioButton();
      await itemPage.clickFirstItem(itemName);
      await expect(itemPage.getItemHeader(itemName)).toBeVisible();
      await itemPage.clickFullTextDownload();
      await expect(itemPage.isBacktoItemPageVisible(itemName)).toBeVisible();
      await itemPage.isBacktoItemPageVisible(itemName).click();
      await expect(itemPage.getItemHeader(itemName)).toBeVisible();
      await itemPage.getDownloadOptions();
      await itemPage.getViewDetails();
      await expect(itemPage.isShareButtonVisible()).toBeVisible();
      await itemPage.clickShareButton();
      await expect(itemPage.isShareBoxHeaderVisible()).toBeVisible();
      await itemPage.closeShareBox();
      await expect(itemPage.isReviewVisible()).toBeVisible();
      await itemPage.clickPDFDownload();

      const response = await axios.get(page.url(), {
        responseType: "arraybuffer",
      });

      fs.writeFileSync(`./downloads/${itemName}.pdf`, response.data);
    });
  }
});
