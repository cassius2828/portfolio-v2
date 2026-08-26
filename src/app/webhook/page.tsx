import { PageShell } from "../_components/layout/PageShell";
import { api } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function WebhookPage() {
    //   const latest = await api.webhook.getLatest();
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <span className="text-2xl font-bold">Hello World</span>
        </div>
    );
    //   return (
    //     <PageShell>
    //       <main className="mx-auto max-w-3xl px-6 pb-24">
    //         <h1 className="mb-2 text-3xl font-semibold text-[var(--color-text-primary)]">
    //           Webhook response
    //         </h1>
    //         <p className="mb-8 text-sm text-[var(--color-text-secondary)]">
    //           Latest OpenAI webhook payload stored by{" "}
    //           <code className="rounded bg-[var(--color-bg-secondary)] px-1.5 py-0.5">
    //             /api/webhook
    //           </code>
    //           .
    //         </p>

    //         {!latest ? (
    //           <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-6 text-[var(--color-text-secondary)]">
    //             No webhook received yet. Send an OpenAI{" "}
    //             <code>response.completed</code> event to <code>/api/webhook</code>,
    //             then refresh this page.
    //           </div>
    //         ) : (
    //           <div className="space-y-6">
    //             <dl className="grid gap-3 text-sm sm:grid-cols-2">
    //               <div>
    //                 <dt className="text-[var(--color-text-secondary)]">Event</dt>
    //                 <dd className="font-medium text-[var(--color-text-primary)]">
    //                   {latest.eventType}
    //                 </dd>
    //               </div>
    //               <div>
    //                 <dt className="text-[var(--color-text-secondary)]">Received</dt>
    //                 <dd className="font-medium text-[var(--color-text-primary)]">
    //                   {new Date(latest.receivedAt).toLocaleString()}
    //                 </dd>
    //               </div>
    //               {latest.responseId ? (
    //                 <div className="sm:col-span-2">
    //                   <dt className="text-[var(--color-text-secondary)]">
    //                     Response ID
    //                   </dt>
    //                   <dd className="font-mono break-all text-[var(--color-text-primary)]">
    //                     {latest.responseId}
    //                   </dd>
    //                 </div>
    //               ) : null}
    //             </dl>

    //             <section>
    //               <h2 className="mb-2 text-lg font-medium text-[var(--color-text-primary)]">
    //                 Output
    //               </h2>
    //               <pre className="overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] p-4 text-sm whitespace-pre-wrap text-[var(--color-text-primary)]">
    //                 {latest.outputText?.trim()
    //                   ? latest.outputText
    //                   : "(no output_text on this event)"}
    //               </pre>
    //             </section>
    //           </div>
    //         )}
    //       </main>
    //     </PageShell>
    //   );
}
