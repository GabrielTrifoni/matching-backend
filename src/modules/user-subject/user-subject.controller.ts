import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserSubjectService } from './user-subject.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserRole } from 'src/enums/role.enum';
import { UserWithSubjectDto } from '@modules/user/dto/user-subject.dto';
import { MyResponse } from 'src/decorators/pagination.decorator';

@Controller('user/subjects')
export class UserSubjectsController {
  constructor(private readonly userSubjectService: UserSubjectService) {}

  @Post()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.STUDENT)
  async associate(@Body() dto: UserWithSubjectDto): Promise<MyResponse<void>> {
    await this.userSubjectService.associateWithSubject(dto);

    return {
      status: HttpStatus.CREATED,
      message: 'Os assuntos foram associados com sucesso.',
    };
  }

  @Delete()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(UserRole.STUDENT)
  async dissociate(@Body() dto: UserWithSubjectDto): Promise<MyResponse<void>> {
    await this.userSubjectService.dissociateWithSubject(dto);

    return {
      status: HttpStatus.OK,
      message: 'Os assuntos foram dissociados com sucesso.',
    };
  }
}
