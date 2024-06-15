import { d as defineAction, o as objectType, s as stringType } from './pages/index_D72aciu-.mjs';
import './astro_B06UDcVc.mjs';
import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import '@astrojs/db/dist/runtime/virtual.js';

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({});
createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

const renderEntryGlob = /* #__PURE__ */ Object.assign({});
createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const db = await createRemoteDatabaseClient(process.env.ASTRO_STUDIO_APP_TOKEN ?? "cb0a9ba05270a6dc94d3e5addca54c566941ce46:twbsls65xwtim4r37oubigxslz60", {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": undefined, "ASSETS_PREFIX": undefined, "ACTIONS_PATH": "/Users/parkerdavis/projects/actions-test/src/actions"}.ASTRO_STUDIO_REMOTE_DB_URL ?? "https://db.services.astro.build");
const TestTable = asDrizzleTable("TestTable", { "columns": { "name": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "name", "collection": "TestTable", "primaryKey": false, "optional": false } }, "email": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "email", "collection": "TestTable", "primaryKey": false, "optional": false } } }, "deprecated": false, "indexes": {} }, false);

const server = {
  form: defineAction({
    accept: "form",
    input: objectType({
      name: stringType(),
      email: stringType()
    }),
    handler: async ({ name, email }, ctx) => {
      await db.insert(TestTable).values({ name, email });
      return {
        success: true,
        message: `Thanks ${name}, your email "${email}" is now stored in the database.`
      };
    }
  }),
  getSubmissions: defineAction({
    handler: async () => {
      const result = await db.select().from(TestTable);
      return result;
    }
  })
};

export { server };
