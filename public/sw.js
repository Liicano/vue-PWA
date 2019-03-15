importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js'
)

if (workbox) {
  // LISTA A GUARDAR EN EL PRECACHE
  workbox.precaching.precacheAndRoute([])
  // PRECARGA DEL NAVEGADOR
  // workbox.navigationPreload.enable()

  // GUARDAR PETICIONES GET DE ASSETS (JS, CSS, IMAGENES)
  // workbox.routing.registerRoute(
  //   /\.(?:js|css|png|gif|jpg|jpeg|svg|webp)$/,
  //   new workbox.strategies.CacheFirst(),
  //   'GET'
  // )

  // GUARDAR PETICIONES GET A GOOGLE
  workbox.routing.registerRoute(
    new RegExp('https://lh3.googleusercontent.com'),
    new workbox.strategies.NetworkFirst(),
    'GET'
  )

  // GUARDAR PETICIONES GET A GOOGLE (PERSONAL ACCOUNT)
  workbox.routing.registerRoute(
    new RegExp('https://lh5.googleusercontent.com'),
    new workbox.strategies.NetworkFirst(),
    'GET'
  )

  // GUARDAR PETICIONES GET DE LA API
  workbox.routing.registerRoute(
    new RegExp('https://dev.unabase.es'),
    new workbox.strategies.NetworkFirst(),
    'GET'
  )

  // GUARDAR PETICIONES POST DE LA API
  const bgSyncPlugin = new workbox.backgroundSync.Plugin('apiPostStore', {
    maxRetentionTime: 24 * 60 // INTERVALO DE RESPUESTA DE 24 HORAS
  })
  workbox.routing.registerRoute(
    /^https?.*/,
    new workbox.strategies.NetworkOnly({
      plugins: [bgSyncPlugin]
    }),
    'POST'
  )

  // FUNCION QUE MUESTRA EL 404
  workbox.routing.setCatchHandler(({
    url,
    event,
    params
  }) => {
    console.log(self)
    return new Response('No se ha podido hacer GET de la siguiente pagina.')
  })
} else {
  console.log('ERROR AL CARGAR WORKBOX!')
}
