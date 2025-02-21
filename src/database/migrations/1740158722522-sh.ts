import { MigrationInterface, QueryRunner } from "typeorm";

export class Sh1740158722522 implements MigrationInterface {
    name = 'Sh1740158722522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "age" integer NOT NULL`);
    }

}
