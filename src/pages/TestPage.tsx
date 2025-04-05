import { FloatingChat } from "@/components/floating-chat";

export default function Bot() {
  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold">Your Application</h1>
      <p className="mt-4">This is your main application content.</p>

      {/* The floating chat button and modal */}
      <FloatingChat />
    </main>
  );
}
