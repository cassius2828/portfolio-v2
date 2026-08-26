export type WebhookSnapshot = {
  receivedAt: string;
  eventType: string;
  responseId?: string;
  outputText?: string | null;
};

const globalForWebhook = globalThis as typeof globalThis & {
  latestOpenAIWebhook?: WebhookSnapshot;
};

export function setLatestWebhook(snapshot: WebhookSnapshot) {
  globalForWebhook.latestOpenAIWebhook = snapshot;
}

export function getLatestWebhook() {
  return globalForWebhook.latestOpenAIWebhook ?? null;
}
