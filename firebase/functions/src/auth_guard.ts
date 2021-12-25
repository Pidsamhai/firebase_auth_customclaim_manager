import {Response, Request, NextFunction} from "express";
import {adminApp} from "./firebase";

const authGuard = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
  /**
     * Bypass Auth in root path
     */
  if (req.path == "/") {
    next();
    return;
  }

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw Error("Canot get Auth token");
    await adminApp.auth().verifyIdToken(token);
    next();
  } catch (error) {
    res.status(401).json({message: "Unauthorized"});
  }
};

export default authGuard;
