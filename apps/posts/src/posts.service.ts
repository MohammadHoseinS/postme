import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
