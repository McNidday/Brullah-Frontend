import { NextPage } from "next";
import { useRouter } from "next/router";

const TrackTournament: NextPage = () => {
  const router = useRouter();
  return <div>Tracking the tournament bitch {router.query.id}</div>;
};

export default TrackTournament;
