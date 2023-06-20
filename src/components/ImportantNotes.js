import React from "react";
import useDate from "../utils/useDate";

const ImportantNotes = ({ type }) => {
  const dateString = useDate({ type: "Important Notes" });

  return (
    <div>
      <div>{type && type == "summary" ? null : dateString}</div>
    </div>
  );
};

export default ImportantNotes;
