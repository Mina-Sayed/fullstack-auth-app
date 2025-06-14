import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: number;
    let message: string | object;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'object' 
        ? exceptionResponse 
        : { message: exceptionResponse };
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = {
        message: 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && {
          error: exception instanceof Error ? exception.message : String(exception),
        }),
      };
    }

    // Log the error for monitoring
    this.logger.error(
      `HTTP ${status} Error - ${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : exception,
    );

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      ...(typeof message === 'object' ? message : { message }),
    };

    response.status(status).json(errorResponse);
  }
}
