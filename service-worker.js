// Service Worker - 오프라인에서도 앱이 작동하게 해주는 파일

const CACHE_NAME = 'shift-calendar-v1';
// 캐시 이름 (업데이트할 때 v2, v3 으로 바꾸면 됨)

const FILES_TO_CACHE = [
  '/shift-calendar/',
  '/shift-calendar/index.html',
  '/shift-calendar/manifest.json'
];
// 오프라인에서도 쓸 수 있게 저장할 파일 목록

// 설치할 때 파일들을 캐시에 저장
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// 네트워크 요청시 캐시에서 먼저 찾고, 없으면 인터넷에서 가져옴
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
