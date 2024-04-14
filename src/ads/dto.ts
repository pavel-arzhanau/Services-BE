export interface IAd {
  id: number;
  userId: number;
  subcategoryId: number;
  title: string;
  description: null | string;
  price: null | number;
}

export interface CreateAdDto {
  userId: number;
  subcategoryId: number;
  title: string;
  description?: null | string;
  price?: null | number;
}
