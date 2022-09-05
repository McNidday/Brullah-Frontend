import { gql, useMutation } from "@apollo/client";
import cn from "classnames";
import styles from "./styles.module.scss";
import Button from "../../../../../../components/Button/Button";
import CircularLoading from "../../../../../../components/CricularLoad/CircularLoading";

interface Props {
  id: String;
}

const REMOVE_AFFILIATE = gql`
  mutation RemoveAffiliate($id: ID!) {
    removeAffiliate(id: $id)
  }
`;

const ViewAffiliatesContentRemoveButton = ({ id }: Props) => {
  const [removeAffiliate, { data, error, loading }] =
    useMutation(REMOVE_AFFILIATE);
  const handleRemoveAffiliate = () => {
    removeAffiliate({
      variables: {
        id,
      },
    });
  };

  if (loading) return <CircularLoading></CircularLoading>;
  if (error) return <p className={cn(styles.text)}>{error.message}</p>;
  if (data?.removeAffiliate)
    return <p className={cn(styles.text)}>Non Affiliate</p>;

  return (
    <div className={cn(styles.container)}>
      <Button
        text="UnAffiliate"
        disabled={false}
        onClick={handleRemoveAffiliate}
      ></Button>
    </div>
  );
};

export default ViewAffiliatesContentRemoveButton;
