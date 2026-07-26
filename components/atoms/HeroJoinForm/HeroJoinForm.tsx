'use client';

// Small client component just for the hero join-group form.
// Everything else on the landing page remains server-rendered.

export function HeroJoinForm() {
  return (
    <form
      className="flex bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1.5 max-w-sm"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        placeholder="Enter Group Invite Code..."
        className="flex-1 bg-transparent text-white text-sm px-4 py-2 outline-none placeholder:text-white/60"
      />
      <button
        type="submit"
        className="rounded-full bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-6 py-2 text-sm transition-colors"
      >
        Join Group
      </button>
    </form>
  );
}
