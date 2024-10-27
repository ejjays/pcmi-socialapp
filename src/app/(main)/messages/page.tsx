"use client"; // This directive allows the use of hooks

import Chat from "./Chat";
import { useState } from "react";
import { metadata } from "./metadata"; // Import the metadata

export default function Page() {
  const [showTopBar, setShowTopBar] = useState(true); // State to control top bar visibility

  return (
    <>
      {showTopBar && <TopBar />} {/* Your top bar component here */}
      <Chat setShowTopBar={setShowTopBar} />
    </>
  );
}