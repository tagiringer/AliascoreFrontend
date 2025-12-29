// src/graphql/client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: import.meta.env.VITE_GRAPHQL_URL ?? "http://localhost:3000/graphql",
        // If you use cookies (session auth), enable:
        // credentials: "include",
    }),
    cache: new InMemoryCache(),
});
