import React, { useEffect, useState } from "react";
import { SuggestedUser, getSuggested } from "./suggestedUsers";

const ShowSuggested = () => {
  const [user, setUser] = useState<SuggestedUser[] | null>(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJuZXd1c2VybmFtZSIsImVtYWlsIjoibm90ZW1haWxAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJGdWxsbmFtZSIsImlhdCI6MTczNTQ1Mjg0NCwiZXhwIjoxNzM1NDk2MDQ0fQ.dg8UHt8B6pQFIs8oG0OYu-app1PAdA0Xq764i5E7PQc"; 

  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const ThreadData = await getSuggested(token);
        setUser(ThreadData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchSuggested();
  }, [setUser]);

  return (
    <>
      <div>
        {user?.map((data) => {
          return (
            <div
              style={{
                borderWidth: "10px",
                borderStyle: "solid",
                borderColor: "black",
                marginTop: "50px",
              }}
            >
              <p>{data.fullName}</p>
              <p>{data.username}</p>
              <p>{data._count.followers} Followers</p>
              <p>{data._count.following} Following</p>
              <img src={data.avatar} width={"200px"} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShowSuggested;
