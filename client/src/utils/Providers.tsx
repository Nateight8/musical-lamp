import { ApolloWrapper } from "@/lib/graphql/ApolloWraper";
import { PropsWithChildren } from "react";

function Providers({ children }: PropsWithChildren) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}

export default Providers;
