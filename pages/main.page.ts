import { Locator, Page, test } from "@playwright/test";
import BasePage from "./basepage";

export default class MainPage extends BasePage {

    constructor(public page: Page) {
        super(page);
    }

    private mainPageElements = {
        searchBox: this.page.getByRole('textbox', { name: 'Search the Archive. Filters and Advanced Search available below.' }),
        audioCheckbox: this.page.getByLabel(/audio\n                  \n/i),
        textsCheckbox: this.page.getByLabel(/texts\n                  \n/i),
        
    }

    public async searchItem(itemName : string) {
        await test.step(`Seacrh Item - ${itemName}`, async () => {
            await this.mainPageElements.searchBox.click();
            await this.mainPageElements.searchBox.fill(itemName);
            await this.mainPageElements.searchBox.press('Enter');
        });
    }

    public async checkAudioRadioButton() {
        await test.step('checkAudioRadioButton', async () => {
        await this.mainPageElements.audioCheckbox.check();
        });
    }

    public async checkTextRadioButton() {
        await test.step('checkTextRadioButton', async () => {
        await this.mainPageElements.textsCheckbox.check();
        });
    }

    public async clickFirstItem(itemName : string){
        await test.step(`Click First Item - ${itemName}`, async () => {
        const regexPattern = new RegExp(itemName, 'i');
        await this.page.getByRole('heading', { name: regexPattern.source }).first().click();
        });
    }

    public getItemHeader(itemName : string):Locator{
        const regexPattern = new RegExp(itemName, 'i');
        return this.page.locator('span').filter({ hasText: regexPattern.source });
        
    }

}