import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react';

import tailwindStylesheetUrl from './styles/tailwind.css';
import { getUser } from './session.server';

import toast, { Toaster } from 'react-hot-toast';

import { commitSession, getSession, requireUser } from '~/session.server';
import { useEffect } from 'react';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'RemixFast Starter',
  viewport: 'width=device-width,initial-scale=1',
});

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request);
  const toastMessage = session.get('toastMessage') || null;
  return json(
    { toastMessage },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  );
}

export default function App() {
  const { toastMessage } = useLoaderData<typeof loader>();
  useEffect(() => {
    if (!toastMessage) {
      return;
    }
    toast(toastMessage);
  }, [toastMessage]);
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full overflow-hidden">
        <Outlet />
        <Toaster />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
