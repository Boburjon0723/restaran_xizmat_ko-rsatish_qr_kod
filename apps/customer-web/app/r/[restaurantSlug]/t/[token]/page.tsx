import { PageShell } from "@/components/common/PageShell";
import { TableSessionInfo } from "@/components/table/TableSessionInfo";

export default function TableTokenPage({
  params
}: {
  params: { restaurantSlug: string; token: string };
}) {
  return (
    <PageShell title="Table Session">
      <TableSessionInfo restaurantSlug={params.restaurantSlug} token={params.token} />
    </PageShell>
  );
}
