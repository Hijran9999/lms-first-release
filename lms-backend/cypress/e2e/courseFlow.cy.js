describe('LMS E2E', () => {
  it('registers, logs in, and creates a course', () => {
    cy.visit('/');
    cy.contains('Sign Up').click();
    cy.get('input[name="fullName"]').type('Instructor E2E');
    cy.get('input[type="email"]').type('e2e-instructor@lms.com');
    cy.get('input[type="password"]').type('Password123');
    cy.get('select').select('instructor');
    cy.contains('Register').click();

    cy.contains('Create Course').click();
    cy.get('input[placeholder="Title"]').type('E2E Course');
    cy.get('input[placeholder="Code"]').type('E2E101');
    cy.contains('Create').click();

    cy.contains('E2E Course').should('exist');
  });
});
