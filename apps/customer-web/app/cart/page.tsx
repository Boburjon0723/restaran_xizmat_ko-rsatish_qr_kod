import { PageShell } from "@/components/common/PageShell";
import { CartSummary } from "@/components/cart/CartSummary";

export default function CartPage() {
  return (
    <PageShell title="Cart">
      <CartSummary />
    </PageShell>
  );
}
