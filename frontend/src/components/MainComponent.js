import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import Table from "./Table";
import CreateInput from "./CreateInput";
import StartButton from "./StartButton";

const MainComponent = (props) => {
  const [pessoas, setPessoas] = useState(null);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchData = async (e) => {
      const result = await axios.get("http://localhost:5000/pessoas");
      setPessoas(result.data);
    };
    fetchData();
    console.log("a");
  }, [flag]);

  return (
    <Fragment>
      <CreateInput setFlag={setFlag} flag={flag} />
      <Table pessoas={pessoas} setFlag={setFlag} flag={flag} />
      <StartButton pessoas={pessoas} />
    </Fragment>
  );
};

export default MainComponent;
