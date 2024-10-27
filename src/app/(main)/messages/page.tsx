import { Metadata } from "next";
import Chat from "./Chat";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Messages",
};

export default function Page() {
  const [showTopBar, setShowTopBar] = useState(true); // State to control top bar visibility

  return (
    <>
      {showTopBar && <TopBar />} {/* Your top bar component here */}
      <Chat setShowTopBar={setShowTopBar} />
    </>
  );
}