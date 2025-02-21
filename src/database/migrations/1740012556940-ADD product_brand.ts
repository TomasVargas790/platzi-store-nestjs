import { MigrationInterface, QueryRunner } from 'typeorm';

export class ADDProduct_brand1740012556940 implements MigrationInterface {
    name = 'ADDProduct_brand1740012556940';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `COMMENT ON COLUMN "brand"."createdAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "brand"."updatedAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "category"."createdAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "category"."updatedAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "product"."createdAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "product"."updatedAt" IS NULL`,
        );
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(
            `COMMENT ON COLUMN "customer"."createdAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "customer"."updatedAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "order"."createdAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "order"."updatedAt" IS NULL`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `COMMENT ON COLUMN "order"."updatedAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "order"."createdAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "customer"."updatedAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "customer"."createdAt" IS NULL`,
        );
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(
            `COMMENT ON COLUMN "product"."updatedAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "product"."createdAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "category"."updatedAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "category"."createdAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "brand"."updatedAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "brand"."createdAt" IS NULL`,
        );
    }
}
