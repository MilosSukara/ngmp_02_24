import { Request, Response } from "express";

export const indexController = {
  health: (_req: Request, res: Response) => {
    res.status(200).json({
      message: 'Application is healthy'
    });
  }
}