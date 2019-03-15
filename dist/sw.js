importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js'
)

if (workbox) {
  // LISTA A GUARDAR EN EL PRECACHE
  workbox.precaching.precacheAndRoute([
  {
    "url": "12logotipo.ico",
    "revision": "a2bac9e3261dcad0ed81bf59d1d00ac9"
  },
  {
    "url": "404.html",
    "revision": "b0ff71049e0a53b2bb0231a76eff8f6b"
  },
  {
    "url": "css/all.css",
    "revision": "1192c78fb1a5e3bbf2d131965e127c18"
  },
  {
    "url": "css/app.b19565c0.css",
    "revision": "913efa826fccf584539431a54bd332bb"
  },
  {
    "url": "css/chunk-0aa3.31aa9778.css",
    "revision": "1058d3bdb3775aff52ba7e0a80132d31"
  },
  {
    "url": "css/chunk-1b24.321a6f66.css",
    "revision": "cee59a18e2166edc646473f91140d5af"
  },
  {
    "url": "css/chunk-201b.d0b60b41.css",
    "revision": "4c0f48995ff288dbe3caa39f606eb3ea"
  },
  {
    "url": "css/chunk-2755.9dc48686.css",
    "revision": "1ba64a7118a02d03a06e825b8728708a"
  },
  {
    "url": "css/chunk-2973.7e8ef8ae.css",
    "revision": "c9a178ffcedc0d3e0a5d1107f27c7978"
  },
  {
    "url": "css/chunk-2c09.ccf42b3b.css",
    "revision": "f64b3d433794290df8f800500f6bd2a6"
  },
  {
    "url": "css/chunk-3850.7c5f060e.css",
    "revision": "851195cdfd4780a89b31f544e6a79f54"
  },
  {
    "url": "css/chunk-40c0.aa3dd98e.css",
    "revision": "8b100947712d8b64194890905e893946"
  },
  {
    "url": "css/chunk-4492.60235443.css",
    "revision": "a159bd2ade217de745b70e92342063a8"
  },
  {
    "url": "css/chunk-4756.ebfcbff3.css",
    "revision": "0fa20256ddf4dd8acff6f647d73372b9"
  },
  {
    "url": "css/chunk-4925.d6dbc83a.css",
    "revision": "9ed7cafce584ab1a1340441e30b53f6f"
  },
  {
    "url": "css/chunk-4b4d.ab549818.css",
    "revision": "bb752da4948cbd467d4ac228c70e75bd"
  },
  {
    "url": "css/chunk-4b7b.632a50b9.css",
    "revision": "bd4e9823e4213ffbc0b5f30605747daf"
  },
  {
    "url": "css/chunk-4d4b.0e40aca1.css",
    "revision": "9286430c3ec3e3e0cdcdfd50e380bf7f"
  },
  {
    "url": "css/chunk-51fa.69b2988f.css",
    "revision": "5a7f6ce03ddde43bde9397060b8f15a8"
  },
  {
    "url": "css/chunk-6544.f68dcbf0.css",
    "revision": "899b547fc548ec103304de8ccf72980b"
  },
  {
    "url": "css/chunk-75cf.3f02e0ce.css",
    "revision": "94388917f39a128291e0b504ae16945c"
  },
  {
    "url": "css/chunk-81e6.e500d46a.css",
    "revision": "b1c92b554173bf8e19cceca4c1f6a482"
  },
  {
    "url": "css/chunk-918b.8b0ae35e.css",
    "revision": "fff2b0dffe06d443cd26a7a5486cc41c"
  },
  {
    "url": "css/chunk-9a62.04cf3b8f.css",
    "revision": "5ccb22db75e195fea4bc94ea910f5c78"
  },
  {
    "url": "css/chunk-aeb9.8958a25e.css",
    "revision": "c14a15de70f21fe0caf1a0937360f808"
  },
  {
    "url": "css/chunk-b717.6d25c9de.css",
    "revision": "66239f4d4f133c12708a36d770cf1d4c"
  },
  {
    "url": "css/chunk-c184.4d97503c.css",
    "revision": "9685f5b8f1988ae2cdc6d8234391659c"
  },
  {
    "url": "css/chunk-c210.69bf50e1.css",
    "revision": "b279b8a0924877885b809665188b5a00"
  },
  {
    "url": "css/chunk-eb5d.b7a42c28.css",
    "revision": "84e5ec1aa0dd891414c76e9798dd1e3f"
  },
  {
    "url": "css/chunk-vendors.5d407498.css",
    "revision": "f77dfc1edcde0ec2f438957fa773bb35"
  },
  {
    "url": "css/main.css",
    "revision": "f0f5ab3351cac444740e477f20804dc0"
  },
  {
    "url": "favicon.png",
    "revision": "6fb71984447b53350ecce88415c9f259"
  },
  {
    "url": "fonts/index.css",
    "revision": "071c1f6a74ff0fc17f40c01c5f944f99"
  },
  {
    "url": "fonts/roboto-v18-latin_latin-ext-100italic.svg",
    "revision": "98c79800498e557faaabd49d2fd7b428"
  },
  {
    "url": "fonts/roboto-v18-latin_latin-ext-300.svg",
    "revision": "44d80edbb024d08c79042218e7277f68"
  },
  {
    "url": "fonts/roboto-v18-latin_latin-ext-300italic.svg",
    "revision": "f8b0d5a9ac4006ad3031052476de8a24"
  },
  {
    "url": "fonts/roboto-v18-latin_latin-ext-500.svg",
    "revision": "95204ac95130828753c0ee0ada537c33"
  },
  {
    "url": "fonts/roboto-v18-latin_latin-ext-500italic.svg",
    "revision": "b5bd232e5ae7e364a0e75ba4e480dc03"
  },
  {
    "url": "fonts/roboto-v18-latin_latin-ext-700.svg",
    "revision": "57888be7f3e68a7050452ea3157cf4de"
  },
  {
    "url": "fonts/roboto-v18-latin_latin-ext-700italic.svg",
    "revision": "4466317341560ee2759326c4723cae25"
  },
  {
    "url": "fonts/roboto-v18-latin_latin-ext-900.svg",
    "revision": "9c4bedeee9074a7ab438ff0e548d0fba"
  },
  {
    "url": "fonts/roboto-v18-latin_latin-ext-900italic.svg",
    "revision": "9ede86e9a4bc062655d63c80f9d71d46"
  },
  {
    "url": "fonts/roboto-v18-latin_latin-ext-italic.svg",
    "revision": "39c358e4c78546f0f49e624bcbdc8e63"
  },
  {
    "url": "fonts/roboto-v18-latin_latin-ext-regular.svg",
    "revision": "8681f434273fd6a267b1a16a035c5f79"
  },
  {
    "url": "img/apple-icon.png",
    "revision": "82afbfaa2a64cebfd0077f73abe15659"
  },
  {
    "url": "img/bg-pricing.jpg",
    "revision": "a6e440b9ce132569b2bcd85d2b2a5664"
  },
  {
    "url": "img/bg3.jpg",
    "revision": "7f7796d84a07cfc2f47cfe5a6477f147"
  },
  {
    "url": "img/bg9.jpg",
    "revision": "7d2facc52e51e6dd0969bd739e767ccb"
  },
  {
    "url": "img/btn_google_light_focus_ios.fb76987e.svg",
    "revision": "fb76987e58d87f60905c44cac95d64de"
  },
  {
    "url": "img/btn_google_light_normal_ios.1cdc8fce.svg",
    "revision": "1cdc8fce9609d07f0e9d8d0bc4b61f8f"
  },
  {
    "url": "img/btn_google_light_pressed_ios.ebc8aa49.svg",
    "revision": "ebc8aa49f3d64f3d0d2f631ea29a45db"
  },
  {
    "url": "img/card-1.jpg",
    "revision": "83ec248335c2be4d68abe78cca462c65"
  },
  {
    "url": "img/card-2.jpg",
    "revision": "218e5ad1b0e9aa585ae59e6ac56b7102"
  },
  {
    "url": "img/card-3.jpg",
    "revision": "390a214481ebc64d220b2dcdda501351"
  },
  {
    "url": "img/company_icon.9dc764ba.png",
    "revision": "9dc764baea72db20b711c0a09f827b01"
  },
  {
    "url": "img/default-avatar.png",
    "revision": "a9615bac158705203261e8348f574cc8"
  },
  {
    "url": "img/dowmload.5c55cda6.png",
    "revision": "5c55cda62b413bf649953a77d300609d"
  },
  {
    "url": "img/email.f1374eb0.png",
    "revision": "f1374eb0cb10056fdd3d9565be2a31f0"
  },
  {
    "url": "img/faces/avatar.jpg",
    "revision": "7a6bc10028a79f78e424a9c71499fa77"
  },
  {
    "url": "img/faces/card-profile1-square.jpg",
    "revision": "3122abf4a3e1067926c08dee7684522d"
  },
  {
    "url": "img/faces/card-profile2-square.jpg",
    "revision": "788e3d36e8c4d4120daeee6e57e7e85f"
  },
  {
    "url": "img/faces/marc.jpg",
    "revision": "aba54d652e5df3b9f1f8024cbeb6630f"
  },
  {
    "url": "img/favicon.png",
    "revision": "996d8248f580f8e26e6c45c67da9b5a6"
  },
  {
    "url": "img/flags/AU.png",
    "revision": "f410303b095b7faecea2088dff0746ff"
  },
  {
    "url": "img/flags/BR.png",
    "revision": "5730493f536fca3afdfb64833a4bd7ed"
  },
  {
    "url": "img/flags/DE.png",
    "revision": "5c449284c8bffd8a1a7b5cea411206cb"
  },
  {
    "url": "img/flags/GB.png",
    "revision": "8d7e0c569f553eeb5dcbc98a5811a811"
  },
  {
    "url": "img/flags/RO.png",
    "revision": "366f794ab7bc18b1b7acffa361d9f700"
  },
  {
    "url": "img/flags/US.png",
    "revision": "5b98f6f3041409dd54d4684ef14a9876"
  },
  {
    "url": "img/image_placeholder.jpg",
    "revision": "ebe9884b2152a08a525fcd5054019532"
  },
  {
    "url": "img/item_header.bd80329e.jpg",
    "revision": "bd80329eb1fd71531cf96cb3387c66a2"
  },
  {
    "url": "img/list.3fbc1b8a.png",
    "revision": "3fbc1b8a0cbd3413a6230277c439216f"
  },
  {
    "url": "img/lock.jpg",
    "revision": "3d7200a02bdadaa037c5d71286ffb9f4"
  },
  {
    "url": "img/login.jp2",
    "revision": "5decf17650857a0802e0898492eb1cd4"
  },
  {
    "url": "img/login.jpg",
    "revision": "8e492b33560cfa38ab9b51d1a183b22e"
  },
  {
    "url": "img/login.png",
    "revision": "6ccf712f98b6a5291456a7992fca20d9"
  },
  {
    "url": "img/login.webp",
    "revision": "3b56e9fc8b79b13336a0c8451c7747e3"
  },
  {
    "url": "img/logo_transparente.21d636b3.png",
    "revision": "21d636b3e1444a528acb56b43abd3479"
  },
  {
    "url": "img/logo_transparente2.8f7b2062.png",
    "revision": "8f7b20623139a1512cad73aefae1a9bc"
  },
  {
    "url": "img/logo_transparente3.d9a6dc9d.png",
    "revision": "d9a6dc9d9fff1c12d55b54cbf519529a"
  },
  {
    "url": "img/logo_transparente4.874caeed.png",
    "revision": "874caeed95c2d53ee59c1515b1976f8f"
  },
  {
    "url": "img/logo_transparente5.d3ffaaa3.png",
    "revision": "d3ffaaa3b4e6770ed95d03212264189b"
  },
  {
    "url": "img/logotipo.png",
    "revision": "6fb71984447b53350ecce88415c9f259"
  },
  {
    "url": "img/logotipo120x120.png",
    "revision": "ed3acacff147bf3e03bcbb94cf2fb700"
  },
  {
    "url": "img/logotipo152x152.png",
    "revision": "a5657fa941c3ffeeea318ccba7c3df76"
  },
  {
    "url": "img/logotipo180x180.png",
    "revision": "ac7a3ca3b1d3ce94dd83f6b8b2a4dfc6"
  },
  {
    "url": "img/logotipo192x192.png",
    "revision": "19b81fb8266ab41875bdd81ce3400d83"
  },
  {
    "url": "img/logotipo36x36.png",
    "revision": "2423771501a5db4537edd95d37b76536"
  },
  {
    "url": "img/logotipo48x48.png",
    "revision": "495e586c9f448c041865ca9667049e70"
  },
  {
    "url": "img/logotipo512x512.png",
    "revision": "3c67d6e783c1ab02a683bb523ae6b240"
  },
  {
    "url": "img/logotipo60x60.png",
    "revision": "670174cd7e96fd3d757279f6762a2b12"
  },
  {
    "url": "img/logotipo72x72.png",
    "revision": "b1ebb0e6f039eac91a405f640bd65239"
  },
  {
    "url": "img/logotipo76x76.png",
    "revision": "a65c1e222828f103d83764fa2532e39e"
  },
  {
    "url": "img/logotipo96x96.png",
    "revision": "fd01a86b9d8a1565c084e21b448a784d"
  },
  {
    "url": "img/marc.aba54d65.jpg",
    "revision": "aba54d652e5df3b9f1f8024cbeb6630f"
  },
  {
    "url": "img/mask.png",
    "revision": "d27fbc90c2e644dfdc9765640dc713b9"
  },
  {
    "url": "img/new_logo.png",
    "revision": "44bf13a71a4db6e15913fe8af9296711"
  },
  {
    "url": "img/others.587476e7.png",
    "revision": "587476e7f0398703415b2ce10aff5f04"
  },
  {
    "url": "img/placeholder.jpg",
    "revision": "1eb7fff2a469da3cc6c3311572d7696d"
  },
  {
    "url": "img/product1.jpg",
    "revision": "081bf019322fc100b3b84f34d9bff302"
  },
  {
    "url": "img/product2.jpg",
    "revision": "f54ea19fad25688d79a4226b97c7781d"
  },
  {
    "url": "img/product3.jpg",
    "revision": "a0e400118b382fc007111de984da7552"
  },
  {
    "url": "img/profile-photo.jpeg",
    "revision": "2c4108799a50aaff1fc4a76ef95c197b"
  },
  {
    "url": "img/profile.29342d4d.png",
    "revision": "29342d4d1d8bd409037c439a27c9d972"
  },
  {
    "url": "img/profile.png",
    "revision": "29342d4d1d8bd409037c439a27c9d972"
  },
  {
    "url": "img/register.jpg",
    "revision": "4fea22ddd5efd5557ae89be5fc67b4c3"
  },
  {
    "url": "img/restart.4fea22dd.jpg",
    "revision": "4fea22ddd5efd5557ae89be5fc67b4c3"
  },
  {
    "url": "img/restart.jpg",
    "revision": "4fea22ddd5efd5557ae89be5fc67b4c3"
  },
  {
    "url": "img/sidebar-1.jpg",
    "revision": "eaf097489acaae551d6414ae880982c0"
  },
  {
    "url": "img/sidebar-2.jpg",
    "revision": "1fed358ab04878477a73ad5218880a03"
  },
  {
    "url": "img/sidebar-3.jpg",
    "revision": "c3657d2fff83d89539c3e33635854d9f"
  },
  {
    "url": "img/sidebar-4.jpg",
    "revision": "205eac35d271fc864889f19e7ae96381"
  },
  {
    "url": "img/unabaseLogo.png",
    "revision": "7c53ce7b9a3d256a5cda1457efbbff6f"
  },
  {
    "url": "img/v4logo.jpeg",
    "revision": "d72ba33fddd60b3eba170dcf00ba2027"
  },
  {
    "url": "img/vue-logo.png",
    "revision": "c2a605fbc0e687b2e1b4b90a7c445cdd"
  },
  {
    "url": "index.html",
    "revision": "d2d4f2c2799add69e3c970f76f0e8235"
  },
  {
    "url": "js/1157.065d9158.js",
    "revision": "f73057d89aa751294e969825831255e1"
  },
  {
    "url": "js/16ce.c51547e2.js",
    "revision": "11711e0a0f1447cb506dcc483f9094ec"
  },
  {
    "url": "js/1d8c.ae2ca724.js",
    "revision": "543a2369dee27d740f03d7bf66794a8b"
  },
  {
    "url": "js/21cb.d8b79bf5.js",
    "revision": "f57404b5dd914f416920df925993fb87"
  },
  {
    "url": "js/25f2.006ce1f4.js",
    "revision": "c4e83d1d09e28d69e5757ff9a1d9d6f3"
  },
  {
    "url": "js/27fe.87612926.js",
    "revision": "83b4d763d274347b32bb0ea736356239"
  },
  {
    "url": "js/2ef0.a9eb9166.js",
    "revision": "ecdbbbe1e4cc8ddd59789dd531ff2f72"
  },
  {
    "url": "js/3b7b.97930c26.js",
    "revision": "78ee233c6e275976387d971db9543088"
  },
  {
    "url": "js/4ce0.f822ea27.js",
    "revision": "6f5e90b46832f6970f52e01e48c0414d"
  },
  {
    "url": "js/58d3.b7121974.js",
    "revision": "da5e4f271751deeca50dbce65b2604c5"
  },
  {
    "url": "js/71ac.404caabb.js",
    "revision": "88857652bd530f43c74e1f6106849d58"
  },
  {
    "url": "js/82c5.02c3c587.js",
    "revision": "7dc4643245b093c4ba2866e4274b2d2f"
  },
  {
    "url": "js/9e6b.4af0f1c5.js",
    "revision": "77ffd6bc13ca8a6e3e6ee1f0e46d79e3"
  },
  {
    "url": "js/a8fa.0e608cb4.js",
    "revision": "2eb2ae7c08866172e7373535bd64e383"
  },
  {
    "url": "js/aebe.70be0ff8.js",
    "revision": "883094dc9205a86b5d79d0122900d52b"
  },
  {
    "url": "js/app.91fa9b36.js",
    "revision": "24613a23d2fd294c2da2c3bd05b09569"
  },
  {
    "url": "js/b610.3b2663a7.js",
    "revision": "f91aee95210eb4b06c0d19a2f709f0a8"
  },
  {
    "url": "js/chunk-0aa3.21226441.js",
    "revision": "f80fc2fe506c92985a8cf533b3d2a543"
  },
  {
    "url": "js/chunk-1468.33ab7442.js",
    "revision": "a90be6f0887e1df226fbb2f23288c193"
  },
  {
    "url": "js/chunk-1b24.7ea5420e.js",
    "revision": "6d2d6b725763b2025673d3b5fb5aebba"
  },
  {
    "url": "js/chunk-201b.58cdc2e2.js",
    "revision": "efabd2959cb4d8634a0fba7cdc35912d"
  },
  {
    "url": "js/chunk-2755.15b9a4d9.js",
    "revision": "5ac5d1c4b03538d0d3b89f9347f8ac5a"
  },
  {
    "url": "js/chunk-2973.43177dd9.js",
    "revision": "fd3105a653a0bc9be4d5eee4363fc993"
  },
  {
    "url": "js/chunk-2c09.70b55e06.js",
    "revision": "6ae52ebc0ce6236e87a02fd4ce2e6c4d"
  },
  {
    "url": "js/chunk-3850.0f810bd2.js",
    "revision": "ffcf1bc23aa3bd1a346fab0c08eb6807"
  },
  {
    "url": "js/chunk-40c0.d333d795.js",
    "revision": "4cf72fadb95d92f2c763d69163626325"
  },
  {
    "url": "js/chunk-4492.4896ec99.js",
    "revision": "ce48163497b9f140338f1451e8c7fb3b"
  },
  {
    "url": "js/chunk-4756.6021fe33.js",
    "revision": "147a2777212a978fe8330ee2fdc04fbb"
  },
  {
    "url": "js/chunk-4925.5ad62382.js",
    "revision": "86d685fe6cc3122a4f3aeaf0362fa474"
  },
  {
    "url": "js/chunk-4b4d.2f384d08.js",
    "revision": "5cb0b846d467fa6ca5b3d9a73a8ad07d"
  },
  {
    "url": "js/chunk-4b7b.7eac509b.js",
    "revision": "691c61c82b8de741cad0b16da04af898"
  },
  {
    "url": "js/chunk-4d4b.3a874b9e.js",
    "revision": "e220c6d6c4780f8e7c5d7890e0ee7a81"
  },
  {
    "url": "js/chunk-51fa.4793fec1.js",
    "revision": "82f8bcab66d65af3355670b1168e75d3"
  },
  {
    "url": "js/chunk-6544.7e4d911b.js",
    "revision": "ed5f65253a1754eaf851a0aad6a1ce90"
  },
  {
    "url": "js/chunk-6795.5d254966.js",
    "revision": "9c49f924bc10596c84b5724a7ab74d4e"
  },
  {
    "url": "js/chunk-75cf.e62d4f63.js",
    "revision": "941eff06bfde6ab418aba780486e6c32"
  },
  {
    "url": "js/chunk-81e6.0ddb8e91.js",
    "revision": "ff915108752f4761dd5be3f53cf120d9"
  },
  {
    "url": "js/chunk-918b.fefbf30e.js",
    "revision": "e39397cfa025a617ed96bdb7dfccc65d"
  },
  {
    "url": "js/chunk-9a62.b2c3ddd8.js",
    "revision": "2f72ae53abf5949352fb4f02871a59f7"
  },
  {
    "url": "js/chunk-aeb9.01528ff4.js",
    "revision": "4ac266b218b1f1d5f84182df8155a47c"
  },
  {
    "url": "js/chunk-b717.29068029.js",
    "revision": "50c6e740e5a1f01cb5b7ef68cf07f7ab"
  },
  {
    "url": "js/chunk-c184.ab19dc0b.js",
    "revision": "60b1a4f966f55edbd9380aff7bfd2dd6"
  },
  {
    "url": "js/chunk-c210.2c0d9055.js",
    "revision": "ff504c096d7814feff8dad5c045e5ab1"
  },
  {
    "url": "js/chunk-eb5d.2a0450b2.js",
    "revision": "1a2c524911e4b825f1b604b148be0b7b"
  },
  {
    "url": "js/chunk-vendors.762e98d3.js",
    "revision": "08978e79bc429637a8267cf35f267caf"
  },
  {
    "url": "js/e88c.60d142c1.js",
    "revision": "61f19be3e7b8ddda1c27f704ba80f866"
  },
  {
    "url": "js/edca.66baa0d6.js",
    "revision": "0e77d5bc7d0670b654d790283a90bd72"
  },
  {
    "url": "js/jquery.js",
    "revision": "bd0565c91a61ecb9f980df8b495d342d"
  },
  {
    "url": "js/materialize.js",
    "revision": "1900480d2dfcefdbcd4ec06b488b316e"
  },
  {
    "url": "logotipo.ico",
    "revision": "f9a1cd5950d2f6a23300e9ca25600491"
  },
  {
    "url": "manifest.json",
    "revision": "a3681bc17aa1ee9def137c80bff93b9a"
  }
])
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
