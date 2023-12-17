import gql from "graphql-tag";

const productOperations = {
  Query: {
    getProducts: gql`
      query GetProducts {
        getProducts {
          id
          product
          stock
          image
        }
      }
    `,
  },

  Mutation: {
    createProduct: gql`
      mutation CreateProduct {
        createProduct {
          productId
        }
      }
    `,

    updateProduct: gql`
      mutation UpdateProduct($input: ProductInput!) {
        updateProduct(input: $input) {
          success
          error
        }
      }
    `,
  },
};

export default productOperations;
