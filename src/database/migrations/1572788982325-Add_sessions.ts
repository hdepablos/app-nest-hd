import {MigrationInterface, QueryRunner} from "typeorm";

export class AddSessions1572788982325 implements MigrationInterface {
    name = 'AddSessions1572788982325'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "token" character varying(300) NOT NULL, "usuario_acceso" integer NOT NULL, "last_request" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_access" SET DEFAULT CURRENT_DATE`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_access" SET DEFAULT ('now'`, undefined);
        await queryRunner.query(`DROP TABLE "sessions"`, undefined);
    }

}
