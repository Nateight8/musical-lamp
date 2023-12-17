import gql from "graphql-tag";

const categoryOperations = {
  Query: {
    getAllCategories: gql`
      query GetAllCategory {
        getAllCategory {
          id
          category
          products {
            id
            product
          }
        }
      }
    `,
  },
  Mutation: {
    CreateCategory: gql`
      mutation CreateCategory($category: String) {
        createCategory(category: $category) {
          success
          error
        }
      }
    `,
  },
};

export default categoryOperations;
