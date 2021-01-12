import { element, by, ElementFinder } from 'protractor';

export class CardTransactionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-card-transaction div table .btn-danger'));
  title = element.all(by.css('jhi-card-transaction div h2#page-heading span')).first();
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

export class CardTransactionUpdatePage {
  pageTitle = element(by.id('jhi-card-transaction-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  transactionNoInput = element(by.id('field_transactionNo'));
  amountInput = element(by.id('field_amount'));
  pointsAmountInput = element(by.id('field_pointsAmount'));
  actionSelect = element(by.id('field_action'));
  notesInput = element(by.id('field_notes'));

  cardSelect = element(by.id('field_card'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTransactionNoInput(transactionNo: string): Promise<void> {
    await this.transactionNoInput.sendKeys(transactionNo);
  }

  async getTransactionNoInput(): Promise<string> {
    return await this.transactionNoInput.getAttribute('value');
  }

  async setAmountInput(amount: string): Promise<void> {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput(): Promise<string> {
    return await this.amountInput.getAttribute('value');
  }

  async setPointsAmountInput(pointsAmount: string): Promise<void> {
    await this.pointsAmountInput.sendKeys(pointsAmount);
  }

  async getPointsAmountInput(): Promise<string> {
    return await this.pointsAmountInput.getAttribute('value');
  }

  async setActionSelect(action: string): Promise<void> {
    await this.actionSelect.sendKeys(action);
  }

  async getActionSelect(): Promise<string> {
    return await this.actionSelect.element(by.css('option:checked')).getText();
  }

  async actionSelectLastOption(): Promise<void> {
    await this.actionSelect
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

  async cardSelectLastOption(): Promise<void> {
    await this.cardSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async cardSelectOption(option: string): Promise<void> {
    await this.cardSelect.sendKeys(option);
  }

  getCardSelect(): ElementFinder {
    return this.cardSelect;
  }

  async getCardSelectedOption(): Promise<string> {
    return await this.cardSelect.element(by.css('option:checked')).getText();
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

export class CardTransactionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cardTransaction-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cardTransaction'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
