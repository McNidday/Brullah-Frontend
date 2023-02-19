import { Currency } from "dinero.js";
export interface TournamentType {
  id: string;
  start_date: string;
  status: "NOT-STARTED" | "IN-PROGRESS" | "RECONFIGURE" | "DONE";
  reward: "SPONSORED" | "CONTRIBUTED" | "NONE";
  game: { number: number };
  access: {
    type: "PUBLIC" | "SECRET";
    secret: string;
  };
  creator: {
    id: string;
    identity: {
      brullah_name: string;
      avatar: { image: string; blurhash: string };
    };
  };
  winner: {
    id: string;
    identity: {
      brullah_name: string;
      avatar: { image: string; blurhash: string };
    };
  } | null;
  configured: Array<{
    id: string;
    identity: {
      brullah_name: string;
      avatar: {
        image: string;
        blurhash: string;
      };
    };
  }>;
  joined: Array<{
    id: string;
    identity: {
      brullah_name: string;
      avatar: {
        image: string;
        blurhash: string;
      };
    };
  }>;
  information: {
    id: string;
    name: string;
    description: string;
    thumbnail: {
      image: string;
      blurhash: string;
    };
  };
  sponsor: {
    id: string;
    sponsored: boolean;
    balance: {
      value: number;
      currency: Currency;
    };
  };
  contribution: {
    id: string;
    contributed: boolean;
    balance: {
      currency: Currency;
      value: number;
    };
    per_user: {
      currency: Currency;
      value: number;
    };
  };
}
