import Head from "next/head";
import { gql, useQuery } from "@apollo/client";

interface Props {
  id: string;
  secret: string;
}

const TOURNAMENT = gql`
  query GetTournament($id: ID!) {
    tournament(id: $id) {
      id
      start_date
      information {
        id
        name
        description
        thumbnail {
          image
          blurhash
        }
      }
      sponsor {
        id
        sponsored
        balance {
          value
          currency
        }
      }
      contribution {
        id
        contributed
        balance {
          currency
          value
        }
        per_user {
          currency
          value
        }
      }
    }
  }
`;

const TournamentIdOg = ({ id, secret }: Props) => {
  const { data, error, loading } = useQuery(TOURNAMENT, {
    variables: { id, secret },
  });
  if (error) {
    return (
      <Head>
        <title>{error.name}</title>
        <meta name="description" content={error.message} />
      </Head>
    );
  }
  return (
    <Head>
      <title>
        {loading ? "..." : `${data.tournament.information.name} | Tournament`}
      </title>
      <meta
        name="description"
        content={loading ? "..." : data.tournament.information.description}
      />
      <meta
        property="og:title"
        content={loading ? "..." : `${data.tournament.information.name}`}
      />
      <meta
        property="og:description"
        content={loading ? "..." : data.tournament.information.description}
      />
      <meta
        property="og:image"
        content={loading ? "..." : data.tournament.information.thumbnail.image}
      />
    </Head>
  );
};

export default TournamentIdOg;
