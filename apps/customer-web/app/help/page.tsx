import { PageShell } from "@/components/common/PageShell";
import { WaiterCallButton } from "@/components/waiter/WaiterCallButton";

export default function HelpPage() {
  return (
    <PageShell title="Yordam">
      <div className="space-y-4">
        <p>Yordam yoki ofitsiant chaqirish uchun quyidagini bosing.</p>
        <WaiterCallButton />
      </div>
    </PageShell>
  );
}
