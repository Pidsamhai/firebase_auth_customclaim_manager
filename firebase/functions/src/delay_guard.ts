import {Request, Response, NextFunction} from "express";

function delayGuard(ms = 2000):
    (req: Request, res: Response, next: NextFunction)
        => Promise<void> {
  return async (
      req: Request,
      res: Response,
      next: NextFunction
  ): Promise<void> => {
    setTimeout(next, ms);
  };
}

export {delayGuard};
