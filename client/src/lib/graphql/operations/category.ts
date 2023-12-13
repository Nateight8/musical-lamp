import gql from "graphql-tag";

const categoryOperations = {
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
