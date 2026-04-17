export function TableSessionInfo({
  restaurantSlug,
  token
}: {
  restaurantSlug: string;
  token: string;
}) {
  return (
    <p>
      Restoran: <strong>{restaurantSlug}</strong>, token: <code>{token}</code>
    </p>
  );
}
