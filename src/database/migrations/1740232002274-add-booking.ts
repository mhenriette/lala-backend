import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBooking1740232002274 implements MigrationInterface {
  name = "AddBooking1740232002274";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bookings" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hostId" uuid, CONSTRAINT "PK_bee6805982cc1e248e94ce94957" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "bookings" ADD CONSTRAINT "FK_b65e31b9f35ffe9dc5bb039dc2a" FOREIGN KEY ("hostId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "bookings" DROP CONSTRAINT "FK_b65e31b9f35ffe9dc5bb039dc2a"`
    );
    await queryRunner.query(`DROP TABLE "bookings"`);
  }
}
