
const cacheName = "BombAvoidGame-Update-v2";

// 古いキャッシュを削除
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.clients.claim();
    })()
  );
});

// 新しいService Workerをすぐに有効化
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// ゲームデータは常にネットワークから取得
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request, { cache: "no-store" })
  );
});
