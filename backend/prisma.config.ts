import { defineConfig } from '@prisma/cli-engine';
import { defineConfig as definePostgresConfig } from '@prisma/orm-postgres/config';
import 'dotenv/config';

export default defineConfig({
  orm: definePostgresConfig({
    contract: './prisma/schema.prisma',
    db: {
      connection: process.env['DIRECT_URL']!,
    },
  }),
});
