import { element, by, ElementFinder } from 'protractor';

export class InvoiceBenefitsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-invoice-benefits div table .btn-danger'));
  title = element.all(by.css('jhi-invoice-benefits div h2#page-heading span')).first();
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

export class InvoiceBenefitsUpdatePage {
  pageTitle = element(by.id('jhi-invoice-benefits-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  pointsCostInput = element(by.id('field_pointsCost'));
  costInput = element(by.id('field_cost'));
  quantityInput = element(by.id('field_quantity'));
  totalInput = element(by.id('field_total'));

  benefitSelect = element(by.id('field_benefit'));
  invoiceSelect = element(by.id('field_invoice'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
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

  async setQuantityInput(quantity: string): Promise<void> {
    await this.quantityInput.sendKeys(quantity);
  }

  async getQuantityInput(): Promise<string> {
    return await this.quantityInput.getAttribute('value');
  }

  async setTotalInput(total: string): Promise<void> {
    await this.totalInput.sendKeys(total);
  }

  async getTotalInput(): Promise<string> {
    return await this.totalInput.getAttribute('value');
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

  async invoiceSelectLastOption(): Promise<void> {
    await this.invoiceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async invoiceSelectOption(option: string): Promise<void> {
    await this.invoiceSelect.sendKeys(option);
  }

  getInvoiceSelect(): ElementFinder {
    return this.invoiceSelect;
  }

  async getInvoiceSelectedOption(): Promise<string> {
    return await this.invoiceSelect.element(by.css('option:checked')).getText();
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

export class InvoiceBenefitsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-invoiceBenefits-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-invoiceBenefits'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
