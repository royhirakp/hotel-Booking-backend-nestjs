import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class ClodinaryService {
  constructor() {
    v2.config({
      cloud_name: 'diaks6jaa',
      api_key: '988398948338274',
      api_secret: '_wn4d3AG-seq_AptjaCHB29wk8o',
    });
  }
  async uploadImage(
    filePath: string,
  ): Promise<UploadApiErrorResponse | UploadApiResponse> {
    return new Promise((resolved, reject) => {
      v2.uploader.upload(
        filePath,
        { folder: 'rajanikanth' },
        (error, result) => {
          if (error) return reject(error);
          resolved(result);
        },
      );
    });
  }
}
