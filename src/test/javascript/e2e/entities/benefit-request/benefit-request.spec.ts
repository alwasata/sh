import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BenefitRequestComponentsPage, BenefitRequestDeleteDialog, BenefitRequestUpdatePage } from './benefit-request.page-object';

const expect = chai.expect;

describe('BenefitRequest e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let benefitRequestComponentsPage: BenefitRequestComponentsPage;
  let benefitRequestUpdatePage: BenefitRequestUpdatePage;
  let benefitRequestDeleteDialog: BenefitRequestDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load BenefitRequests', async () => {
    await navBarPage.goToEntity('benefit-request');
    benefitRequestComponentsPage = new BenefitRequestComponentsPage();
    await browser.wait(ec.visibilityOf(benefitRequestComponentsPage.title), 5000);
    expect(await benefitRequestComponentsPage.getTitle()).to.eq('sahatiApp.benefitRequest.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(benefitRequestComponentsPage.entities), ec.visibilityOf(benefitRequestComponentsPage.noResult)),
      1000
    );
  });

  it('should load create BenefitRequest page', async () => {
    await benefitRequestComponentsPage.clickOnCreateButton();
    benefitRequestUpdatePage = new BenefitRequestUpdatePage();
    expect(await benefitRequestUpdatePage.getPageTitle()).to.eq('sahatiApp.benefitRequest.home.createOrEditLabel');
    await benefitRequestUpdatePage.cancel();
  });

  it('should create and save BenefitRequests', async () => {
    const nbButtonsBeforeCreate = await benefitRequestComponentsPage.countDeleteButtons();

    await benefitRequestComponentsPage.clickOnCreateButton();

    await promise.all([
      benefitRequestUpdatePage.setNameArInput('nameAr'),
      benefitRequestUpdatePage.setNameEnInput('nameEn'),
      benefitRequestUpdatePage.setPointsCostInput('5'),
      benefitRequestUpdatePage.setCostInput('5'),
      benefitRequestUpdatePage.benefitStatusSelectLastOption(),
      benefitRequestUpdatePage.setNotesInput('notes'),
      benefitRequestUpdatePage.categorySelectLastOption(),
      benefitRequestUpdatePage.hospitalSelectLastOption(),
      benefitRequestUpdatePage.benefitSelectLastOption()
    ]);

    expect(await benefitRequestUpdatePage.getNameArInput()).to.eq('nameAr', 'Expected NameAr value to be equals to nameAr');
    expect(await benefitRequestUpdatePage.getNameEnInput()).to.eq('nameEn', 'Expected NameEn value to be equals to nameEn');
    expect(await benefitRequestUpdatePage.getPointsCostInput()).to.eq('5', 'Expected pointsCost value to be equals to 5');
    expect(await benefitRequestUpdatePage.getCostInput()).to.eq('5', 'Expected cost value to be equals to 5');
    expect(await benefitRequestUpdatePage.getNotesInput()).to.eq('notes', 'Expected Notes value to be equals to notes');

    await benefitRequestUpdatePage.save();
    expect(await benefitRequestUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await benefitRequestComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last BenefitRequest', async () => {
    const nbButtonsBeforeDelete = await benefitRequestComponentsPage.countDeleteButtons();
    await benefitRequestComponentsPage.clickOnLastDeleteButton();

    benefitRequestDeleteDialog = new BenefitRequestDeleteDialog();
    expect(await benefitRequestDeleteDialog.getDialogTitle()).to.eq('sahatiApp.benefitRequest.delete.question');
    await benefitRequestDeleteDialog.clickOnConfirmButton();

    expect(await benefitRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
