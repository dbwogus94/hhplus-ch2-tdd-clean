import { Type } from 'class-transformer';
import { IsDate, IsEnum } from 'class-validator';
import { LectureSessionStatusCode } from 'src/common';

export class GetLectureSessionsQuery {
  @IsDate()
  @Type(() => Date)
  dateString?: Date;

  @IsEnum(LectureSessionStatusCode)
  status?: LectureSessionStatusCode;
}
