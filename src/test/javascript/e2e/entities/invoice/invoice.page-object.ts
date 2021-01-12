import { element, by, ElementFinder } from 'protractor';

export class InvoiceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-invoice div table .btn-danger'));
  title = element.all(by.css('jhi-invoice div h2#page-heading span')).first();
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

export class InvoiceUpdatePage {
  pageTitle = element(by.id('jhi-invoice-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  invoiceNoInput = element(by.id('field_invoiceNo'));
  invoiceDateInput = element(by.id('field_invoiceDate'));
  payDateInput = element(by.id('field_payDate'));
  totalInput = element(by.id('field_total'));
  invoiceStatusSelect = element(by.id('field_invoiceStatus'));
  notesInput = element(by.id('field_notes'));

  cardTransactionSelect = element(by.id('field_cardTransaction'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setInvoiceNoInput(invoiceNo: string): Promise<void> {
    await this.invoiceNoInput.sendKeys(invoiceNo);
  }

  async getInvoiceNoInput(): Promise<string> {
    return await this.invoiceNoInput.getAttribute('value');
  }

  async setInvoiceDateInput(invoiceDate: string): Promise<void> {
    await this.invoiceDateInput.sendKeys(invoiceDate);
  }

  async getInvoiceDateInput(): Promise<string> {
    return await this.invoiceDateInput.getAttribute('value');
  }

  async setPayDateInput(payDate: string): Promise<void> {
    await this.payDateInput.sendKeys(payDate);
  }

  async getPayDateInput(): Promise<string> {
    return await this.payDateInput.getAttribute('value');
  }

  async setTotalInput(total: string): Promise<void> {
    await this.totalInput.sendKeys(total);
  }

  async getTotalInput(): Promise<string> {
    return await this.totalInput.getAttribute('value');
  }

  async setInvoiceStatusSelect(invoiceStatus: string): Promise<void> {
    await this.invoiceStatusSelect.sendKeys(invoiceStatus);
  }

  async getInvoiceStatusSelect(): Promise<string> {
    return await this.invoiceStatusSelect.element(by.css('option:checked')).getText();
  }

  async invoiceStatusSelectLastOption(): Promise<void> {
    await this.invoiceStatusSelect
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

  async cardTransactionSelectLastOption(): Promise<void> {
    await this.cardTransactionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cardTransactionSelectOption(option: string): Promise<void> {
    await this.cardTransactionSelect.sendKeys(option);
  }

  getCardTransactionSelect(): ElementFinder {
    return this.cardTransactionSelect;
  }

  async getCardTransactionSelectedOption(): Promise<string> {
    return await this.cardTransactionSelect.element(by.css('option:checked')).getText();
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

export class InvoiceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-invoice-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-invoice'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
