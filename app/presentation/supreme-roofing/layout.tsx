export default function PresentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`body { display: block !important; margin: 0 !important; background: #0c1e2a !important; }`}</style>
      {children}
    </>
  );
}
