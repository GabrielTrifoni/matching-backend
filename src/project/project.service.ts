import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectService {
  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new Project';
  }

  findAll() {
    return `This action returns all Project`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} Project`;
  }

  remove(id: number) {
    return `This action removes a #${id} Project`;
  }
}
