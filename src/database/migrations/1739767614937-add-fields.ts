import { MigrationInterface, QueryRunner } from 'typeorm';

export class addFields1739767614937 implements MigrationInterface {
    name = 'addFields1739767614937';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "brand" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE "brand" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE "category" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE "category" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE "user" ADD "role" character varying(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "user" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE "user" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE "customer" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE "customer" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE "order" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `ALTER TABLE "order" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "product"."createdAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "product"."updatedAt" IS NULL`,
        );
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "userId" integer`);
        await queryRunner.query(
            `ALTER TABLE "customer" ADD CONSTRAINT "UQ_3f62b42ed23958b120c235f74df" UNIQUE ("userId")`,
        );
        await queryRunner.query(
            `ALTER TABLE "customer" ADD CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "customer" DROP CONSTRAINT "FK_3f62b42ed23958b120c235f74df"`,
        );
        await queryRunner.query(
            `ALTER TABLE "customer" DROP CONSTRAINT "UQ_3f62b42ed23958b120c235f74df"`,
        );
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "userId"`);
        await queryRunner.query(
            `ALTER TABLE "customer" ADD "userId" character varying(255) NOT NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "product"."updatedAt" IS NULL`,
        );
        await queryRunner.query(
            `COMMENT ON COLUMN "product"."createdAt" IS NULL`,
        );
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "createdAt"`);
        await queryRunner.query(
            `ALTER TABLE "customer" DROP COLUMN "updatedAt"`,
        );
        await queryRunner.query(
            `ALTER TABLE "customer" DROP COLUMN "createdAt"`,
        );
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(
            `ALTER TABLE "category" DROP COLUMN "updatedAt"`,
        );
        await queryRunner.query(
            `ALTER TABLE "category" DROP COLUMN "createdAt"`,
        );
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "createdAt"`);
    }
}
