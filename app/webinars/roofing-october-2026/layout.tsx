import BeeLogo from "@/components/layout/BeeLogo";

export default function WebinarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`body { display: block !important; margin: 0 !important; background: #FFFFFF !important; }`}</style>
      <div className="v8-theme" style={{ background: "#FFFFFF" }}>
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderBottom: "1px solid var(--v8-line)",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <a
            href="https://beeclaros.com"
            style={{ textDecoration: "none", lineHeight: 0 }}
            aria-label="Claros home"
          >
            <BeeLogo height={30} />
          </a>
        </header>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(location.hash!=='#register')return;var el=document.getElementById('register');if(el)el.scrollIntoView({block:'start'});})();`,
          }}
        />
      </div>
    </>
  );
}
