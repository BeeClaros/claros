import CaptureFrame from "./CaptureFrame";

export default function HeroVideoCapturePage() {
  return (
    <main
      style={{
        margin: 0,
        padding: 0,
        background: "#ECEEEA",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CaptureFrame />
    </main>
  );
}
