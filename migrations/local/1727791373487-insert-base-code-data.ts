import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertBaseCodeData1727791373487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // lecture_session_status 코드성 데이터 추가
    await queryRunner.query(`
        INSERT INTO lecture_session_status
        (code, name)
        VALUES
            ('Available', '신청가능'),
            ('Deadline', '신청마감')
        ;
        `);

    // reservation_status 코드성 데이터 추가
    await queryRunner.query(`
        INSERT INTO reservation_status
        (code, name)
        VALUES
            ('Register', '등록'),
            ('Cancel', '취소')
        ;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM lecture_session_status WHERE code IN('Available', 'Deadline') ;`,
    );

    await queryRunner.query(
      `DELETE FROM reservation_status WHERE code IN('Register', 'Cancel') ;`,
    );
  }
}
