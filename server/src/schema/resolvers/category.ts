import { CategoryInput, GraphqlContext, Product, ProductInput } from "../types";

const category = {
  Query: {
    getCategory: async (_: any, __: any, context: GraphqlContext) => {
      const { prisma } = context;

      try {
        return await prisma.category.findMany();
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createCategory: async (
      _: any,
      args: CategoryInput,
      context: GraphqlContext
    ): Promise<{ success?: boolean; error?: string }> => {
      const { prisma } = context;
      const { category } = args;

      try {
        //  check if categry exist

        const cartExist = await prisma.category.findUnique({
          where: { category: category.toLocaleLowerCase() },
        });

        if (cartExist) {
          return {
            error: "Cartegory exists",
          };
        }

        await prisma.category.create({
          data: {
            category,
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

export default category;
