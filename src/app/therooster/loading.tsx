export default function TheRoosterLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-stone-200 border-t-accent"
          aria-hidden
        />
        <p className="text-sm text-textMuted">Loading fleet…</p>
      </div>
    </main>
  );
}
