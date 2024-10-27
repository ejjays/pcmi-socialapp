"use client"; // Add this directive at the top

import { Metadata } from "next";
import Chat from "./Chat";
import { useState } from "react"; // This import is now valid

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