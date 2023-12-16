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
  image: string;
}

export interface GetProducts {
  getProducts: Product[];
}
