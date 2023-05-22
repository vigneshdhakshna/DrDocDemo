import { expect, Page } from "@playwright/test";
import test from "./basetest";
import { ExcelUtils } from "../utils/excel.util";
import axios from "axios";
import fs from "fs";

const itemNames = ExcelUtils.getBookList(
  "test-data/BookList.xlsx",
  "BookList",
  "PDF Download"
);
for (const itemName of itemNames) {
  test(`Check PDF Download - ${itemName}`, async ({ itemPage, page }) => {
    await itemPage.seacrhItem(itemName);
    await itemPage.checkTextRadioButton();
    await itemPage.clickFirstItem(itemName);
    await expect(itemPage.getItemHeader(itemName)).toBeVisible();

    await itemPage.clickPDFDownload();

    const response = await axios.get(page.url(), {
      responseType: "arraybuffer",
    });

    fs.writeFileSync(`./downloads/${itemName}.pdf`, response.data);
      
  });
}
