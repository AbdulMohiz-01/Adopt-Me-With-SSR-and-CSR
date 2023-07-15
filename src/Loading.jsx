import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center">
        <h2 className="text-5xl animate-spin">🐶</h2>
        <p className="text-xl font-bold text-amber-700">Loading...</p>
      </div>
    </div>
  );
}
