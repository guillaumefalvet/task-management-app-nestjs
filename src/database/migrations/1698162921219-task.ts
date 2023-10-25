import { MigrationInterface, QueryRunner } from 'typeorm';

export class Task1698162921219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO task (title, description, status) VALUES ('migrations test', 'test', 'DONE')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
