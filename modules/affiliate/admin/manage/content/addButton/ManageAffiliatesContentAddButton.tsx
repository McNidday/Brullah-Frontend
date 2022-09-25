import { gql, useMutation } from "@apollo/client";
import cn from "classnames";
import styles from "./styles.module.scss";
import Button from "../../../../../../components/Button/Button";
import CircularLoading from "../../../../../../components/CricularLoad/CircularLoading";

interface Props {
  id: String;
}

const ADD_AFFILIATE = gql`
  mutation AddAffiliate($id: ID!) {
    addAffiliate(id: $id)
  }
`;

const ManageAffiliatesContentAddButton = ({ id }: Props) => {
  const [addAffiliate, { data, error, loading }] = useMutation(ADD_AFFILIATE);
  const handleAddAffiliate = () => {
    addAffiliate({
      variables: {
        id,
      },
    });
  };

  if (loading) return <CircularLoading></CircularLoading>;
  if (error) return <p className={cn(styles.text)}>{error.message}</p>;
  if (data?.addAffiliate)
    return <p className={cn(styles.text)}>{data.addAffiliate}</p>;

  return (
    <div className={cn(styles.container)}>
      <Button
        text="Affiliate"
        disabled={false}
        onClick={handleAddAffiliate}
      ></Button>
    </div>
  );
};

export default ManageAffiliatesContentAddButton;
