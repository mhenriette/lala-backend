import { MigrationInterface, QueryRunner } from "typeorm";

export class Sh1740138835831 implements MigrationInterface {
    name = 'Sh1740138835831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "property" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "pricePerNight" integer NOT NULL, "location" character varying NOT NULL, "hostId" uuid NOT NULL, CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "profilePictureUrl" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_fb1ec446a15285054d5e124f587" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_fb1ec446a15285054d5e124f587"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePictureUrl"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`DROP TABLE "property"`);
    }

}
