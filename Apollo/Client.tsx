import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import Cookies from "../functions/Cookies";

const ENDPOINTS: { [key: string]: string } = {
  GetUser: "users",
  GetPublicTournaments: "public/tournaments",
  CreateUser: "auth",
  UserLogin: "auth",
  ResetPassword: "auth",
  VerifyPasswordReset: "auth",
  VerifyAccount: "auth",
  UpdateUser: "users",
  CreateTournament: "tournaments",
  PaypalDepositOrder: "payments",
  CapturePaypalDepositOrder: "payments",
  CurrencyExchange: "payments",
  PaypalPayoutOrder: "payments",
  PayoutOrderStatus: "payments",
  GetGameTransactions: "payments",
  PaypalDepositTransactions: "payments",
  PaypalPayoutTransactions: "payments",
  TournamentTransactions: "payments",
  GetMyTournaments: "tournaments",
  GetTournament: "public/tournaments",
  AddToMatch: "matches",
  SaveMatchConfig: "matches",
  PublishMatchConfig: "matches",
  JoinedNotStartedMatches: "matches",
  UserOngoingMatches: "matches",
  RemoveFromMatch: "matches",
  LikeCreator: "likes",
  UnLikeCreator: "likes",
  CheckLike: "likes",
  GetAffiliates: "affiliates",
  GetNonAffiliates: "affiliates",
  AddAffiliate: "affiliates",
  RemoveAffiliate: "affiliates",
  GetEnlisted: "affiliates",
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
  const token = Cookies("token");
  options.headers.Authorization = `Bearer ${token}`;
  return fetch(`${uri}/${ENDPOINTS[operationName]}`, options);
};

const uploadLink = createUploadLink({
  fetch: customFetch,
  uri: process.env.RELAY_API_ENDPOINT,
});

const pageLimitPaginationHelper: () => any = () => {
  return {
    read(existing: any, { args: { page = 1, limit = 10 } }: any) {
      // A read function should always return undefined if existing is
      // undefined. Returning undefined signals that the field is
      // missing from the cache, which instructs Apollo Client to
      // fetch its value from your GraphQL server.
      if (!existing || existing.page < page) return undefined;
      const offset = (page - 1) * limit;
      const docs = existing ? existing.docs.slice(0, offset + limit) : [];
      return { ...existing, docs: docs };
    },
    merge: (
      existing: any,
      incoming: any,
      { args: { page = 1, limit = 10 } }: any
    ) => {
      const offset = (page - 1) * limit;
      const merged = existing ? existing.docs.slice(0) : [];
      for (let i = 0; i < incoming.docs.length; i++) {
        merged[offset + i] = incoming.docs[i];
      }
      return { ...incoming, docs: merged };
    },
  };
};

const cache = new InMemoryCache({
  typePolicies: {
    TournamentInformation: { keyFields: ["thumbnail", ["image"]] },
    UserIdentity: { keyFields: ["arena_name"] },
    Query: {
      fields: {
        tournaments: { ...pageLimitPaginationHelper(), keyArgs: ["search"] },
        myTournaments: {
          ...pageLimitPaginationHelper(),
          keyArgs: ["id", "search"],
        },
        joinedMatches: {
          ...pageLimitPaginationHelper(),
          keyArgs: ["progress"],
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: uploadLink as unknown as ApolloLink,
  cache: cache,
});

export default client;
