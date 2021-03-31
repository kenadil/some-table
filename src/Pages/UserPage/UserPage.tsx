import { Button } from "antd";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const UserPage = () => {
  let { id } = useParams<any>();
  return (
    <>
      <img
        src="https://media1.tenor.com/images/fef429ff8de673e69a78969ced77ffcd/tenor.gif?itemid=19407001"
        alt="you shouldn't have come here"
      />
      <h3>You shouldn't have come here, User {id}</h3>
      <Link to="/users">
        <Button type="primary">Go back</Button>
      </Link>
    </>
  );
};

export default UserPage;
