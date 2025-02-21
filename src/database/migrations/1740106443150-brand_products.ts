import {MigrationInterface, QueryRunner} from "typeorm";

export class brandProducts1740106443150 implements MigrationInterface {
    name = 'brandProducts1740106443150'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "brandId" integer`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brand"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brand"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "order"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "order"."updatedAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"`);
        await queryRunner.query(`COMMENT ON COLUMN "order"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "order"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "customer"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "category"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brand"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "brand"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."updatedAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "brandId"`);
    }

}
