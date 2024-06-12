import 'dotenv/config';
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';

interface ValidationErrorResponse {
  status: HttpStatus.BAD_REQUEST;
  message: Array<{ property: string; message: string }>;
  error: string;
}

@Catch(ConflictException, BadRequestException, NotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const devErrorResponse: any = {
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error: exception?.name,
      message: exception?.message,
    };

    const prodErrorResponse: any = {
      status,
      message,
    };
    this.logger.log(
      `Request method: ${request.method} Request url${request.url}`,
      JSON.stringify(devErrorResponse),
    );

    if (exception instanceof BadRequestException) {
      const response = exception.getResponse() as ValidationErrorResponse;
      devErrorResponse.message = response.message;
      prodErrorResponse.message = response.message;
    }

    response
      .status(status)
      .json(
        process.env.NODE_ENV === 'development'
          ? devErrorResponse
          : prodErrorResponse,
      );
  }
}
