import gql from "graphql-tag";

const productOperations = {
  Query: {
    getProducts: gql`
      query GetProducts {
        getProducts {
          id
          product
          image
          status
          category
          price
          stock
        }
      }
    `,

    getProductsById: gql`
      query GetProductById($productId: String!) {
        getProductById(productId: $productId) {
          product
          categoryId
          image
          status
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
