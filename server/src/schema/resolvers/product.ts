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
        const products = await prisma.product.findMany();

        return products;
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
    // ou product
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
      // const { categoryId, name } = input;
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
        // console.log(categoryId, name);
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
  },
  //   Subscription: {},
};

export default product;
