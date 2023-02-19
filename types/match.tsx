export interface MatchType {
  id: string;
  match_number: number;
  time?: string;
  status: "NOT-STARTED" | "IN-ZONE" | "IN-PROGRESS" | "DONE";
  slot_one?: {
    reason?: string;
    joined: boolean;
    winner: boolean;
    user: {
      id: string;
      identity: {
        brullah_name: string;
        avatar: {
          blurhash: string;
          image: string;
        };
      };
    };
  };
  slot_two?: {
    winner: boolean;
    joined: boolean;
    reason?: string;
    user: {
      id: string;
      identity: {
        brullah_name: string;
        avatar: {
          blurhash: string;
          image: string;
        };
      };
    };
  };
  bye_slot?: {
    reason?: string;
    user: {
      id: string;
      identity: {
        brullah_name: string;
        avatar: {
          blurhash: string;
          image: string;
        };
      };
    };
  };
}
