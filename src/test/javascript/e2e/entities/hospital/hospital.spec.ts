import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { HospitalComponentsPage, HospitalDeleteDialog, HospitalUpdatePage } from './hospital.page-object';

const expect = chai.expect;

describe('Hospital e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let hospitalComponentsPage: HospitalComponentsPage;
  let hospitalUpdatePage: HospitalUpdatePage;
  let hospitalDeleteDialog: HospitalDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Hospitals', async () => {
    await navBarPage.goToEntity('hospital');
    hospitalComponentsPage = new HospitalComponentsPage();
    await browser.wait(ec.visibilityOf(hospitalComponentsPage.title), 5000);
    expect(await hospitalComponentsPage.getTitle()).to.eq('sahatiApp.hospital.home.title');
    await browser.wait(ec.or(ec.visibilityOf(hospitalComponentsPage.entities), ec.visibilityOf(hospitalComponentsPage.noResult)), 1000);
  });

  it('should load create Hospital page', async () => {
    await hospitalComponentsPage.clickOnCreateButton();
    hospitalUpdatePage = new HospitalUpdatePage();
    expect(await hospitalUpdatePage.getPageTitle()).to.eq('sahatiApp.hospital.home.createOrEditLabel');
    await hospitalUpdatePage.cancel();
  });

  it('should create and save Hospitals', async () => {
    const nbButtonsBeforeCreate = await hospitalComponentsPage.countDeleteButtons();

    await hospitalComponentsPage.clickOnCreateButton();

    await promise.all([
      hospitalUpdatePage.setNameArInput('nameAr'),
      hospitalUpdatePage.setNameEnInput('nameEn'),
      hospitalUpdatePage.setEmailInput('email'),
      hospitalUpdatePage.setPhoneInput('phone'),
      hospitalUpdatePage.setAddressInput('address')
      // hospitalUpdatePage.userSelectLastOption(),
    ]);

    expect(await hospitalUpdatePage.getNameArInput()).to.eq('nameAr', 'Expected NameAr value to be equals to nameAr');
    expect(await hospitalUpdatePage.getNameEnInput()).to.eq('nameEn', 'Expected NameEn value to be equals to nameEn');
    expect(await hospitalUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await hospitalUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');
    expect(await hospitalUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');

    await hospitalUpdatePage.save();
    expect(await hospitalUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await hospitalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Hospital', async () => {
    const nbButtonsBeforeDelete = await hospitalComponentsPage.countDeleteButtons();
    await hospitalComponentsPage.clickOnLastDeleteButton();

    hospitalDeleteDialog = new HospitalDeleteDialog();
    expect(await hospitalDeleteDialog.getDialogTitle()).to.eq('sahatiApp.hospital.delete.question');
    await hospitalDeleteDialog.clickOnConfirmButton();

    expect(await hospitalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
