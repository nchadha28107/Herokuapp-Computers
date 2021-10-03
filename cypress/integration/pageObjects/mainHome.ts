export class MainHome {

    addConfirmMessage = 'Done! Computer <COMPUTER> has been created';
    editConfirmMessage = 'Done! Computer <COMPUTER> has been updated';
    deleteConfirmMessage = 'Done! Computer has been deleted';
    noComputerFound = 'No computers found';
    screenTitle = 'computers found';

    getScreenTitle() {
        return cy.get('section h1');
    }

    getFilterByComputerName() {
        return cy.get('#searchbox');
    }

    getFilterByNameButton() {
        return cy.get('#searchsubmit');
    }

    getAddNewComputer() {
        return cy.get('#add');
    }

    getPreviousButton() {
        return cy.get('.prev a');
    }

    getNextButton() {
        return cy.get('.next a');
    }

    getCurrent() {
        return cy.get('.current a');
    }

    getComputersHeader() {
        return cy.get('.current a');
    }

    getComputerRecord(row, column) {
        return cy.get('.computers tbody tr:nth-of-type(' + row + ') td:nth-of-type(' + column + ')');
    }

    getConfirmationMessage() {
        return cy.get('.alert-message.warning');
    }

    navigateTo() {
        return cy.visit('computer-database.herokuapp.com/computers');
    }

}