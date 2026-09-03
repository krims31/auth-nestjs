#!/usr/bin/env -S node
import {
  Migration,
  MigrationCLI,
  col,
  primaryKey,
} from '@prisma/orm-postgres/migration';
import type { Contract as End } from '../../snapshots/42cc9b59aec1023f4154a631153fadc5d3d3bab07345dd70eb02d60b7c073d2a/contract';
import endContract from '../../snapshots/42cc9b59aec1023f4154a631153fadc5d3d3bab07345dd70eb02d60b7c073d2a/contract.json' with { type: 'json' };

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'user',
        columns: [
          col('email', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('id', 'SERIAL', {
            notNull: true,
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('password', 'text', {
            notNull: true,
            codecRef: { codecId: 'pg/text@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'user',
        constraint: 'user_email_key',
        columns: ['email'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
