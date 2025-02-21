import { MigrationInterface, QueryRunner } from 'typeorm';

export class addProductFields1739766486365 implements MigrationInterface {
    name = 'addProductFields1739766486365';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "product" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE "product" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "product" DROP COLUMN "updatedAt"`,
        );
        await queryRunner.query(
            `ALTER TABLE "product" DROP COLUMN "createdAt"`,
        );
    }
}
