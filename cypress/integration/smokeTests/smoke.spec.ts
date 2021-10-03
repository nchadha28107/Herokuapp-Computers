import { MainHome } from '../pageObjects/mainHome';
import { AddComputer } from '../pageObjects/addComputer';
import { EditComputer } from '../pageObjects/editComputer';
import { CommonFunctions } from '../functionslibrary/commonFunctions';

const mainHome = new MainHome();
const addComputer = new AddComputer();
const editComputer = new EditComputer();
const commonFunctions = new CommonFunctions();
const data = require('../../fixtures/addComputer.json');
const dataReference = 'DefaultData';
let computerName;

describe('Computer Database Herokuapp - Smoke Tests', () => {

    before(() => {
        mainHome.navigateTo().then(() => {
            mainHome.getScreenTitle().should('contain.text', mainHome.screenTitle)
        })
    });

    describe('TC001 - Add a computer', () => {
        describe('Given When a User has accessed the application'
            + ' And a User tries to add a new computer with valid details', () => {
                it('Then a new computer should be added successfully', () => {

                    let initialTotalComputers
                    mainHome.getScreenTitle().then((element) => {
                        initialTotalComputers = element.text().replace(' computers found', '');
                    })

                    mainHome.getAddNewComputer().click();

                    addComputer.getScreenTitle().should('have.text', addComputer.screenTitle);

                    computerName = data[dataReference].computerName;
                    computerName = computerName.replace(/XXXXX/gi, commonFunctions.randomInt(1000000, 9999999).toString());
                    addComputer.getComputerName().type(computerName);
                    addComputer.getIntroducedDate().type(data[dataReference].introducedDate);
                    addComputer.getDiscontinuedDate().type(data[dataReference].discountinuedDate);
                    addComputer.getCompany().select(data[dataReference].company);
                    addComputer.getSaveComputer().click();

                    mainHome.getScreenTitle().should('contain.text', mainHome.screenTitle)
                    mainHome.getConfirmationMessage().should('contain.text', mainHome.addConfirmMessage.replace('<COMPUTER>', computerName));
                    mainHome.getScreenTitle().then((element) => {
                        expect(Number(element.text().replace(' computers found', ''))).to.equal(Number(initialTotalComputers) + 1);
                    })
                })
            })
    })

    describe('TC007 - Search a computer', () => {
        describe('Given When a User has accessed the application'
            + ' And a User tries to search computer', () => {
                it('Then computer should be search successfully with partial name', () => {

                    mainHome.getFilterByComputerName().type(computerName.split(' ')[1]);
                    mainHome.getFilterByNameButton().click();
                    mainHome.getComputerRecord(1, 1).should('have.text', computerName);
                    let introducedDate = new Date(data[dataReference].introducedDate);
                    mainHome.getComputerRecord(1, 2).should('contain.text', (introducedDate.getDate() + ' '
                        + introducedDate.toLocaleString('en-us', { month: 'short' }) + ' ' + introducedDate.getFullYear()));
                    let discountinuedDate = new Date(data[dataReference].discountinuedDate);
                    mainHome.getComputerRecord(1, 3).should('contain.text', (discountinuedDate.getDate() + ' '
                        + discountinuedDate.toLocaleString('en-us', { month: 'short' }) + ' ' + discountinuedDate.getFullYear()));
                    mainHome.getComputerRecord(1, 4).should('contain.text', data[dataReference].company);
                })

                it('Then computer should be search successfully with complete name', () => {

                    mainHome.getFilterByComputerName().clear();
                    mainHome.getFilterByComputerName().type(computerName);
                    mainHome.getFilterByNameButton().click();
                    mainHome.getComputerRecord(1, 1).should('have.text', computerName);
                    let introducedDate = new Date(data[dataReference].introducedDate);
                    mainHome.getComputerRecord(1, 2).should('contain.text', (introducedDate.getDate() + ' '
                        + introducedDate.toLocaleString('en-us', { month: 'short' }) + ' ' + introducedDate.getFullYear()));
                    let discountinuedDate = new Date(data[dataReference].discountinuedDate);
                    mainHome.getComputerRecord(1, 3).should('contain.text', (discountinuedDate.getDate() + ' '
                        + discountinuedDate.toLocaleString('en-us', { month: 'short' }) + ' ' + discountinuedDate.getFullYear()));
                    mainHome.getComputerRecord(1, 4).should('contain.text', data[dataReference].company);
                })
            })
    })

    describe('TC004 - Edit a computer', () => {
        describe('Given When a User has accessed the application'
            + ' And a User tries to edit a computer with valid details', () => {
                it('Then a new computer should be updated successfully', () => {

                    mainHome.getFilterByComputerName().clear();
                    mainHome.getFilterByComputerName().type(computerName);
                    mainHome.getComputerRecord(1, 1).find('a').click();

                    editComputer.getScreenTitle().should('have.text', editComputer.screenTitle);

                    editComputer.getComputerName().should('have.value', computerName);
                    editComputer.getIntroducedDate().should('have.value', data[dataReference].introducedDate);
                    editComputer.getDiscontinuedDate().should('have.value', data[dataReference].discountinuedDate);
                    editComputer.getCompany().find('option:selected').should('have.text', data[dataReference].company);

                    editComputer.getDiscontinuedDate().clear();
                    editComputer.getSaveComputer().click();

                    mainHome.getScreenTitle().should('contain.text', mainHome.screenTitle)
                    mainHome.getConfirmationMessage().should('contain.text', mainHome.editConfirmMessage.replace('<COMPUTER>', computerName));

                    mainHome.getFilterByComputerName().type(computerName);
                    mainHome.getFilterByNameButton().click();
                    mainHome.getComputerRecord(1, 1).should('have.text', computerName);
                    let introducedDate = new Date(data[dataReference].introducedDate);
                    mainHome.getComputerRecord(1, 2).should('contain.text', (introducedDate.getDate() + ' '
                        + introducedDate.toLocaleString('en-us', { month: 'short' }) + ' ' + introducedDate.getFullYear()));
                    mainHome.getComputerRecord(1, 3).should('contain.text', '-');
                    mainHome.getComputerRecord(1, 4).should('contain.text', data[dataReference].company);

                })
            })
    })

    describe('TC005 - Delete a computer', () => {
        describe('Given When a User has accessed the application'
            + ' And a User tries to delete a computer', () => {
                it('Then a new computer should be deleted successfully', () => {

                    mainHome.getFilterByComputerName().clear();
                    mainHome.getFilterByComputerName().type(computerName);
                    mainHome.getComputerRecord(1, 1).find('a').click();

                    editComputer.getScreenTitle().should('have.text', editComputer.screenTitle);
                    editComputer.getDeleteComputer().click();


                    mainHome.getScreenTitle().should('contain.text', mainHome.screenTitle)
                    mainHome.getConfirmationMessage().should('contain.text', mainHome.deleteConfirmMessage);

                    mainHome.getFilterByComputerName().type(computerName);
                    mainHome.getFilterByNameButton().click();
                    mainHome.getScreenTitle().should('have.text', mainHome.noComputerFound);
                })
            })
    })
})