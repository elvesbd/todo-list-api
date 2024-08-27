import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDefaultUser1724758621174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			INSERT INTO users (email, password, created_at)
			VALUES ('admin@mail.com', '@password123', NOW())
		`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
			DELETE FROM users WHERE email = 'admin@example.com'
		`);
  }
}
