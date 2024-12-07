import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(LoggerMiddleware.name);
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, originalUrl, method } = req;
    const reqTime = new Date().getTime();
    const userAgent = req.get('user-agent');
    this.logger.log(
      `Request:  ${method} ${originalUrl} from ${ip} - ${userAgent}`,
    );
    res.on('finish', () => {
      const { statusCode } = res;

      const resTime = new Date().getTime();
      this.logger.log(
        `Response: ${method} ${originalUrl} with ${statusCode} - ${resTime - reqTime} ms`,
      );
    });

    next();
  }
}
