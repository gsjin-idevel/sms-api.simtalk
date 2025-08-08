import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger} from '@nestjs/common';
import { Response } from 'express';
import {ResponseMessages} from "../enums/reponse-messages";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = ResponseMessages.SERVER_ERROR;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            if (typeof res === 'string') {
                message = res;
            } else if (typeof res === 'object' && res['message']) {
                message = Array.isArray(res['message']) ? res['message'].join(', ') : res['message'];
            }
        }

        // 로그 출력 추가
        this.logger.error(
            `Status: ${status} Message: ${message} Exception: ${
                exception instanceof Error ? exception.stack : JSON.stringify(exception)
            }`,
        );

        response.status(status).json({
            success: false,
            message,
        });
    }
}
