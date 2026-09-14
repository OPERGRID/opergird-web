# OPERGRID Routing Contract

Route groups:

- `(auth)` = authentication
- `(workspace)` = authenticated operational workspace
- `api` = Next.js route handlers

Routes stay thin.

Preferred:

```tsx
export default function Page() {
  return <GangguanWorkspace />;
}
```

Avoid placing hundreds of lines of workflow inside page.tsx.

OPERGRID will feel SPA-like through a persistent workspace layout,
while keeping separate URLs for deep-linking, history, security,
and maintainability.

Authorization must not rely only on hiding client UI.
