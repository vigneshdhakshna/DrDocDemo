import { expect } from "@playwright/test";
import test from "./basetest";
import { ExcelUtils } from '../utils/excel.util';

const itemNames = ExcelUtils.getBookList(
  "test-data/BookList.xlsx",
  "BookList",
  "Books for FullText"
);
for (const itemName of itemNames) {
  test(`Get Full Text Link - ${itemName}`, async ({ UrlName,itemPage, page }) => {
    await itemPage.openApp(UrlName);
    await itemPage.seacrhItem(itemName);
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
      
  });
}


const pageScrollItems = ExcelUtils.getBookList("test-data/BookList.xlsx","BookList","Books for page Scroll");
for (const itemName of pageScrollItems) {
  test(`Scroll the Page - ${itemName}`, async ({ UrlName,itemPage }) => {
    await itemPage.openApp(UrlName);
    await itemPage.seacrhItem(itemName);
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
