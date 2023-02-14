export interface MatchType {
  id: string;
  match_number: number;
  time?: string;
  slot_one?: {
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
