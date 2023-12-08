import { withFilter } from "graphql-subscriptions";
import merge from "lodash.merge";
import product from "./product";
import cartegory from "./category";

const resolvers = merge({}, product, cartegory);

export default resolvers;
