// -------------------------------------------------------------
// Generated using https://remixfast.com/
// Docs: https://remixfast.com/docs/routes
// App: NotificationApp
// -------------------------------------------------------------
import { json, LoaderArgs } from '@remix-run/node';
import { Link, Outlet, useLoaderData, useParams } from '@remix-run/react';
//
import { Widget } from '@prisma/client';
import * as widgetDb from '~/models/widget.server';
import { useState } from 'react';

//
export async function loader({ params, request }: LoaderArgs) {
  //
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const skip = +(searchParams.get?.('skip') as string) || 0;
  const take = +(searchParams.get?.('take') as string) || 20;
  //
  const widgetList: Widget[] = await widgetDb.getWidgetList(skip, take);
  //
  return json({ widgetList });
}

export default function WidgetRoute() {
  const { widgetList } = useLoaderData<typeof loader>();
  const params = useParams();
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="h-full basis-6/12  overflow-auto ">
        {widgetList.map((w) => (
          <Link key={w.widgetId} to={`${w.widgetId}`} replace={Boolean(params?.widgetId)}>
            <div className="m-4 rounded-md border p-4">
              <div className="text-large font-semibold">{w.widgetName}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="basis-6/12 bg-slate-100 py-2">
        <Outlet />
      </div>
    </div>
  );
}
