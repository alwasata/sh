import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AttatchmentComponentsPage, AttatchmentDeleteDialog, AttatchmentUpdatePage } from './attatchment.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Attatchment e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let attatchmentComponentsPage: AttatchmentComponentsPage;
  let attatchmentUpdatePage: AttatchmentUpdatePage;
  let attatchmentDeleteDialog: AttatchmentDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Attatchments', async () => {
    await navBarPage.goToEntity('attatchment');
    attatchmentComponentsPage = new AttatchmentComponentsPage();
    await browser.wait(ec.visibilityOf(attatchmentComponentsPage.title), 5000);
    expect(await attatchmentComponentsPage.getTitle()).to.eq('sahatiApp.attatchment.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(attatchmentComponentsPage.entities), ec.visibilityOf(attatchmentComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Attatchment page', async () => {
    await attatchmentComponentsPage.clickOnCreateButton();
    attatchmentUpdatePage = new AttatchmentUpdatePage();
    expect(await attatchmentUpdatePage.getPageTitle()).to.eq('sahatiApp.attatchment.home.createOrEditLabel');
    await attatchmentUpdatePage.cancel();
  });

  it('should create and save Attatchments', async () => {
    const nbButtonsBeforeCreate = await attatchmentComponentsPage.countDeleteButtons();

    await attatchmentComponentsPage.clickOnCreateButton();

    await promise.all([
      attatchmentUpdatePage.setNameInput('name'),
      attatchmentUpdatePage.setFileInput(absolutePath),
      attatchmentUpdatePage.setFileUrlInput('fileUrl'),
      attatchmentUpdatePage.employeeSelectLastOption()
    ]);

    expect(await attatchmentUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await attatchmentUpdatePage.getFileInput()).to.endsWith(
      fileNameToUpload,
      'Expected File value to be end with ' + fileNameToUpload
    );
    expect(await attatchmentUpdatePage.getFileUrlInput()).to.eq('fileUrl', 'Expected FileUrl value to be equals to fileUrl');

    await attatchmentUpdatePage.save();
    expect(await attatchmentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await attatchmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Attatchment', async () => {
    const nbButtonsBeforeDelete = await attatchmentComponentsPage.countDeleteButtons();
    await attatchmentComponentsPage.clickOnLastDeleteButton();

    attatchmentDeleteDialog = new AttatchmentDeleteDialog();
    expect(await attatchmentDeleteDialog.getDialogTitle()).to.eq('sahatiApp.attatchment.delete.question');
    await attatchmentDeleteDialog.clickOnConfirmButton();

    expect(await attatchmentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
