/*
  Simple React-based Microsoft Teams application.
  Allows users to sign in (simulated), view extension info, and initiate calls.
  In production, Microsoft 365 OAuth flow will replace the simulated sign in.
*/
import React, { useState } from "react";
import axios from "axios";

const TeamsApp = () => {
  const [userId, setUserId] = useState("");
  const [extensionInfo, setExtensionInfo] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [callStatus, setCallStatus] = useState(null);

  const handleSignIn = async () => {
    try {
      const response = await axios.get(`/api/user-extension/${userId}`);
      setExtensionInfo(response.data);
    } catch (error) {
      console.error("Error fetching extension info", error);
    }
  };

  const handleCall = async () => {
    try {
      const response = await axios.post("/api/call", { from, to });
      setCallStatus(response.data);
    } catch (error) {
      console.error("Error initiating call", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Teams 3CX App</h1>
      <div>
        <h2>Sign In</h2>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={handleSignIn}>Sign In</button>
        {extensionInfo && (
          <div>
            <p>Extension: {extensionInfo.extension}</p>
            <p>Display Name: {extensionInfo.displayName}</p>
          </div>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <h2>Initiate Call</h2>
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <button onClick={handleCall}>Call</button>
        {callStatus && (
          <div>
            <p>Status: {callStatus.status}</p>
            <p>Call ID: {callStatus.callId}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamsApp;
