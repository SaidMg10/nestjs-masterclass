import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Upload } from '../upload.entity';
import { Repository } from 'typeorm';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { UploadFile } from '../interfaces/upload-file.interface';
import { ConfigService } from '@nestjs/config';
import { fileTypes } from '../enums/file-types.enums';

@Injectable()
export class UploadsService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Upload)
    private readonly uploadsRepository: Repository<Upload>,
    private readonly uploadToAwsProvider: UploadToAwsProvider,
    private readonly configService: ConfigService,
  ) {
    this.logger = new Logger(UploadsService.name);
  }
  async uploadFile(file: Express.Multer.File) {
    // throw error for unsupported MIME types
    if (
      !['image/gif', 'image/jpeg', 'image/jpg', 'image/png'].includes(
        file.mimetype,
      )
    ) {
      throw new BadRequestException('Mime type not supported');
    }
    try {
      //Upload to the file to aws s3
      const name = await this.uploadToAwsProvider.fileUpload(file);

      // Generate to a new entry in database
      const uploadFile: UploadFile = {
        name,
        path: `https://${this.configService.get('awsCloudfrontURL')}/${name}/`,
        type: fileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };
      const upload = this.uploadsRepository.create(uploadFile);
      return await this.uploadsRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
