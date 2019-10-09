const CACHE_NAME = "Nana's Birthday";
var urlsToCache = [
  "/",
  "../cake.html",
  "../cardchar.html",
  "../fireworkv1.html",
  "../fireworkv2.html",
  "../flower.html",
  "../index.html",
  "../sounds/birthday.mp3",
  "../sounds/duar.mp3",
  "../sounds/swing.mp3",
  "../page/404page.html",
  "../page/firework.html",
  "../page/gallery.html",
  "../page/gift.html",
  "../page/home.html",
  "../page/horoscope.html",
  "../img/0b0facc2-f0ad-42ac-8d4d-1b3861438438.jpeg",
  "../img/3ee4d192-d2ea-4bad-babd-4f5fd31a6933.jpeg",
  "../img/9f29119d-03a1-4de9-bd10-bc52641f8444.jpeg",
  "../img/45e0a29a-637b-48d7-9285-cf180ba0b2a3.jpeg",
  "../img/1763189c-c4c3-4cd2-ab0c-437cf6fe368e.jpeg",
  "../img/72720918-3e9a-4fe2-81ad-0c0a0a19f62c.jpeg",
  "../img/b36c0ed9-173c-47f9-ad8e-a3e3ac225b9a.jpeg",
  "../img/e8f52724-38a7-49c1-a01a-6dd25c9653e3.jpeg",
  "../img/fdac9c23-2945-4a14-b4c7-abb8fa16286a.jpeg",
  "../img/header.jpg",
  "../img/nana192.png",
  "../img/nana512.png",
  "https://fonts.googleapis.com/css?family=Work+Sans:400,100,200,300,500,600,700,800,900",
  "../css/bootstrap.min.css",
  "../css/font-awesome.min.css",
  "../css/icomoon.css",
  "../css/animate.min.css",
  "../css/okeynav.css",
  "../css/okayNav-theme-dark.css",
  "../css/404-2.css",
  "../css/style-dark.css",
  "../css/index-2.css",
  "../css/colors/color-12.css",
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
