import gql from "graphql-tag";

const productOperations = {
  Query: {
    getProducts: gql`
      query GetProducts {
        getProducts {
          id
          product
          stock
        }
      }
    `,
  },

  Mutation: {
    createProduct: gql`
      mutation Mutation($input: ProductInput!) {
        createProduct(input: $input) {
          success
          error
        }
      }
    `,
  },
};

export default productOperations;
