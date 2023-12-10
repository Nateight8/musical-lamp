import { Prisma } from "@prisma/client";
import { CategoryInput, CategoryResponse, GraphqlContext } from "../types";

const category = {
  Query: {
    getAllCategory: async (_: any, __: any, context: GraphqlContext) => {
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

        const cartNameExist = await prisma.category.findUnique({
          where: { category: category.toLowerCase() },
        });

        if (cartNameExist) {
          return {
            error:
              "Category already exists. Please choose a different name or check for typos.",
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

        // Check if it's a known error, e.g., due to database constraints
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return { error: `Error deleting category: ${error.message}` };
        }

        return { error: "Unexpected error deleting category" };
      }
    },

    deleteCategory: async (
      _: any,
      args: { category: string },
      context: GraphqlContext
    ): Promise<CategoryResponse> => {
      const { prisma } = context;
      const { category } = args;

      try {
        const categoryExists = await prisma.category.findFirst({
          where: { category },
        });

        if (!categoryExists) {
          return {
            error: "Category not found or may have already been deleted",
          };
        }

        await prisma.category.delete({
          where: { id: categoryExists.id },
          include: {
            products: {
              where: {
                categoryId: categoryExists.id,
              },
            },
          },
        });

        return { success: true };
      } catch (error) {
        console.error(error);

        // Check if it's a known error, e.g., due to database constraints
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return { error: `Error deleting category: ${error.message}` };
        }

        return { error: "Unexpected error deleting category" };
      }
    },

    updateCategory: async (
      _: any,
      args: { category: string },
      context: GraphqlContext
    ): Promise<CategoryResponse> => {
      const { prisma } = context;
      const { category } = args;

      try {
        const categoryExists = await prisma.category.findFirst({
          where: { category },
        });

        if (!categoryExists) {
          return {
            error: "Category not found or may have already been deleted",
          };
        }

        await prisma.category.update({
          data: {
            category,
          },
          where: {
            id: categoryExists.id,
          },
        });

        return { success: true };
      } catch (error) {
        console.error(error);

        // Check if it's a known error, e.g., due to database constraints
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          return { error: `Error deleting category: ${error.message}` };
        }

        return { error: "Unexpected error deleting category" };
      }
    },
  },
  //   Subscription: {},
};

export default category;
