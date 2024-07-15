import { invokeBedrockAgent } from "../actions/invoque-agent";

export default function Home() {
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
      <form action={invokeBedrockAgent}>
        <input
          className="w-full h-10 px-3 text-black placeholder-gray-600 border rounded-lg focus:shadow-outline"
          type="text"
          placeholder="Sesion..."
          name="session"
        />
        <input
          className="w-full h-10 px-3 text-black placeholder-gray-600 border rounded-lg focus:shadow-outline"
          type="text"
          placeholder="Pregunta..."
          name="prompt"
        />
        <button className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg">
          Search
        </button>
      </form>
    </div>
  );
}
