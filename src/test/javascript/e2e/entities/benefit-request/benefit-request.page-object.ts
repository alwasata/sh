import { element, by, ElementFinder } from 'protractor';

export class BenefitRequestComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-benefit-request div table .btn-danger'));
  title = element.all(by.css('jhi-benefit-request div h2#page-heading span')).first();
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

export class BenefitRequestUpdatePage {
  pageTitle = element(by.id('jhi-benefit-request-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameArInput = element(by.id('field_nameAr'));
  nameEnInput = element(by.id('field_nameEn'));
  pointsCostInput = element(by.id('field_pointsCost'));
  costInput = element(by.id('field_cost'));
  benefitStatusSelect = element(by.id('field_benefitStatus'));
  notesInput = element(by.id('field_notes'));

  categorySelect = element(by.id('field_category'));
  hospitalSelect = element(by.id('field_hospital'));
  benefitSelect = element(by.id('field_benefit'));

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

  async setBenefitStatusSelect(benefitStatus: string): Promise<void> {
    await this.benefitStatusSelect.sendKeys(benefitStatus);
  }

  async getBenefitStatusSelect(): Promise<string> {
    return await this.benefitStatusSelect.element(by.css('option:checked')).getText();
  }

  async benefitStatusSelectLastOption(): Promise<void> {
    await this.benefitStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setNotesInput(notes: string): Promise<void> {
    await this.notesInput.sendKeys(notes);
  }

  async getNotesInput(): Promise<string> {
    return await this.notesInput.getAttribute('value');
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

  async benefitSelectLastOption(): Promise<void> {
    await this.benefitSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async benefitSelectOption(option: string): Promise<void> {
    await this.benefitSelect.sendKeys(option);
  }

  getBenefitSelect(): ElementFinder {
    return this.benefitSelect;
  }

  async getBenefitSelectedOption(): Promise<string> {
    return await this.benefitSelect.element(by.css('option:checked')).getText();
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

export class BenefitRequestDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-benefitRequest-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-benefitRequest'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
