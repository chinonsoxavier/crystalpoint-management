// components/SupportHeader.tsx
import { useTranslate } from "@/hooks/use_translate";

export default function SupportHeader() {
  const { t } = useTranslate();

  return (
    <div>
      <h1 className="text-3xl font-bold">{t.admin.support.title}</h1>
      <p className="text-muted-foreground">{t.admin.support.subtitle}</p>
    </div>
  );
}
