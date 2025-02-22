import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationships1740248643540 implements MigrationInterface {
    name = 'UpdateRelationships1740248643540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" ADD "propertyId" uuid`);
        await queryRunner.query(`ALTER TABLE "bookings" ADD CONSTRAINT "FK_cf064476d403971270369232d80" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookings" DROP CONSTRAINT "FK_cf064476d403971270369232d80"`);
        await queryRunner.query(`ALTER TABLE "bookings" DROP COLUMN "propertyId"`);
    }

}
