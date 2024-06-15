import { defineDb, column, defineTable } from 'astro:db';

const TestTable = defineTable({
    columns: {
        name: column.text(),
        email: column.text(),
    },
});

// https://astro.build/db/config
export default defineDb({
    tables: {
        TestTable,
    },
});
