export class AddComputer {

    screenTitle = 'Add a computer';

    getScreenTitle() {
        return cy.get('section h1');
    }

    getComputerName() {
        return cy.get('#name');
    }

    getIntroducedDate() {
        return cy.get('#introduced');
    }

    getDiscontinuedDate() {
        return cy.get('#discontinued');
    }

    getCompany() {
        return cy.get('#company');
    }

    getSaveComputer() {
        return cy.get('.actions input');
    }

    getCancel() {
        return cy.get('.actions a');
    }

}