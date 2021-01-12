import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InvoiceComponentsPage, InvoiceDeleteDialog, InvoiceUpdatePage } from './invoice.page-object';

const expect = chai.expect;

describe('Invoice e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let invoiceComponentsPage: InvoiceComponentsPage;
  let invoiceUpdatePage: InvoiceUpdatePage;
  let invoiceDeleteDialog: InvoiceDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Invoices', async () => {
    await navBarPage.goToEntity('invoice');
    invoiceComponentsPage = new InvoiceComponentsPage();
    await browser.wait(ec.visibilityOf(invoiceComponentsPage.title), 5000);
    expect(await invoiceComponentsPage.getTitle()).to.eq('sahatiApp.invoice.home.title');
    await browser.wait(ec.or(ec.visibilityOf(invoiceComponentsPage.entities), ec.visibilityOf(invoiceComponentsPage.noResult)), 1000);
  });

  it('should load create Invoice page', async () => {
    await invoiceComponentsPage.clickOnCreateButton();
    invoiceUpdatePage = new InvoiceUpdatePage();
    expect(await invoiceUpdatePage.getPageTitle()).to.eq('sahatiApp.invoice.home.createOrEditLabel');
    await invoiceUpdatePage.cancel();
  });

  it('should create and save Invoices', async () => {
    const nbButtonsBeforeCreate = await invoiceComponentsPage.countDeleteButtons();

    await invoiceComponentsPage.clickOnCreateButton();

    await promise.all([
      invoiceUpdatePage.setInvoiceNoInput('invoiceNo'),
      invoiceUpdatePage.setInvoiceDateInput('2000-12-31'),
      invoiceUpdatePage.setPayDateInput('2000-12-31'),
      invoiceUpdatePage.setTotalInput('5'),
      invoiceUpdatePage.invoiceStatusSelectLastOption(),
      invoiceUpdatePage.setNotesInput('notes'),
      invoiceUpdatePage.cardTransactionSelectLastOption()
    ]);

    expect(await invoiceUpdatePage.getInvoiceNoInput()).to.eq('invoiceNo', 'Expected InvoiceNo value to be equals to invoiceNo');
    expect(await invoiceUpdatePage.getInvoiceDateInput()).to.eq('2000-12-31', 'Expected invoiceDate value to be equals to 2000-12-31');
    expect(await invoiceUpdatePage.getPayDateInput()).to.eq('2000-12-31', 'Expected payDate value to be equals to 2000-12-31');
    expect(await invoiceUpdatePage.getTotalInput()).to.eq('5', 'Expected total value to be equals to 5');
    expect(await invoiceUpdatePage.getNotesInput()).to.eq('notes', 'Expected Notes value to be equals to notes');

    await invoiceUpdatePage.save();
    expect(await invoiceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Invoice', async () => {
    const nbButtonsBeforeDelete = await invoiceComponentsPage.countDeleteButtons();
    await invoiceComponentsPage.clickOnLastDeleteButton();

    invoiceDeleteDialog = new InvoiceDeleteDialog();
    expect(await invoiceDeleteDialog.getDialogTitle()).to.eq('sahatiApp.invoice.delete.question');
    await invoiceDeleteDialog.clickOnConfirmButton();

    expect(await invoiceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
