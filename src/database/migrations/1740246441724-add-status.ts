import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStatus1740246441724 implements MigrationInterface {
    name = 'AddStatus1740246441724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."bookings_status_enum" AS ENUM('pending', 'confirmed', 'rejected', 'canceled')`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD "status" "public"."bookings_status_enum" NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."bookings_status_enum"`);
        await queryRunner.query(`ALTER TABLE "property" ADD "status" boolean NOT NULL DEFAULT true`);
    }

}
