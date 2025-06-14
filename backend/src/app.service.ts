import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      message: 'Welcome to EasyGen Authentication API!',
      version: '1.0.0',
      docs: 'http://localhost:3001/api/docs',
      endpoints: {
        auth: {
          signup: 'POST /auth/signup',
          signin: 'POST /auth/signin',
          profile: 'GET /auth/profile (protected)',
        },
      },
    };
  }
}
