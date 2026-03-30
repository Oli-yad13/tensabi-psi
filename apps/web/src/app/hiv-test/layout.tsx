export default function HivTestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5FAF9]">
      <div className="max-w-sm mx-auto min-h-screen relative overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
