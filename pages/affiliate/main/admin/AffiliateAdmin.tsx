import { useState } from "react";
import ManageAffiliates from "./manage/ManageAffiliates";
import ViewAffiliates from "./view/ViewAffiliates";

const AffiliateAdmin = () => {
  const [view, setView] = useState<"manage" | "view">("manage");
  const handleChangeView = () => {
    if (view === "manage") {
      setView("view");
    } else {
      setView("manage");
    }
  };

  return view === "view" ? (
    <ViewAffiliates handleChangeView={handleChangeView}></ViewAffiliates>
  ) : (
    <ManageAffiliates handleChangeView={handleChangeView}></ManageAffiliates>
  );
};

export default AffiliateAdmin;
