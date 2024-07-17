"use client";

import { useState } from "react";

export default function Home() {
  const [chatResponse, setChatResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/agent-call", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setChatResponse(data.completion);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center min-h-screen font-mono text-sm lg:flex">
      <form onSubmit={handleChat} className="flex flex-col gap-1">
        <input
          className="w-full h-10 px-3 text-black placeholder-gray-600 border rounded-lg focus:shadow-outline"
          type="text"
          placeholder="Sesion..."
          name="session"
        />
        <textarea
          className="w-full h-10 px-3 text-black placeholder-gray-600 border rounded-lg focus:shadow-outline"
          placeholder="Pregunta..."
          name="prompt"
        />
        <button className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg">
          Search
        </button>
      </form>

      <div className="flex flex-col mt-4 lg:mt-0 p-2">
        <h2 className="text-lg font-bold">Chat Response</h2>
        <div className="flex flex-col mt-2">
          <p className="text-sm">{isLoading ? "Loading..." : chatResponse}</p>
        </div>
      </div>
    </div>
  );
}
