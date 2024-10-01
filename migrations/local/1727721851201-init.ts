import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1727721851201 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create 'lecture' table
    await queryRunner.query(`
      CREATE TABLE "lecture" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "createdAt" text NOT NULL DEFAULT (datetime('now')),
        "updatedAt" text NOT NULL DEFAULT (datetime('now')),
        "deletedAt" text,
        "name" varchar NOT NULL,
        "lecturerName" varchar NOT NULL,
        "maxCapacity" integer NOT NULL
      );
    `);

    // Create 'lecture_session_status' table
    await queryRunner.query(`
      CREATE TABLE "lecture_session_status" (
        "code" varchar PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL
      );
    `);

    // Create 'reservation_status' table
    await queryRunner.query(`
      CREATE TABLE "reservation_status" (
        "code" varchar PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL
      );
    `);

    // Create 'user' table
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "createdAt" text NOT NULL DEFAULT (datetime('now')),
        "updatedAt" text NOT NULL DEFAULT (datetime('now')),
        "deletedAt" text,
        "name" character NOT NULL,
        "phone" character NOT NULL,
        "email" character NOT NULL
      );
    `);

    // Create 'lecture_session' table
    await queryRunner.query(`
      CREATE TABLE "lecture_session" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "createdAt" text NOT NULL DEFAULT (datetime('now')),
        "updatedAt" text NOT NULL DEFAULT (datetime('now')),
        "deletedAt" text,
        "date" date NOT NULL,
        "lectureId" integer NOT NULL,
        "status" varchar NOT NULL,
        "currentAttendee" integer NOT NULL,
        CONSTRAINT "fk_lecture_session_lecture" FOREIGN KEY ("lectureId") REFERENCES "lecture" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "fk_lecture_session_status" FOREIGN KEY ("status") REFERENCES "lecture_session_status" ("code") ON DELETE NO ACTION ON UPDATE NO ACTION
      );
    `);

    // Create 'reservation' table
    await queryRunner.query(`
      CREATE TABLE "reservation" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "createdAt" text NOT NULL DEFAULT (datetime('now')),
        "updatedAt" text NOT NULL DEFAULT (datetime('now')),
        "deletedAt" text,
        "userId" integer NOT NULL,
        "status" varchar NOT NULL,
        "lectureSessionId" integer NOT NULL,
        CONSTRAINT "uq_reservation_lectureSessionId_userId_status" UNIQUE ("lectureSessionId", "userId", "status"),
        CONSTRAINT "fk_reservation_status" FOREIGN KEY ("status") REFERENCES "reservation_status" ("code") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "fk_reservation_user" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "fk_reservation_lecture_session" FOREIGN KEY ("lectureSessionId") REFERENCES "lecture_session" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order of creation
    await queryRunner.query(`DROP TABLE "reservation";`);
    await queryRunner.query(`DROP TABLE "lecture_session";`);
    await queryRunner.query(`DROP TABLE "user";`);
    await queryRunner.query(`DROP TABLE "reservation_status";`);
    await queryRunner.query(`DROP TABLE "lecture_session_status";`);
    await queryRunner.query(`DROP TABLE "lecture";`);
  }
}
