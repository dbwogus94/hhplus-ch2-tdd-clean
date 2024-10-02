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
  id: number;
  currentAttendee: number;
  status: string;
  lecture: GetLectureResponse;
}
