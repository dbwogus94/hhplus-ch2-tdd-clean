import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1727721851201 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create 'lecture' table
    await queryRunner.query(`
      CREATE TABLE \`lecture\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deletedAt\` datetime(6) NULL,
        \`name\` varchar(255) NOT NULL,
        \`lecturerName\` varchar(255) NOT NULL,
        \`maxCapacity\` int NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);

    // Create 'lecture_session_status' table
    await queryRunner.query(`
      CREATE TABLE \`lecture_session_status\` (
        \`code\` varchar(255) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        PRIMARY KEY (\`code\`)
      ) ENGINE=InnoDB;
    `);

    // Create 'reservation_status' table
    await queryRunner.query(`
      CREATE TABLE \`reservation_status\` (
        \`code\` varchar(255) NOT NULL,
        \`name\` varchar(255) NOT NULL,
        PRIMARY KEY (\`code\`)
      ) ENGINE=InnoDB;
    `);

    // Create 'user' table
    await queryRunner.query(`
      CREATE TABLE \`user\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deletedAt\` datetime(6) NULL,
        \`name\` varchar(255) NOT NULL,
        \`phone\` varchar(255) NOT NULL,
        \`email\` varchar(255) NOT NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);

    // Create 'lecture_session' table
    await queryRunner.query(`
      CREATE TABLE \`lecture_session\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deletedAt\` datetime(6) NULL,
        \`startedAt\` datetime(6) NOT NULL,
        \`lectureId\` int NOT NULL,
        \`status\` varchar(255) NOT NULL,
        \`currentAttendee\` int NOT NULL,
        PRIMARY KEY (\`id\`),
        KEY \`fk_lecture_session_lecture\` (\`lectureId\`),
        KEY \`fk_lecture_session_status\` (\`status\`),
        CONSTRAINT \`fk_lecture_session_lecture\` FOREIGN KEY (\`lectureId\`) REFERENCES \`lecture\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT \`fk_lecture_session_status\` FOREIGN KEY (\`status\`) REFERENCES \`lecture_session_status\` (\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB;
    `);

    // Create 'reservation' table
    await queryRunner.query(`
      CREATE TABLE \`reservation\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        \`deletedAt\` datetime(6) NULL,
        \`userId\` int NOT NULL,
        \`status\` varchar(255) NOT NULL,
        \`lectureSessionId\` int NOT NULL,
        PRIMARY KEY (\`id\`),
        UNIQUE KEY \`uq_reservation_lectureSessionId_userId_status\` (\`lectureSessionId\`,\`userId\`,\`status\`),
        KEY \`fk_reservation_status\` (\`status\`),
        KEY \`fk_reservation_user\` (\`userId\`),
        KEY \`fk_reservation_lecture_session\` (\`lectureSessionId\`),
        CONSTRAINT \`fk_reservation_status\` FOREIGN KEY (\`status\`) REFERENCES \`reservation_status\` (\`code\`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT \`fk_reservation_user\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT \`fk_reservation_lecture_session\` FOREIGN KEY (\`lectureSessionId\`) REFERENCES \`lecture_session\` (\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order of creation
    await queryRunner.query(`DROP TABLE \`reservation\`;`);
    await queryRunner.query(`DROP TABLE \`lecture_session\`;`);
    await queryRunner.query(`DROP TABLE \`user\`;`);
    await queryRunner.query(`DROP TABLE \`reservation_status\`;`);
    await queryRunner.query(`DROP TABLE \`lecture_session_status\`;`);
    await queryRunner.query(`DROP TABLE \`lecture\`;`);
  }
}
