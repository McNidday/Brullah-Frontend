import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const ENDPOINTS: { [key: string]: string } = {
  GetUser: "users",
  GetPublicTournaments: "public/tournaments",
};

const customFetch = (uri: string, options: any) => {
  const { operationName } = JSON.parse(options.body);
  // Get the auth token if present
  const token = localStorage.getItem("token");
  options.headers.Authorization = `Bearer ${token}`;
  return fetch(`${uri}/${ENDPOINTS[operationName]}`, options);
};

const client = new ApolloClient({
  link: new HttpLink({
    fetch: customFetch,
    uri: "http://localhost:8080",
  }),
  cache: new InMemoryCache(),
});

export default client;
