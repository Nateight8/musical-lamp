import { Prisma } from "@prisma/client";
import { GraphqlContext, Product, ProductInput } from "../types";

const product = {
  Query: {
    getProducts: async (
      _: any,
      __: any,
      context: GraphqlContext
    ): Promise<Product[] | null> => {
      const { prisma } = context;

      try {
        return await prisma.product.findMany();
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    getProductsByCategory: async (
      _: any,
      args: { category: string },
      context: GraphqlContext
    ) => {
      // : Promise<Product[] | null>
      const { prisma } = context;
      const { category } = args;

      try {
        const cateoryExist = await prisma.category.findFirst({
          where: { category: category.toString() },
        });

        if (!cateoryExist) {
          throw new Error("Category does not exist");
        }

        return await prisma.product.findMany({
          where: {
            categoryId: cateoryExist.id,
          },
        });
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    // available product
    getAvailableProducts: async (
      _: any,
      __: any,
      context: GraphqlContext
    ): Promise<Product[] | null> => {
      const { prisma } = context;
      try {
        return await prisma.product.findMany({
          where: {
            stock: {
              not: 0,
            },
          },
        });
      } catch (error) {
        return null;
      }
    },
    //out product
    getOutOfStockProducts: async (
      _: any,
      __: any,
      context: GraphqlContext
    ): Promise<Product[] | null> => {
      const { prisma } = context;
      try {
        return await prisma.product.findMany({
          where: {
            stock: {
              equals: 0,
            },
          },
        });
      } catch (error) {
        return null;
      }
    },
  },
  Mutation: {
    createProduct: async (
      _: any,
      args: ProductInput,
      context: GraphqlContext
    ): Promise<{ success?: boolean; error?: string }> => {
      const { prisma } = context;

      const {
        input: { category, product, stock },
      } = args;

      try {
        // check if category exists first
        const categoryExist = await prisma.category.findUnique({
          where: { category },
        });

        if (!categoryExist) {
          return {
            error: "category doesnt exist",
          };
        }

        await prisma.product.create({
          data: {
            product,
            categoryId: categoryExist.id,
            stock,
          },
        });

        return {
          success: true,
        };
      } catch (error) {
        console.error(error);
        return {
          error: "An error occurred while creating the product.",
        };
      }
    },

    deleteProduct: async (
      _: any,
      args: { product: string },
      context: GraphqlContext
    ): Promise<{ success?: boolean; error?: string }> => {
      const { prisma } = context;
      const { product } = args;

      try {
        const productExist = await prisma.product.findFirst({
          where: { product },
        });

        if (!productExist) {
          return { error: "Product not found" };
        }

        await prisma.product.delete({
          where: {
            id: productExist?.id,
          },
        });

        return { success: true };
      } catch (error) {
        console.error(error);

        // Check if it's a known error, e.g., due to database constraints
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return { error: `Error deleting product: ${error.message}` };
        }

        return { error: "Unexpected error product category" };
      }
    },
  },
  //   Subscription: {},
};

export default product;
