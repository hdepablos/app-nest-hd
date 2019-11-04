import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeFiledUsuarioAcceso1572803783174 implements MigrationInterface {
    name = 'ChangeFiledUsuarioAcceso1572803783174'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_access" SET DEFAULT CURRENT_DATE`, undefined);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "last_request" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "last_request" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_access" SET DEFAULT ('now'`, undefined);
    }

}
