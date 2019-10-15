import {MigrationInterface, QueryRunner} from "typeorm";

export class addIsactiveBoolean1571143330255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`, undefined);
    }

}
