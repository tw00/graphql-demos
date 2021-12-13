import { Router, Request, Response } from 'express';

export default () => {
  const app = Router();

  // Health Check endpoints
  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).end();
  });

  // Endpont throwing an Error
  app.get('/error', () => {
    throw new Error('I failed');
  });

  // Request to check if server running
  app.get('/ping', (_req: Request, _res: Response) => {
    _res.status(200).json({
      status: 200,
      message: 'Server Connected',
    });
  });

  // Catch 404 and forward to error handler
  app.use((req, _res, next) => {
    console.log('UrlNotFound', { url: req.url });
    next({ status: 404, message: 'not found' });
  });

  // error handlers
  app.use((err, _req, res, next) => {
    res.status(err.status || 500).json({
      errors: {
        message: err.message,
      },
    });
    return next();
  });

  return app;
};
