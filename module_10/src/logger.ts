import winston from 'winston'
import morgan, { TokenIndexer } from 'morgan';
import { Request, Response } from 'express';

const obtainLogLevel = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'info';
  }
  if (process.env.NODE_ENV === 'test') {
    return 'debug';
  }
  return 'wrarning';
}
// Create a logger with two transports: one for console output, and one for file output
// export logger to use it all around the app as a single place for all logging operations
export const logger = winston.createLogger({
  level: obtainLogLevel(),
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ]
});



export const requestLogger = morgan(function (tokens: TokenIndexer<Request, Response>, req: Request, res: Response) {
  return [
    `[${tokens.date(req, res)?.slice(0, 25)}]`,
    'INFO',
    tokens.method(req, res),
    tokens.url(req, res),
    '-',
    Math.ceil(Number(tokens['response-time'](req, res))).toString().split('.')[0] + 'ms',
  ].join(' ')
});