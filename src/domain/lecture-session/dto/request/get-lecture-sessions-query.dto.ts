import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class GetLectureSessionsQuery {
  @IsDate()
  @Type(() => Date)
  dateString: Date;
}
