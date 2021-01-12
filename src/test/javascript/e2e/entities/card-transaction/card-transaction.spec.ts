import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CardTransactionComponentsPage, CardTransactionDeleteDialog, CardTransactionUpdatePage } from './card-transaction.page-object';

const expect = chai.expect;

describe('CardTransaction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cardTransactionComponentsPage: CardTransactionComponentsPage;
  let cardTransactionUpdatePage: CardTransactionUpdatePage;
  let cardTransactionDeleteDialog: CardTransactionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load CardTransactions', async () => {
    await navBarPage.goToEntity('card-transaction');
    cardTransactionComponentsPage = new CardTransactionComponentsPage();
    await browser.wait(ec.visibilityOf(cardTransactionComponentsPage.title), 5000);
    expect(await cardTransactionComponentsPage.getTitle()).to.eq('sahatiApp.cardTransaction.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(cardTransactionComponentsPage.entities), ec.visibilityOf(cardTransactionComponentsPage.noResult)),
      1000
    );
  });

  it('should load create CardTransaction page', async () => {
    await cardTransactionComponentsPage.clickOnCreateButton();
    cardTransactionUpdatePage = new CardTransactionUpdatePage();
    expect(await cardTransactionUpdatePage.getPageTitle()).to.eq('sahatiApp.cardTransaction.home.createOrEditLabel');
    await cardTransactionUpdatePage.cancel();
  });

  it('should create and save CardTransactions', async () => {
    const nbButtonsBeforeCreate = await cardTransactionComponentsPage.countDeleteButtons();

    await cardTransactionComponentsPage.clickOnCreateButton();

    await promise.all([
      cardTransactionUpdatePage.setTransactionNoInput('transactionNo'),
      cardTransactionUpdatePage.setAmountInput('5'),
      cardTransactionUpdatePage.setPointsAmountInput('5'),
      cardTransactionUpdatePage.actionSelectLastOption(),
      cardTransactionUpdatePage.setNotesInput('notes'),
      cardTransactionUpdatePage.cardSelectLastOption()
    ]);

    expect(await cardTransactionUpdatePage.getTransactionNoInput()).to.eq(
      'transactionNo',
      'Expected TransactionNo value to be equals to transactionNo'
    );
    expect(await cardTransactionUpdatePage.getAmountInput()).to.eq('5', 'Expected amount value to be equals to 5');
    expect(await cardTransactionUpdatePage.getPointsAmountInput()).to.eq('5', 'Expected pointsAmount value to be equals to 5');
    expect(await cardTransactionUpdatePage.getNotesInput()).to.eq('notes', 'Expected Notes value to be equals to notes');

    await cardTransactionUpdatePage.save();
    expect(await cardTransactionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cardTransactionComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last CardTransaction', async () => {
    const nbButtonsBeforeDelete = await cardTransactionComponentsPage.countDeleteButtons();
    await cardTransactionComponentsPage.clickOnLastDeleteButton();

    cardTransactionDeleteDialog = new CardTransactionDeleteDialog();
    expect(await cardTransactionDeleteDialog.getDialogTitle()).to.eq('sahatiApp.cardTransaction.delete.question');
    await cardTransactionDeleteDialog.clickOnConfirmButton();

    expect(await cardTransactionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
