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
  status: ProductStatus;
  categoryId: string;
}

// function name({ status }: Product) {
//   status:ProductStatus.;
// }

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

// "getProductById": {
//         "product": "Gucci Back back for men 2023",
//         "categoryId": "clq7lqy3z00001zsx2azumfvn",
//         "image": "https://musical-lamb-local.s3.us-east-1.amazonaws.com/clq8vrv6j0000nsaay81lh5id",
//         "status": "ACTIVE",
//         "__typename": "Product"
//     }
