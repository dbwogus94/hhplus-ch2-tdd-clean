import { IsInt, Min } from 'class-validator';

export class PostLectureSessionRequest {
  @IsInt()
  @Min(1)
  userId: number;
}
