import { Card } from "@repo/ui";

export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui", padding: "3rem", maxWidth: 640 }}>
      <h1>Turborepo + Next.js</h1>
      <p>Hello!</p>
      <p>Builds cached remotely. Same cache shared across main and branches in CI.</p>
      <Card title="Shared UI package">
        Imported from <code>@repo/ui</code> via workspace.
      </Card>
    </main>
  );
}
