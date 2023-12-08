import gql from "graphql-tag";

const category = gql`
  type Mutation {
    createCategory(category: String): createCatRes
  }

  type Query {
    getCategory: [Category]
  }

  type createCatRes {
    success: Boolean
    error: String
  }
`;

export default category;
