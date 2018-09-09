/**
 * healthcheck-middleware
 * 
 * exports factory function to create healthcheckMiddleware
 * 
 * usage: 
 * 
 * const { factory as healthcheckFactory } from '@bendigi/healthcheck-middleware';
 * app.use(healtcheckFactory('/my-health-endpoint', 'my custom response'));
 */
import { NextFunction, Request, Response } from 'express';

/**
 * factory
 * 
 * @param {string} url endpoint of the health check
 * @param {any} response response to send on success
 */
export const factory = (
  url: string = '/health',
  message: any = {
    'feeling fine': 'since 2009',
  },
) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.url === url) {
    res.status(200).send(message);
  } else {
    next();
  }
};
