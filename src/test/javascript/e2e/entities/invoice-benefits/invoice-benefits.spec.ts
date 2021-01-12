import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { InvoiceBenefitsComponentsPage, InvoiceBenefitsDeleteDialog, InvoiceBenefitsUpdatePage } from './invoice-benefits.page-object';

const expect = chai.expect;

describe('InvoiceBenefits e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let invoiceBenefitsComponentsPage: InvoiceBenefitsComponentsPage;
  let invoiceBenefitsUpdatePage: InvoiceBenefitsUpdatePage;
  let invoiceBenefitsDeleteDialog: InvoiceBenefitsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load InvoiceBenefits', async () => {
    await navBarPage.goToEntity('invoice-benefits');
    invoiceBenefitsComponentsPage = new InvoiceBenefitsComponentsPage();
    await browser.wait(ec.visibilityOf(invoiceBenefitsComponentsPage.title), 5000);
    expect(await invoiceBenefitsComponentsPage.getTitle()).to.eq('sahatiApp.invoiceBenefits.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(invoiceBenefitsComponentsPage.entities), ec.visibilityOf(invoiceBenefitsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create InvoiceBenefits page', async () => {
    await invoiceBenefitsComponentsPage.clickOnCreateButton();
    invoiceBenefitsUpdatePage = new InvoiceBenefitsUpdatePage();
    expect(await invoiceBenefitsUpdatePage.getPageTitle()).to.eq('sahatiApp.invoiceBenefits.home.createOrEditLabel');
    await invoiceBenefitsUpdatePage.cancel();
  });

  it('should create and save InvoiceBenefits', async () => {
    const nbButtonsBeforeCreate = await invoiceBenefitsComponentsPage.countDeleteButtons();

    await invoiceBenefitsComponentsPage.clickOnCreateButton();

    await promise.all([
      invoiceBenefitsUpdatePage.setPointsCostInput('5'),
      invoiceBenefitsUpdatePage.setCostInput('5'),
      invoiceBenefitsUpdatePage.setQuantityInput('5'),
      invoiceBenefitsUpdatePage.setTotalInput('5'),
      invoiceBenefitsUpdatePage.benefitSelectLastOption(),
      invoiceBenefitsUpdatePage.invoiceSelectLastOption()
    ]);

    expect(await invoiceBenefitsUpdatePage.getPointsCostInput()).to.eq('5', 'Expected pointsCost value to be equals to 5');
    expect(await invoiceBenefitsUpdatePage.getCostInput()).to.eq('5', 'Expected cost value to be equals to 5');
    expect(await invoiceBenefitsUpdatePage.getQuantityInput()).to.eq('5', 'Expected quantity value to be equals to 5');
    expect(await invoiceBenefitsUpdatePage.getTotalInput()).to.eq('5', 'Expected total value to be equals to 5');

    await invoiceBenefitsUpdatePage.save();
    expect(await invoiceBenefitsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await invoiceBenefitsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last InvoiceBenefits', async () => {
    const nbButtonsBeforeDelete = await invoiceBenefitsComponentsPage.countDeleteButtons();
    await invoiceBenefitsComponentsPage.clickOnLastDeleteButton();

    invoiceBenefitsDeleteDialog = new InvoiceBenefitsDeleteDialog();
    expect(await invoiceBenefitsDeleteDialog.getDialogTitle()).to.eq('sahatiApp.invoiceBenefits.delete.question');
    await invoiceBenefitsDeleteDialog.clickOnConfirmButton();

    expect(await invoiceBenefitsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
