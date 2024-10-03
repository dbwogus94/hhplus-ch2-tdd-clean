import {
  LectureEntity,
  LectureSessionEntity,
  LectureSessionStatusCode,
  ReservationEntity,
  ReservationStatusCode,
} from 'src/common';

class GetLectureResponse
  implements
    Pick<LectureEntity, 'id' | 'name' | 'lecturerName' | 'maxCapacity'>
{
  id: number;
  name: string;
  lecturerName: string;
  maxCapacity: number;
}

class GetLectureSessionResponse
  implements
    Pick<
      LectureSessionEntity,
      'id' | 'startedAt' | 'status' | 'currentAttendee'
    >
{
  id: number;
  startedAt: Date;
  status: LectureSessionStatusCode;
  currentAttendee: number;
  lecture: GetLectureResponse;
}

export class GetLectureReservationsResponse
  implements Pick<ReservationEntity, 'id' | 'createdAt' | 'status'>
{
  constructor(
    readonly id: number,
    readonly createdAt: Date,
    readonly status: ReservationStatusCode,
    readonly lectureSession: GetLectureSessionResponse,
  ) {}

  static from(entity: ReservationEntity): GetLectureReservationsResponse;
  static from(entity: ReservationEntity[]): GetLectureReservationsResponse[];
  static from(
    entity: ReservationEntity | ReservationEntity[],
  ): GetLectureReservationsResponse | GetLectureReservationsResponse[] {
    if (Array.isArray(entity)) return entity.map((e) => this.from(e));

    const { lectureSession, ...otherReservation } = entity;
    const { lecture, ...other } = lectureSession;
    const resultLectureSession: GetLectureSessionResponse = {
      id: other.id,
      startedAt: other.startedAt,
      currentAttendee: other.currentAttendee,
      status: other.status,
      lecture: {
        id: lecture.id,
        name: lecture.name,
        lecturerName: lecture.lecturerName,
        maxCapacity: lecture.maxCapacity,
      },
    };

    return new GetLectureReservationsResponse(
      otherReservation.id,
      otherReservation.createdAt,
      otherReservation.status,
      resultLectureSession,
    );
  }
}
