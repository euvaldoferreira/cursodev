import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();
    await email.send({
      from: "CoverTab <contato@covertab.com>",
      to: "user@example.com",
      subject: "First Test Email",
      text: "This is a test email.",
    });

    await email.send({
      from: "CoverTab <contato@covertab.com>",
      to: "user@example.com",
      subject: "Last Test Email",
      text: "This is the last test email.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<contato@covertab.com>");
    expect(lastEmail.recipients[0]).toBe("<user@example.com>");
    expect(lastEmail.subject).toBe("Last Test Email");
    expect(lastEmail.text).toBe("This is the last test email.\n");
  });
});
