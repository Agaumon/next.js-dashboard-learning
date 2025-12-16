import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* We are then adding the font into the body element through className. By adding "Inter" to the body element, the font will be applied throughout our application. We're also adding the Tailwind 'antialiased' class which smooths out the font, which isn't necessary and completely optional. */}
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
