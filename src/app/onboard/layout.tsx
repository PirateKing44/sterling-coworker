export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <div className="text-xl font-bold tracking-tight mb-10">sterling</div>
      <div className="w-full max-w-lg">{children}</div>
    </div>
  );
}
