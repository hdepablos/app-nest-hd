import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserAccesoRelation1N1571328899990 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "user_acceso" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sede_id" integer NOT NULL, "perfil_id" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "user_id" uuid, CONSTRAINT "PK_b42aee7bca002198c70607125f7" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "user_acceso" ADD CONSTRAINT "FK_38faba68c440a08400fe0d4a3b9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_acceso" DROP CONSTRAINT "FK_38faba68c440a08400fe0d4a3b9"`, undefined);
        await queryRunner.query(`DROP TABLE "user_acceso"`, undefined);
    }

}
