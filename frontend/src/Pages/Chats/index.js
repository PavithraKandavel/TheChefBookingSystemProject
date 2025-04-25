/** @format */

import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Paper } from "@mui/material";

import { getApihandler, postApihandler } from "../../Apihandler";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header";

export default function Chats() {
  const { id } = useParams();
  console.log("ID from URL:", id);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [role, setRole] = useState(localStorage.getItem("check") || "");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const loggedInUserId = userData?._id;
const [userId,setUserId] = useState("")
const [chefId,setChefId] = useState("")
const [senderType,setSenderType] = useState("")
  useEffect(()=>{
       // Determine user or chef
  if (role === "user") {
    setUserId(loggedInUserId);
    setChefId(id); // Get chef ID from params
    setSenderType("user");
  } else if (role === "chef") {
    setChefId(loggedInUserId);
    setUserId(id); // Get user ID from params
    setSenderType("chef");
  }
  },[])
  

  const handleSend = async () => {
    if (!message.trim()) return; // Prevent empty messages

    // Ensure both IDs exist before sending a message
    if (!userId || !chefId) {
      console.error("User ID or chef ID is missing.");
      return;
    }

    const data = {
      user_Id:userId,
      chef_Id:chefId,
      senderType:senderType,
      messageText: message,
    };

    try {
      const res = await postApihandler("/sendMessage", data);
      console.log("Message API response:", res);

      if (res.message === "Message sent successfully.") {
        getMessage();
        setMessage(""); // Clear input after successful send
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Fetch messages when component loads
  useEffect(() => {
    getMessage();
  }, [userId, chefId]);

  const getMessage = async () => {
    if (!userId || !chefId) return;
    try {
      const res = await getApihandler(
        `/getMessages?user_Id=${userId}&chef_Id=${chefId}`
      );
      if (res.message === "Messages retrieved successfully.") {
        setMessages(res.data);
      }
      console.log("Get message API response:", res);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {/* <Header /> */}
      <Header/>
      <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}>
        <Paper sx={{ padding: "30px", borderRadius: "20px", boxShadow: 3 }}>
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Chat</h2>

          <div
            className="message-container"
            style={{
              height: "400px",
              overflowY: "auto",
              marginBottom: "20px",
              borderRadius: "10px",
              padding: "10px",
              backgroundColor: "#fafafa",
              boxShadow: "inset 0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {messages.map((msg, index) => {
              const isCurrentUserMessage = msg.senderType === senderType;

              return (
                <Box
                  key={index}
                  className="message-box"
                  style={{
                    display: "flex",
                    justifyContent: isCurrentUserMessage ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <Box
                    style={{
                      maxWidth: "75%",
                      padding: "12px",
                      borderRadius: "15px",
                      backgroundColor: isCurrentUserMessage ? "#009688" : "#3F51B5",
                      color: "white",
                      wordWrap: "break-word",
                      fontSize: "14px",
                    }}
                  >
                    {msg.messageText}
                  </Box>
                </Box>
              );
            })}
          </div>

          <Box className="d-flex" sx={{ alignItems: "center" }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{
                backgroundColor: "#fff",
                borderRadius: "20px",
                marginRight: "10px",
                boxShadow: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "20px",
                },
              }}
              placeholder="Type a message..."
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSend}
              sx={{
                padding: "10px 20px",
                borderRadius: "20px",
                backgroundColor: "#2196F3",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1976D2",
                },
              }}
            >
              Send
            </Button>
          </Box>
        </Paper>
      </Box>
      {/* <Footer /> */}
    </div>
  );
}
