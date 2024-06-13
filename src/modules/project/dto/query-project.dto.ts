import { IsOptional } from 'class-validator';
import { ProjectStatus } from 'src/enums/project-status.enum';

export class QueryProjectDto {
  @IsOptional()
  status: ProjectStatus;

  @IsOptional()
  slots: 'full' | 'with_slot';
}
