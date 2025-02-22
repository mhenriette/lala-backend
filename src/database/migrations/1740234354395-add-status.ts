import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatus1740234354395 implements MigrationInterface {
  name = "AddStatus1740234354395";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD "status" boolean NOT NULL DEFAULT true`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "status"`);
    await queryRunner.query(
      `ALTER TABLE "property" ADD "status" boolean NOT NULL DEFAULT true`
    );
  }
}
