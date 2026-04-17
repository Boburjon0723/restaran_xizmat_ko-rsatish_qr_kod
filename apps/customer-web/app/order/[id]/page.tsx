import { PageShell } from "@/components/common/PageShell";
import { OrderStatus } from "@/components/order/OrderStatus";

export default function OrderPage({ params }: { params: { id: string } }) {
  return (
    <PageShell title="Order Status">
      <OrderStatus orderId={params.id} />
    </PageShell>
  );
}
