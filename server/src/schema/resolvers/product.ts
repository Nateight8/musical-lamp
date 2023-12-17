import { Prisma } from "@prisma/client";
import { GraphqlContext, Product, ProductInput } from "../types";

const product = {
  Query: {
    getProducts: async (_: any, __: any, context: GraphqlContext) => {
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
      // try {
      //   return await prisma.product.findMany({
      //     where: {
      //       stock: {
      //         not: 0,
      //       },
      //     },
      //   });
      // } catch (error) {
      //   return null;
      // }

      return null;
    },
    //out product
    getOutOfStockProducts: async (
      _: any,
      __: any,
      context: GraphqlContext
    ): Promise<Product[] | null> => {
      const { prisma } = context;
      // try {
      //   return await prisma.product.findMany({
      //     where: {
      //       stock: {
      //         equals: 0,
      //       },
      //     },
      //   });
      // } catch (error) {
      //   return null;
      // }

      return null;
    },
  },
  Mutation: {
    createProduct: async (
      _: any,
      __: any,
      context: GraphqlContext
    ): Promise<{ productId: string | null }> => {
      const { prisma } = context;

      try {
        const product = await prisma.product.create({
          data: {
            image: "",
            product: "",
          },
        });

        return { productId: product.id };
      } catch (error) {
        console.log(error);
        return { productId: null };
      }
    },

    updateProduct: async (
      _: any,
      args: ProductInput,
      context: GraphqlContext
    ): Promise<{ success?: boolean; error?: string }> => {
      const { prisma } = context;
      const { image, product, categoryId, productId } = args.input;
      try {
        await prisma.product.update({
          where: { id: productId },
          data: {
            product,
            image,
            categoryId,
          },
        });

        return { success: true };
      } catch (error) {
        console.log(error);
        return { error: "" };
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
