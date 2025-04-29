import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, HttpException, NotFoundException } from '@nestjs/common';
import { errorResponse } from '../utils/response.utils';

@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Tùy chỉnh response cho lỗi 404
    // if (exception instanceof NotFoundException) {
    //   response.status(status).json({
    //     success: false,
    //     status: status,
    //     message: 'API not found',
    //     error: exceptionResponse,
    //     timestamp: new Date().toISOString(),
    //   });
    //   return;
    // }

    // Xử lý các lỗi khác (ví dụ như không pass validate trong dto)
    const responseJson = errorResponse({
      error: exceptionResponse,
      message: `Internal server error: ${exceptionResponse['message'] || exceptionResponse}`,
    })
    response.status(status).json(responseJson);
  }
}