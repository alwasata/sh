import { element, by, ElementFinder } from 'protractor';

export class BenefitComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-benefit div table .btn-danger'));
  title = element.all(by.css('jhi-benefit div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class BenefitUpdatePage {
  pageTitle = element(by.id('jhi-benefit-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameArInput = element(by.id('field_nameAr'));
  nameEnInput = element(by.id('field_nameEn'));
  pointsCostInput = element(by.id('field_pointsCost'));
  costInput = element(by.id('field_cost'));

  categorySelect = element(by.id('field_category'));
  hospitalSelect = element(by.id('field_hospital'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameArInput(nameAr: string): Promise<void> {
    await this.nameArInput.sendKeys(nameAr);
  }

  async getNameArInput(): Promise<string> {
    return await this.nameArInput.getAttribute('value');
  }

  async setNameEnInput(nameEn: string): Promise<void> {
    await this.nameEnInput.sendKeys(nameEn);
  }

  async getNameEnInput(): Promise<string> {
    return await this.nameEnInput.getAttribute('value');
  }

  async setPointsCostInput(pointsCost: string): Promise<void> {
    await this.pointsCostInput.sendKeys(pointsCost);
  }

  async getPointsCostInput(): Promise<string> {
    return await this.pointsCostInput.getAttribute('value');
  }

  async setCostInput(cost: string): Promise<void> {
    await this.costInput.sendKeys(cost);
  }

  async getCostInput(): Promise<string> {
    return await this.costInput.getAttribute('value');
  }

  async categorySelectLastOption(): Promise<void> {
    await this.categorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async categorySelectOption(option: string): Promise<void> {
    await this.categorySelect.sendKeys(option);
  }

  getCategorySelect(): ElementFinder {
    return this.categorySelect;
  }

  async getCategorySelectedOption(): Promise<string> {
    return await this.categorySelect.element(by.css('option:checked')).getText();
  }

  async hospitalSelectLastOption(): Promise<void> {
    await this.hospitalSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async hospitalSelectOption(option: string): Promise<void> {
    await this.hospitalSelect.sendKeys(option);
  }

  getHospitalSelect(): ElementFinder {
    return this.hospitalSelect;
  }

  async getHospitalSelectedOption(): Promise<string> {
    return await this.hospitalSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class BenefitDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-benefit-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-benefit'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
