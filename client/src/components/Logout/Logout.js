import React from "react";
import Button from "@material-ui/core/Button";

export default function Logout({ setToken }) {
  return (
    <div>
      <Button 
        color="inherit" 
        value="Logout" 
        onClick={() => {
          localStorage.clear();
          setToken("")
        }}>
        Logout
      </Button>
    </div>
  );
}