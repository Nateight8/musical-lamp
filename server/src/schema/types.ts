import { Prisma, PrismaClient } from "@prisma/client";

export interface GraphqlContext {
  prisma: PrismaClient;
}

// product interface

// Define types for Product model
export interface Product {
  id: string;
  product?: string; // Change this line to make it non-nullable
  categoryId: string | null;
  image: string | null;
}

export interface Category {
  name: string;
}

export interface ProductInput {
  input: {
    product: string;
    stock?: number;
    categoryId?: string;
    category?: string;
    image: string;
    productId: string;
    price: number;
  };
}

// cartegory

export interface CategoryInput {
  category: string;
}

export interface CategoryResponse {
  success?: boolean;
  error?: string;
}
