import database from "infra/database.js";
import migrator from "models/migrator.js";

import retry from "async-retry";
async function waitForAllServices() {
  await awaitForWebServer();

  async function awaitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) {
        throw new Error("Web server not ready yet");
      }
    }
  }
}
async function clearDatabase() {
  await database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations();
}
const orquestrador = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
};
export default orquestrador;
