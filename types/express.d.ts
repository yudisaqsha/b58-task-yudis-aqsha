declare namespace Express {
    export interface Request {
      user?: { userId: number; email: string }; // Adjust according to your JWT payload
    }
  }