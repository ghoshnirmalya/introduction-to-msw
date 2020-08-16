context("Cypress Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  describe("User Interface Assertions", () => {
    it("should consist of 5 users", () => {
      cy.get("[data-test-id=user]").should("have.length", 5);
    });

    it("should consist of 5 messages when any user is selected", () => {
      cy.get("[data-test-id=user]").first().click();
      cy.get("[data-test-id=message]").should("have.length", 5);
    });
  });
});
