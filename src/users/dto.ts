export interface IUser {
  id: number;
  name: string;
  email: string | null;
  phone: string;
  password: string;
  photo: Buffer | null;
  rating: number | null;
  description: string | null;
}

export interface CreateUserDto {
  name: string;
  phone: string;
  password: string;
}
