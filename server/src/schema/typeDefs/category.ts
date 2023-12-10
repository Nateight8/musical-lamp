import gql from "graphql-tag";

const category = gql`
  type Mutation {
    createCategory(category: String): categoryResponse
    deleteCategory(category: String): categoryResponse
    updateCategory(category: String): categoryResponse
  }

  type Query {
    getAllCategory: [Category]
  }

  type categoryResponse {
    success: Boolean
    error: String
  }
`;

export default category;
