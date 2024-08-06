import { Alert, Snackbar } from "@mui/material";
import React from "react";

const useShowToast = () => {
  return (
    <div>
      <Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          This is a success message! 
        </Alert>
      </Snackbar>
    </div>
  );
};

export default useShowToast;
