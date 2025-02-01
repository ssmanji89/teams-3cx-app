/*
  Backend server to simulate 3CX API endpoints.
  Provides endpoints for:
   - Retrieving user extension info (based on Microsoft 365 user data)
   - Initiating calls
   - Retrieving call status/logs
   - Executing call control actions (hold, transfer, voicemail)
*/

const express = require("express");
const axios = require("axios");
const config = require("../config/config.json");

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

/**
 * Simulated endpoint to get user extension information.
 * In a production environment, this would synchronize with Microsoft 365 and 3CX.
 */
app.get("/api/user-extension/:userId", (req, res) => {
  const userId = req.params.userId;
  // Simulate user extension info; in a real system, query 3CX or a database
  res.json({
    userId,
    extension: "101",
    displayName: "John Doe"
  });
});

/**
 * Endpoint to initiate a call.
 * Expects a JSON body with "from" and "to" fields.
 */
app.post("/api/call", (req, res) => {
  const { from, to } = req.body;
  console.log(`Call initiation: from ${from} to ${to}`);
  // In a real implementation, call the 3CX API here
  res.json({
    status: "initiated",
    callId: "abc123"
  });
});

/**
 * Endpoint to retrieve call status and logs.
 * Expects a callId parameter.
 */
app.get("/api/call-status/:callId", (req, res) => {
  const callId = req.params.callId;
  // Simulated call status information
  res.json({
    callId,
    status: "active",
    logs: [
      "Call initiated",
      "Connecting to 3CX",
      "Call connected"
    ]
  });
});

/**
 * Endpoint for call control actions (e.g., hold, transfer, voicemail).
 * Expects a JSON body with "callId", "action", and optionally "target".
 */
app.post("/api/call-control", (req, res) => {
  const { callId, action, target } = req.body;
  console.log(`Call control: ${action} on call ${callId}${target ? " to " + target : ""}`);
  // Simulate a successful call control action
  res.json({
    callId,
    action,
    status: "success"
  });
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});
module.exports = app;
