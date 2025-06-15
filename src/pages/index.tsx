export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between p-8 gap-16">
      <header className="w-full text-center text-xl font-semibold">
        Welcome to MyLogue
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto">
        <p className="text-gray-600">List of blogs.</p>
      </main>

      <footer className="w-full text-center text-sm text-gray-400">
        © 2025 MyLogue
      </footer>
    </div>
  );
}
