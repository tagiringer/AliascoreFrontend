import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client/core";
import { ApolloProvider } from "@apollo/client/react";
import App from "./app/App";

import "./styles/index.css";

const apolloClient = new ApolloClient({
    link: new HttpLink({
        uri: import.meta.env.VITE_GRAPHQL_URL ?? "http://localhost:3000/graphql",
    }),
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);
