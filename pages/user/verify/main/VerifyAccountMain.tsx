import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useCallback } from "react";
import VerifyAccountError from "./error/VerifyAccountError";
import VerifyAccountLoading from "./loading/VerifyAccountLoading";
import VerifyAccountSuccess from "./success/VerifyAccountSuccess";

const VERIFY_ACCOUNT = gql`
  mutation VerifyAccount($token: String!) {
    verifyAccount(token: $token) {
      id
      identity {
        email
        arena_name
      }
    }
  }
`;

const VerifyAccountMain = () => {
  const router = useRouter();
  const [verify, { data, error, loading, called }] =
    useMutation(VERIFY_ACCOUNT);

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      verify({ variables: { token: token || "" } });
    }
  }, [router.isReady, router.query, verify]);

  if (loading || !router.isReady || !called)
    return <VerifyAccountLoading></VerifyAccountLoading>;
  if (error) return <VerifyAccountError error={error}></VerifyAccountError>;
  return (
    <VerifyAccountSuccess
      identity={data.verifyAccount.identity}
    ></VerifyAccountSuccess>
  );
};

export default VerifyAccountMain;
