describe('API Auth Tests', () => {
  const baseUrl = 'http://localhost:5000/api/auth';

  it('registers a new user', () => {
    const email = `test${Date.now()}@mail.com`;

    cy.request('POST', `${baseUrl}/register`, {
      fullName: 'Cypress User',
      email,
      password: 'password123',
      role: 'instructor'
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('token');
    });
  });

  it('logins an existing user', () => {
    const email = `cypresslogin${Date.now()}@mail.com`;

    cy.request('POST', `${baseUrl}/register`, {
      fullName: 'Login User',
      email,
      password: 'password123',
      role: 'student'
    });

    cy.request('POST', `${baseUrl}/login`, {
      email,
      password: 'password123'
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property('token');
    });
  });
});
