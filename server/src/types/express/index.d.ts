export {}

declare global {
  namespace Express {
    export interface Request {
      user: {
        _id: string
        role: string
        user_name: string
        email: string
      }
    }
  }
}
