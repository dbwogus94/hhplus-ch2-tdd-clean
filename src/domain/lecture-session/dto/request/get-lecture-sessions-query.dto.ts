import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class GetLectureSessionsQuery {
  @Type(() => Date)
  @IsDate()
  startedAt: Date;
}
