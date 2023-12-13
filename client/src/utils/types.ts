export interface Category {
  id: string;
  category: string;
}

export interface GetAllCategories {
  getAllCategory: Category[];
}

interface Product {
  id: string;
  product: string;
}

export interface GetProducts {
  getProducts: Product[];
}
