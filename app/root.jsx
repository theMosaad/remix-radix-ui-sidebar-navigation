import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesUrl from '~/styles/app.css'

export const meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links = () => [
    {
      rel: 'preload',
      as: 'font',
      href: '/fonts/Inter-roman-latin.var.woff2',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: stylesUrl,
    },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body
        className="bg-gray-2 text-primary-12 font-sans"
        style={{
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
