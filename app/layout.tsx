import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import Script from "next/script";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import { PostHogProvider } from "./providers";

const title = "Formula od 6 Riječi | Transformirajte svoj odnos večeras";
const description =
  "Otkrijte rečenicu od 6 riječi koja čini da se muškarac ludo zaljubi. Pridružite se 3.432+ žena koje su transformirale svoje odnose u 24 sata.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `https://recenicestrasti.com`,
  },
  openGraph: {
    title: title,
    description: description,
    type: "website",
    images: {
      url: "https://recenicestrasti.com/og-image.jpg",
      alt: "recenicestrasti.com",
    },
  },
};

const pixelScript = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1340314074457994');
fbq('track', 'PageView');`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <meta
            name="facebook-domain-verification"
            content="z77heunv7fkzpbwsny9rhsq9cmayr5"
          />
          <Script
            id="fb-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: pixelScript,
            }}
          />
          <Script src="https://fast.wistia.com/assets/external/E-v1.js" async />
          {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-EC23D3L1TP"
          async
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EC23D3L1TP', {'send_page_view': true});
          `}
        </Script> */}
        </head>
        <body>
          <PostHogProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
