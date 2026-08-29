export default function PreviewStatusPage() {
  return (
    <main className="preview-shell">
      <section className="preview-frame" style={{ padding: "2rem", textAlign: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>DesignMCP preview renderer</h1>
          <p style={{ color: "var(--muted-foreground)" }}>
            Internal component previews are served at /preview/:category/:slug.
          </p>
        </div>
      </section>
    </main>
  );
}
