import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLastaccess1572784308314 implements MigrationInterface {
    name = 'AddLastaccess1572784308314'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD "last_access" date NOT NULL DEFAULT CURRENT_DATE`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "last_access"`, undefined);
    }

}
