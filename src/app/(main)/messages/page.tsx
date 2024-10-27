"use client"; // Add this directive at the top

import Chat from "./Chat";
import { useState } from "react";
import { metadata } from "./metadata"; // Import from metadata file

export default function Page() {
  const [showTopBar, setShowTopBar] = useState(true); // State to control top bar visibility

  return (
    <>
      {showTopBar && <TopBar />} {/* Your top bar component here */}
      <Chat setShowTopBar={setShowTopBar} />
    </>
  );
}

// Export the metadata here
export { metadata };