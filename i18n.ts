import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/locales';

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as never)) {
    notFound();
  }

  return {
    locale: locale as string,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
