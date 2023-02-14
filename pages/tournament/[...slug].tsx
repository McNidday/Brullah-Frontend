import type { NextPage } from "next";
import cn from "classnames";
import Footer from "../../components/Footer/Footer";
import ApolloClientOnly from "../../Apollo/ApolloClientOnly";
import TournamentsIdLoading from "../../modules/tournament/[id]/loading/TournamentsIdLoading";
import Navigation from "../../components/Navigation/Navigation";
import TournamentIdMain from "../../modules/tournament/[id]/TournamentIdMain";
import TournamentIdOg from "../../modules/tournament/[id]/TournamentIdOg";
import { useRouter } from "next/router";

const MyTournaments: NextPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className={cn("page-grid")}>
      {router.isReady ? (
        <TournamentIdOg
          id={slug ? (slug[0] ? slug[0] : "") : ""}
          secret={slug ? (slug[1] ? slug[1] : "") : ""}
        ></TournamentIdOg>
      ) : (
        ""
      )}
      <Navigation></Navigation>
      <ApolloClientOnly
        fallback={<TournamentsIdLoading></TournamentsIdLoading>}
      >
        {router.isReady ? (
          <TournamentIdMain
            id={slug ? (slug[0] ? slug[0] : "") : ""}
            secret={slug ? (slug[1] ? slug[1] : "") : ""}
          ></TournamentIdMain>
        ) : (
          ""
        )}
      </ApolloClientOnly>
      <Footer></Footer>
    </div>
  );
};

export default MyTournaments;
