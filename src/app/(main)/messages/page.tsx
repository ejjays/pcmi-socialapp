"use client"; // This directive allows the use of hooks

import Chat from "./Chat";
import { useState } from "react";
import { metadata } from "./metadata"; // Import the metadata

export default function Page() {
  const [showTopBar, setShowTopBar] = useState(true); // State to control visibility

  return (
    <>
      {/* Remove the TopBar reference since it doesn't exist */}
      <Chat setShowTopBar={setShowTopBar} />
    </>
  );
}