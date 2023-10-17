import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

export const ValidationMiddleware = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.array.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ erros: errors.array() });
  };
};
