import gql from "graphql-tag";

const product = gql`
  type Product {
    id: String
    product: String
    categoryId: String
    image: String
    status: ProductStatus
  }

  enum ProductStatus {
    DRAFT
    PENDING_APPROVAL
    ACTIVE
    OUT_OF_STOCK
    DISCONTINUED
    ON_SALE
    COMING_SOON
    FEATURED
    HIDDEN
    ARCHIVED
  }

  input ProductInput {
    product: String
    productId: String
    categoryId: String
    image: String
  }

  type Category {
    id: String
    category: String
    products: [Product]
  }

  type productPageResponse {
    success: Boolean
    error: String
  }

  type Mutation {
    createProduct: CreateProductResponse
    updateProduct(input: ProductInput!): UpdateProductResponse
    deleteProduct(product: String): CreateProductResponse
  }

  type CreateProductResponse {
    productId: String
  }

  type UpdateProductResponse {
    success: Boolean
    error: String
  }

  type Query {
    getProducts: [Product]
    getAvailableProducts: [Product]
    getOutOfStockProducts: [Product]
    getProductsByCategory(category: String!): [Product]
    getProductById(productId: String!): Product
  }
`;

export default product;
