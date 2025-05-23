export interface User {
    id: string;
    username: string;
    role: 'admin' | 'user';
    joinedAt: Date;
    email: string;
    password: string;
  }
  