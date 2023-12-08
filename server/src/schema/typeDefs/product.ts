import gql from "graphql-tag";

const product = gql`
  type Product {
    id: String
    product: String
    categoryId: String
    stock: Int
  }

  input ProductInput {
    product: String
    category: String
    stock: Int
  }

  type Category {
    id: String
    category: String
    products: [Product]
  }

  type Mutation {
    createProduct(input: ProductInput!): CreateProductResponse
  }

  type CreateProductResponse {
    success: Boolean
    error: String
  }

  type Query {
    getProducts: [Product]
    getAvailableProducts: [Product!]!
    getOutOfStockProducts: [Product!]!
  }
`;

export default product;
