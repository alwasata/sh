import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BenefitComponentsPage, BenefitDeleteDialog, BenefitUpdatePage } from './benefit.page-object';

const expect = chai.expect;

describe('Benefit e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let benefitComponentsPage: BenefitComponentsPage;
  let benefitUpdatePage: BenefitUpdatePage;
  let benefitDeleteDialog: BenefitDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Benefits', async () => {
    await navBarPage.goToEntity('benefit');
    benefitComponentsPage = new BenefitComponentsPage();
    await browser.wait(ec.visibilityOf(benefitComponentsPage.title), 5000);
    expect(await benefitComponentsPage.getTitle()).to.eq('sahatiApp.benefit.home.title');
    await browser.wait(ec.or(ec.visibilityOf(benefitComponentsPage.entities), ec.visibilityOf(benefitComponentsPage.noResult)), 1000);
  });

  it('should load create Benefit page', async () => {
    await benefitComponentsPage.clickOnCreateButton();
    benefitUpdatePage = new BenefitUpdatePage();
    expect(await benefitUpdatePage.getPageTitle()).to.eq('sahatiApp.benefit.home.createOrEditLabel');
    await benefitUpdatePage.cancel();
  });

  it('should create and save Benefits', async () => {
    const nbButtonsBeforeCreate = await benefitComponentsPage.countDeleteButtons();

    await benefitComponentsPage.clickOnCreateButton();

    await promise.all([
      benefitUpdatePage.setNameArInput('nameAr'),
      benefitUpdatePage.setNameEnInput('nameEn'),
      benefitUpdatePage.setPointsCostInput('5'),
      benefitUpdatePage.setCostInput('5'),
      benefitUpdatePage.categorySelectLastOption(),
      benefitUpdatePage.hospitalSelectLastOption()
    ]);

    expect(await benefitUpdatePage.getNameArInput()).to.eq('nameAr', 'Expected NameAr value to be equals to nameAr');
    expect(await benefitUpdatePage.getNameEnInput()).to.eq('nameEn', 'Expected NameEn value to be equals to nameEn');
    expect(await benefitUpdatePage.getPointsCostInput()).to.eq('5', 'Expected pointsCost value to be equals to 5');
    expect(await benefitUpdatePage.getCostInput()).to.eq('5', 'Expected cost value to be equals to 5');

    await benefitUpdatePage.save();
    expect(await benefitUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await benefitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Benefit', async () => {
    const nbButtonsBeforeDelete = await benefitComponentsPage.countDeleteButtons();
    await benefitComponentsPage.clickOnLastDeleteButton();

    benefitDeleteDialog = new BenefitDeleteDialog();
    expect(await benefitDeleteDialog.getDialogTitle()).to.eq('sahatiApp.benefit.delete.question');
    await benefitDeleteDialog.clickOnConfirmButton();

    expect(await benefitComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
