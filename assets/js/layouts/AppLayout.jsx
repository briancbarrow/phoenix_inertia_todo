import React, { useState } from "react";
import FlashGroup from "../components/FlashGroup.jsx";

export default function AppLayout({ children, flash }) {
  const [showClientError, setShowClientError] = useState(false);
  const [showServerError, setShowServerError] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <FlashGroup flash={flash} />

        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
