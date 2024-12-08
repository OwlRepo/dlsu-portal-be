import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSuperAdminIdAndNullableName1234567890123
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add superAdminId column
    await queryRunner.query(`
      ALTER TABLE "super_admins"
      ADD COLUMN IF NOT EXISTS "superAdminId" VARCHAR UNIQUE
    `);

    // Update existing records with a generated superAdminId
    await queryRunner.query(`
      UPDATE "super_admins"
      SET "superAdminId" = 'SAD-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 12))
      WHERE "superAdminId" IS NULL
    `);

    // Make superAdminId NOT NULL after populating it
    await queryRunner.query(`
      ALTER TABLE "super_admins"
      ALTER COLUMN "superAdminId" SET NOT NULL
    `);

    // Modify name column to be nullable
    await queryRunner.query(`
      ALTER TABLE "super_admins"
      ALTER COLUMN "name" DROP NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert name column to NOT NULL
    await queryRunner.query(`
      UPDATE "super_admins"
      SET "name" = 'Legacy Super Admin'
      WHERE "name" IS NULL
    `);

    await queryRunner.query(`
      ALTER TABLE "super_admins"
      ALTER COLUMN "name" SET NOT NULL
    `);

    // Remove superAdminId column
    await queryRunner.query(`
      ALTER TABLE "super_admins"
      DROP COLUMN "superAdminId"
    `);
  }
}
