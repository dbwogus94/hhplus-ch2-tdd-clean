import { LectureEntity, LectureSessionEntity } from 'src/common';

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
    readonly status: string,
    readonly lecture: GetLectureResponse,
  ) {}

  /** from: 하나의 매개변수 */
  static from(entity: LectureSessionEntity): GetLectureSessionsResponse;
  static from(entity: LectureSessionEntity[]): GetLectureSessionsResponse[];
  static from(
    entity: LectureSessionEntity | LectureSessionEntity[],
  ): GetLectureSessionsResponse | GetLectureSessionsResponse[] {
    if (Array.isArray(entity)) return entity.map((e) => this.from(e));

    return new GetLectureSessionsResponse(
      entity.id,
      entity.currentAttendee,
      entity.status,
      entity.lecture,
    );
  }
}
