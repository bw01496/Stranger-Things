import React, { useState, useEffect } from "react";
import { callApi } from "../util/api";

const Profile = ({ username, profile, setProfile, setUserId, token }) => {
  const [messages, setMessages] = useState([]);
  console.log(token);
  const fetchProfile = async () => {
    const resp = await callApi({
      url: "/users/me",
      token,
    });
    console.log(resp);

    setUserId(resp.data._id);
    setProfile(resp.data);
    setMessages(resp.data.messages);
    console.log(resp.data.messages);
  };
  useEffect(() => {
    try {
      token ? fetchProfile() : null;
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  return (
    <>
      <h1>Profile</h1>

      {username ? <p>You are logged in as {username}</p> : ""}

      <h1 className="message">{profile.username ? profile.username : ""}</h1>
      <h2 className="message">My Messages: </h2>
      {messages.map((item) =>
        profile._id !== item.fromUser._id ? (
          <div className="post" key={item._id}>
            <h2>Title: {item.post.title}</h2>
            <h3>From: {item.fromUser.username}</h3>
            <h4>{item.content}</h4>
          </div>
        ) : null
      )}
    </>
  );
};

export default Profile;
