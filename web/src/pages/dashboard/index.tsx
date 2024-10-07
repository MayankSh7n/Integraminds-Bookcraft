import Editor from "@/Components/Editor";
import { useAuth } from "@/utils/authContext";
import React from "react";
import LoginPage from "../login";

const SamplePage = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>

    {/* IF USER IS LOGIN THEN ONLY VISIT TO DASHBOARD */}
        {/* {isLoggedIn && <Editor />}{
          !isLoggedIn && <LoginPage/> 
        } */}
{/* REDIRECT TO EDITOR */}
      <Editor/>

    </>
  );
};

export default SamplePage;
