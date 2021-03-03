import React from "react"
import Header from "../components/shared/Header/index"
import ChatBox from "../components/ChatBox/index"
import Footer from "../components/shared/Footer/index"

export default function Chat() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Header back={true} style={{ borderBottom: "0.5px solid black" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ChatBox />
        </div>
      </div>
      <Footer style={{ color: "silver" }} />
    </div>
  )
}
