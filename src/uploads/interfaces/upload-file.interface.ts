import { fileTypes } from '../enums/file-types.enums';

export interface UploadFile {
  name: string;
  path: string;
  type: fileTypes;
  mime: string;
  size: number;
}
