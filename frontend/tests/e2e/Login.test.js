describe('Login Page', () => {
    it('should allow a user to login', () => {
        cy.visit('/login');
        cy.get('input[type=email]').type('test@example.com');
        cy.get('input[type=password]').type('password123');
        cy.get('button[type=submit]').click();
        cy.url().should('include', '/profile');
    });
});
