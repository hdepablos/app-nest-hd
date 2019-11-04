import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeFiledTokenUnique1572810431936 implements MigrationInterface {
    name = 'ChangeFiledTokenUnique1572810431936'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_access" SET DEFAULT CURRENT_DATE`, undefined);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "UQ_e9f62f5dcb8a54b84234c9e7a06" UNIQUE ("token")`, undefined);
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "last_request" SET DEFAULT CURRENT_TIMESTAMP`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sessions" ALTER COLUMN "last_request" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "UQ_e9f62f5dcb8a54b84234c9e7a06"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_access" SET DEFAULT ('now'`, undefined);
    }

}
