import { Attachment } from "@entities/attachments.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>
  ) {}

  async saveFile(file: Express.MulterS3.File) {
    const newFile = new Attachment();
    newFile.fileName = file.key;
    newFile.length = file.size;
    newFile.type = file.mimetype;
    newFile.url = file.location;

    return await this.attachmentRepository.save(newFile);
  }
}