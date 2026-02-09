import { Request, Response, NextFunction } from "express";
import { admin } from "../config/firebase";

// Extend Express Request type to include user info
declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email: string;
      };
    }
  }
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || "",
    };
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
