import { expect } from "@playwright/test";
import test from "./basetest";
import { ExcelUtils } from '../utils/excel.util';

const pageScrollItems = ExcelUtils.getBookList("test-data/BookList.xlsx","BookList","Books for page Scroll");
for (const itemName of pageScrollItems) {
  test(`Scroll the Page - ${itemName}`, async ({ itemPage }) => {
    await itemPage.seacrhItem(itemName);
    await itemPage.checkTextRadioButton();
    await itemPage.clickFirstItem(itemName);
    await expect(itemPage.isFlipRightBtnVisible()).toBeVisible();
    await itemPage.clickNextPage(10);
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
