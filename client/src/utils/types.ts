export enum ProductStatus {
  DRAFT = "DRAFT",
  PENDNG = "PENDING",
  ACTIVE = "ACTIVE",
  // OUT_OF_STOCK,
  // DISCOUNT,
  // ON_SALE,
  // COMING_SOON,
  // FEATURED,
  // HIDDEN,
  // ARCHIEVED,
}

export interface Category {
  id: string;
  category: string;
}

export interface GetAllCategories {
  getAllCategory: Category[];
}

export interface Product {
  id: string;
  product: string;
  image: string;
  sales: string;
  // status: "DRAFT" | "PENDING" | "ACTIVE";
  status: string;
  categoryId: string;
  category?: string;
  price?: string;
  stock?: number | string;
  sku?: string;
}

export interface GetProducts {
  getProducts: Product[];
}

export interface CreateProductMutation {
  createProduct: {
    productId: string;
  };
}

export interface ProductById {
  getProductById: Product;
}
