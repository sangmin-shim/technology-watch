import { Cable, Smartphone } from "lucide-react";

export default function Index() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#101828] p-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Watch Technology</h1>
        <p className="text-lg text-white/70">Select the subject</p>
      </div>

      <div className="flex flex-row gap-8 flex-wrap justify-center">
        <a
          href="/electronic-component"
          className="flex flex-col w-48 h-48 items-center justify-center gap-4 rounded-xl bg-white/10 px-6 py-6 text-xl font-medium text-white transition-all hover:scale-105 hover:bg-white/20 hover:shadow-lg"
        >
          <Cable className="h-12 w-12" />
          <span className="text-center">Electronic Component</span>
        </a>

        <a
          href="/mobile"
          className="flex flex-col w-48 h-48 items-center justify-center gap-4 rounded-xl bg-white/10 px-6 py-6 text-xl font-medium text-white transition-all hover:scale-105 hover:bg-white/20 hover:shadow-lg"
        >
          <Smartphone className="h-12 w-12" />
          <span className="text-center">Mobile</span>
        </a>
      </div>
    </div>
  );
}
