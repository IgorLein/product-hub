import { NextFunction, Request, Response } from 'express';

type AppError = Error & {
  status?: number;
};

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
}
