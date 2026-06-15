import Link from "next/link";
import { Card } from "@repo/ui";
// bump2

// Pages Router (legacy). Lives alongside the App Router in app/.
// Route: /legacy
export default function Legacy() {
  return (
    <main style={{ fontFamily: "system-ui", padding: "3rem", maxWidth: 640 }}>
      <h1>Legacy Pages Router</h1>
      <p>Served from <code>pages/legacy.tsx</code>, not <code>app/</code>.</p>
      <Card title="Still shares @repo/ui">
        Same workspace package as the App Router page.
      </Card>
      <p style={{ marginTop: "1rem" }}>
        <Link href="/">Back to App Router home</Link>
      </p>
    </main>
  );
}
