import { Response, Request, NextFunction } from "express";
import { adminApp } from "./firebase";

const firebaseAuthGuard = async (req: Request, res: Response, next: NextFunction) => {
    /**
     * Bypass Auth in root path
     */
    if (req.path == '/') {
        next();
        return;
    }

    try {
        const token = req.headers.authorization?.split(" ")[1]!;
        await adminApp.auth().verifyIdToken(token);
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" })
    }

}

export default firebaseAuthGuard;