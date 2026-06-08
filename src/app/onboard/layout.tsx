export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-white">
      <div className="flex items-center gap-2 mb-10">
        <span className="text-xl font-bold tracking-tight text-[var(--foreground)]">sterling</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--google-blue)]/10 text-[var(--google-blue)] font-medium">
          Gemini Edition
        </span>
      </div>
      <div className="w-full max-w-lg">{children}</div>
    </div>
  );
}
