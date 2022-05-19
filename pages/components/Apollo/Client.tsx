import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const ENDPOINTS: { [key: string]: string } = {
  GetUser: "users",
  GetPublicTournaments: "public/tournaments",
  CreateUser: "auth",
  UserLogin: "auth",
  CreateTournament: "tournaments",
  PaypalDepositOrder: "payments",
  CapturePaypalDepositOrder: "payments",
  CurrencyExchange: "payments",
};

const customFetch = (uri: string, options: any) => {
  let operationName;
  if (options.body instanceof FormData) {
    for (let pair of options.body.entries()) {
      if (pair[0] === "operations") {
        operationName = JSON.parse(pair[1]).operationName;
      }
    }
  } else {
    operationName = JSON.parse(options.body).operationName;
  }
  // Get the auth token if present
  const token = localStorage.getItem("token");
  options.headers.Authorization = `Bearer ${token}`;
  return fetch(`${uri}/${ENDPOINTS[operationName]}`, options);
};

const uploadLink = createUploadLink({
  fetch: customFetch,
  uri: "http://localhost:8080",
});

const client = new ApolloClient({
  link: uploadLink as unknown as ApolloLink,
  cache: new InMemoryCache(),
});

export default client;
