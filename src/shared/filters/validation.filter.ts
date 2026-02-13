import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const validationErrors = exception.validationErrors.map((e) => {
      return {
        property: e.property,
        children: e.children,
        constraints: e.constraints,
      };
    });

    const error = this.formatError(exception.validationErrors);

    return response.status(400).json({
      statusCode: 400,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: 'ValidationException',
      message: error,
      validationMetadata: validationErrors,
    });
  }

  private formatError(errors: any[]) {
    return errors.map((err) => {
      for (let property in err.constraints) {
        return err.constraints[property];
      }
    });
  }
}
