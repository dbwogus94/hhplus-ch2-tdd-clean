import {
  LectureEntity,
  LectureSessionEntity,
  LectureSessionStatusCode,
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

export class GetLectureSessionsResponse
  implements Pick<LectureSessionEntity, 'id' | 'currentAttendee' | 'status'>
{
  constructor(
    readonly id: number,
    readonly currentAttendee: number,
    readonly status: LectureSessionStatusCode,
    readonly lecture: GetLectureResponse,
  ) {}

  /** from: 하나의 매개변수 */
  static from(entity: LectureSessionEntity): GetLectureSessionsResponse;
  static from(entity: LectureSessionEntity[]): GetLectureSessionsResponse[];
  static from(
    entity: LectureSessionEntity | LectureSessionEntity[],
  ): GetLectureSessionsResponse | GetLectureSessionsResponse[] {
    if (Array.isArray(entity)) return entity.map((e) => this.from(e));

    const { lecture, ...other } = entity;
    return new GetLectureSessionsResponse(
      other.id,
      other.currentAttendee,
      other.status,
      {
        id: lecture.id,
        name: lecture.name,
        lecturerName: lecture.lecturerName,
        maxCapacity: lecture.maxCapacity,
      },
    );
  }
}
