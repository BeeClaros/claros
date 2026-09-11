export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`body { display: block !important; margin: 0 !important; background: #f4f5f4 !important; }`}</style>
      {children}
    </>
  );
}
