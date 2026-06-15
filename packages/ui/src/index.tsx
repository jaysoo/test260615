import type { ReactNode } from "react";

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: "1rem", marginTop: "1rem" }}>
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}
