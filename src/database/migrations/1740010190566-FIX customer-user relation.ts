import { MigrationInterface, QueryRunner } from 'typeorm';

export class FIXCustomerUserRelation1740010190566
    implements MigrationInterface
{
    name = 'FIXCustomerUserRelation1740010190566';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "customer" DROP CONSTRAINT "FK_3f62b42ed23958b120c235f74df"`,
        );
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "email"`);
        await queryRunner.query(
            `ALTER TABLE "customer" DROP CONSTRAINT "UQ_3f62b42ed23958b120c235f74df"`,
        );
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "userId"`);
        await queryRunner.query(
            `ALTER TABLE "user" ADD "email" character varying(255) NOT NULL`,
        );
        await queryRunner.query(`ALTER TABLE "user" ADD "customerId" integer`);
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce" UNIQUE ("customerId")`,
        );
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
        await queryRunner.query(
            `ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`,
        );
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
        await queryRunner.query(
            `ALTER TABLE "user" DROP CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce"`,
        );
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "userId" integer`);
        await queryRunner.query(
            `ALTER TABLE "customer" ADD CONSTRAINT "UQ_3f62b42ed23958b120c235f74df" UNIQUE ("userId")`,
        );
        await queryRunner.query(
            `ALTER TABLE "customer" ADD "email" character varying(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "user" ADD "username" character varying(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "user" ADD "name" character varying(255) NOT NULL`,
        );
        await queryRunner.query(
            `ALTER TABLE "customer" ADD CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
