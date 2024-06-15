import { defineAction } from 'astro:actions';
import { z } from 'astro:content';
import { db, TestTable } from 'astro:db';

export const server = {
    form: defineAction({
        accept: 'form',
        input: z.object({
            name: z.string(),
            email: z.string(),
        }),
        handler: async ({ name, email }, ctx) => {
            await db.insert(TestTable).values({ name, email });
            return {
                success: true,
                message: `Thanks ${name}, your email "${email}" is now stored in the database.`,
            };
        },
    }),

    getSubmissions: defineAction({
        handler: async () => {
            const result = await db.select().from(TestTable);
            return result;
        },
    }),
};
