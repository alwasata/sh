import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CardComponentsPage, CardDeleteDialog, CardUpdatePage } from './card.page-object';

const expect = chai.expect;

describe('Card e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let cardComponentsPage: CardComponentsPage;
  let cardUpdatePage: CardUpdatePage;
  let cardDeleteDialog: CardDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Cards', async () => {
    await navBarPage.goToEntity('card');
    cardComponentsPage = new CardComponentsPage();
    await browser.wait(ec.visibilityOf(cardComponentsPage.title), 5000);
    expect(await cardComponentsPage.getTitle()).to.eq('sahatiApp.card.home.title');
    await browser.wait(ec.or(ec.visibilityOf(cardComponentsPage.entities), ec.visibilityOf(cardComponentsPage.noResult)), 1000);
  });

  it('should load create Card page', async () => {
    await cardComponentsPage.clickOnCreateButton();
    cardUpdatePage = new CardUpdatePage();
    expect(await cardUpdatePage.getPageTitle()).to.eq('sahatiApp.card.home.createOrEditLabel');
    await cardUpdatePage.cancel();
  });

  it('should create and save Cards', async () => {
    const nbButtonsBeforeCreate = await cardComponentsPage.countDeleteButtons();

    await cardComponentsPage.clickOnCreateButton();

    await promise.all([
      cardUpdatePage.setCardNoInput('cardNo'),
      cardUpdatePage.setExpiryDateInput('2000-12-31'),
      cardUpdatePage.employeeSelectLastOption()
    ]);

    expect(await cardUpdatePage.getCardNoInput()).to.eq('cardNo', 'Expected CardNo value to be equals to cardNo');
    expect(await cardUpdatePage.getExpiryDateInput()).to.eq('2000-12-31', 'Expected expiryDate value to be equals to 2000-12-31');
    const selectedIsActive = cardUpdatePage.getIsActiveInput();
    if (await selectedIsActive.isSelected()) {
      await cardUpdatePage.getIsActiveInput().click();
      expect(await cardUpdatePage.getIsActiveInput().isSelected(), 'Expected isActive not to be selected').to.be.false;
    } else {
      await cardUpdatePage.getIsActiveInput().click();
      expect(await cardUpdatePage.getIsActiveInput().isSelected(), 'Expected isActive to be selected').to.be.true;
    }

    await cardUpdatePage.save();
    expect(await cardUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await cardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Card', async () => {
    const nbButtonsBeforeDelete = await cardComponentsPage.countDeleteButtons();
    await cardComponentsPage.clickOnLastDeleteButton();

    cardDeleteDialog = new CardDeleteDialog();
    expect(await cardDeleteDialog.getDialogTitle()).to.eq('sahatiApp.card.delete.question');
    await cardDeleteDialog.clickOnConfirmButton();

    expect(await cardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
