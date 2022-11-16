import { MigrationInterface, QueryRunner } from "typeorm";

export class alterFields1668607975254 implements MigrationInterface {
    name = 'alterFields1668607975254'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_21f72e8648cfdda83b257a87fcc"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_f38ae5f1c4438d5a59639f9b41e"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "debitAccountId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "creditAccountId"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "debitedAccountId" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "creditedAccountId" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e48084dca44e4ce200cb6c295d8" FOREIGN KEY ("debitedAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_90970e74d61cc1e18df1564e3be" FOREIGN KEY ("creditedAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_90970e74d61cc1e18df1564e3be"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e48084dca44e4ce200cb6c295d8"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "creditedAccountId"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "debitedAccountId"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "creditAccountId" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "debitAccountId" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_f38ae5f1c4438d5a59639f9b41e" FOREIGN KEY ("creditAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_21f72e8648cfdda83b257a87fcc" FOREIGN KEY ("debitAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
