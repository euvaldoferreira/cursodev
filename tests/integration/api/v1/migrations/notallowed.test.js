import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

const methodsNotAllowed = ["PUT", "DELETE", "PATCH", "OPTIONS"];

methodsNotAllowed.forEach((method) => {
  describe(`${method} /api/v1/migrations`, () => {
    describe("Anonymouse user", () => {
      test(`Testing method ${method}`, async () => {
        const response = await fetch(
          "http://localhost:3000/api/v1/migrations",
          {
            method: method,
          },
        );
        expect(response.status).toBe(405);
        const responseBody = await response.json();
        expect(responseBody).toEqual({
          name: "MethodNotAllowedError",
          message: "Method not allowed for this endpoint.",
          action:
            "Verify that the HTTP method sent is valid for this endpoint.",
          status_code: 405,
        });
      });
    });
  });
});
