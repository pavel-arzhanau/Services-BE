export interface ICategory {
  id: number;
  name: string;
  subcategories: ISubcategory[];
}

export interface ISubcategory {
  id: number;
  name: string;
}
