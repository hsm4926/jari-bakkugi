/* 서비스 워커 — 한 번 열어 두면 인터넷 없이도 돌아가게 해 줍니다.
   버전이 바뀌면 CACHE 이름이 바뀌므로 예전 것은 통째로 버려집니다. */
const VERSION = '1.8.1';
const CACHE = 'jari-' + VERSION;
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest?v=1.8.1",
  "./.git/COMMIT_EDITMSG?v=1.8.1",
  "./.git/FETCH_HEAD?v=1.8.1",
  "./.git/HEAD?v=1.8.1",
  "./.git/config?v=1.8.1",
  "./.git/description?v=1.8.1",
  "./.git/hooks/applypatch-msg.sample?v=1.8.1",
  "./.git/hooks/commit-msg.sample?v=1.8.1",
  "./.git/hooks/fsmonitor-watchman.sample?v=1.8.1",
  "./.git/hooks/post-update.sample?v=1.8.1",
  "./.git/hooks/pre-applypatch.sample?v=1.8.1",
  "./.git/hooks/pre-commit.sample?v=1.8.1",
  "./.git/hooks/pre-merge-commit.sample?v=1.8.1",
  "./.git/hooks/pre-push.sample?v=1.8.1",
  "./.git/hooks/pre-rebase.sample?v=1.8.1",
  "./.git/hooks/pre-receive.sample?v=1.8.1",
  "./.git/hooks/prepare-commit-msg.sample?v=1.8.1",
  "./.git/hooks/push-to-checkout.sample?v=1.8.1",
  "./.git/hooks/sendemail-validate.sample?v=1.8.1",
  "./.git/hooks/update.sample?v=1.8.1",
  "./.git/index?v=1.8.1",
  "./.git/info/exclude?v=1.8.1",
  "./.git/logs/HEAD?v=1.8.1",
  "./.git/logs/refs/heads/main?v=1.8.1",
  "./.git/logs/refs/remotes/origin/main?v=1.8.1",
  "./.git/objects/01/d99ad9c830128fb9de194aca89d2f826049a74?v=1.8.1",
  "./.git/objects/02/c08d2e64e1554707331a1a5eebdf1894eb755a?v=1.8.1",
  "./.git/objects/03/125edcba531ac15f3394ce476c35f82d54262f?v=1.8.1",
  "./.git/objects/03/5b9ac5c84237c1a3c52bd935d13ccc3b2775d6?v=1.8.1",
  "./.git/objects/07/77b79634ea1cd361889cf2f2f6ad8c2f8b6553?v=1.8.1",
  "./.git/objects/08/0f54a1acf7846f5ff689a8f4c2401e05723cb8?v=1.8.1",
  "./.git/objects/0a/1528f46f0abece1909cfccbcc8dd20dad82af0?v=1.8.1",
  "./.git/objects/0d/796313347678bc9cd174d0126c31510a6e1a14?v=1.8.1",
  "./.git/objects/0e/81fedca9396cd234964a2b9576bdbb679af8dc?v=1.8.1",
  "./.git/objects/0f/67664c8392b584af12f58266808ed53c796308?v=1.8.1",
  "./.git/objects/10/f7accd5e52353c9d814e9307c57766227c1ac7?v=1.8.1",
  "./.git/objects/12/e85cdd7febfd75638df41e72ed72b15256542b?v=1.8.1",
  "./.git/objects/13/779aefdc3f7359c88bef0d36262779ad6f65b0?v=1.8.1",
  "./.git/objects/15/35f6b785d9bbda37305ab1d12b1a35f7d3ca3d?v=1.8.1",
  "./.git/objects/16/beaa2948ca148974f3265800bae4600616f001?v=1.8.1",
  "./.git/objects/18/ffc24c5b821815891b688df67cd7470e52e323?v=1.8.1",
  "./.git/objects/20/0a728beb6d4a2152c19058a5811d14e1f430dc?v=1.8.1",
  "./.git/objects/23/503d9a54f66912f8086439a91acc2b462c9549?v=1.8.1",
  "./.git/objects/26/4527a8e347a9128545dcbaf82aab48e7843506?v=1.8.1",
  "./.git/objects/30/636f29962f72e0a064e06615b7efea6f4904c9?v=1.8.1",
  "./.git/objects/31/bb131cd94d86de5489a88e98ebc685089e9fb8?v=1.8.1",
  "./.git/objects/35/b6acf6e5f943bd3b824966f2deb28ecf41a03d?v=1.8.1",
  "./.git/objects/39/771ec6d79b26803b5c892c2a1f176eda881f81?v=1.8.1",
  "./.git/objects/40/a89b3b5e3071329129088b35b1957d301e6e76?v=1.8.1",
  "./.git/objects/43/e55b172f031260ced740705b9bd36d46d8ec9c?v=1.8.1",
  "./.git/objects/4d/8cfcf1febf00d6ce1c565af7254130ce58cea8?v=1.8.1",
  "./.git/objects/50/5b276fc06db6ec46ec16a8eb7c0bd89a7265f5?v=1.8.1",
  "./.git/objects/54/44ca3ee2a43bdc19205603439b6f69b2281474?v=1.8.1",
  "./.git/objects/5b/b1c537f8a47a6aa98a0aa23c96f63dbaf7a4cf?v=1.8.1",
  "./.git/objects/5d/49d9eff10d150d23387735e18df798953d5bd2?v=1.8.1",
  "./.git/objects/5f/0e03329d16b8f0689eaa63116c1deb0c37a859?v=1.8.1",
  "./.git/objects/63/f27ecaa582682d457d91dcb09e3c64afa3763a?v=1.8.1",
  "./.git/objects/64/c77a6369b245c890706c6653952c90de131c53?v=1.8.1",
  "./.git/objects/6b/8ad1f6416cc5573cea79094e6dd93d42af7807?v=1.8.1",
  "./.git/objects/6e/5aaa893c15b89e0646127a59af0a1736ff355f?v=1.8.1",
  "./.git/objects/72/3a3a56bae967150ead0b1d14efdd51105b08cd?v=1.8.1",
  "./.git/objects/74/ae4c937fd996309a2710f7b05e5c0dc52bdfe4?v=1.8.1",
  "./.git/objects/75/e0d6a6e28cf987351fa03b7292902452744a15?v=1.8.1",
  "./.git/objects/76/635eddf8cac60178fe5c184c2f987d9740e47e?v=1.8.1",
  "./.git/objects/77/a79d8dd4d0f4c58c817cfe625011fe0ff02710?v=1.8.1",
  "./.git/objects/77/cce72a10293c347f7f420600c42b185d5007c7?v=1.8.1",
  "./.git/objects/79/6346c8cfa3bcbdef6a374fdf555cf6ce0c529e?v=1.8.1",
  "./.git/objects/79/db19c37515fddc05389176920c6fdbdc5e54dd?v=1.8.1",
  "./.git/objects/7b/16d7ecb9695164b8678d425999022a039bed81?v=1.8.1",
  "./.git/objects/7f/100d664969be58b2ecfd53fbc8edaf7c1dda3b?v=1.8.1",
  "./.git/objects/80/0069c7e7ccfabb87442120c6b021c6138c00bc?v=1.8.1",
  "./.git/objects/86/5f6f26c1bbe7c51279faca4e10214925a9c0f2?v=1.8.1",
  "./.git/objects/87/b7b42fc896598eed168bfbd4af01b2a3b37281?v=1.8.1",
  "./.git/objects/87/f6841d370554d0be8d4776b33c7a2c6d997988?v=1.8.1",
  "./.git/objects/88/77701087182d82e2b0279a74944a4a15d71362?v=1.8.1",
  "./.git/objects/88/c4f28cec92eb9db54e8c5a45d2647c1c61de35?v=1.8.1",
  "./.git/objects/8a/be218ec36896a92a74fd6b433c8cec0b59116d?v=1.8.1",
  "./.git/objects/8b/3a7b26ee4a8119d6857dbe2007f4029cfffb19?v=1.8.1",
  "./.git/objects/94/98c9cc9242af726e9e32e28d27ce3283594669?v=1.8.1",
  "./.git/objects/95/3e3afc6b1167c6f6628672e7854d5e971450e9?v=1.8.1",
  "./.git/objects/95/556b46fbb6fe848ee95295cd8c64956c95b386?v=1.8.1",
  "./.git/objects/95/98434320ea9bc3c0f48a6f8337f20f45ca82f4?v=1.8.1",
  "./.git/objects/96/cb84a247557a6563bbf1f94ef36abf13c87bd1?v=1.8.1",
  "./.git/objects/96/f02040f844cd6ca2df51cdeda35c225b3d950d?v=1.8.1",
  "./.git/objects/9b/11c0dbd8c50c6cb7e828549fa30577164446d8?v=1.8.1",
  "./.git/objects/9b/f1f307ed406f4d983c950a383948c2b4a99404?v=1.8.1",
  "./.git/objects/9c/f9fdb197073d5d9de6bfb77cc8b21c5eff52cc?v=1.8.1",
  "./.git/objects/9f/1a7237b382398a48c6f9ca90613de62d03e2b9?v=1.8.1",
  "./.git/objects/a1/bcff296de18b4a624dd9fbf36679c823a90408?v=1.8.1",
  "./.git/objects/a1/f202c3aad4fba834eb549eab30bd1f66457b9d?v=1.8.1",
  "./.git/objects/a5/bbfa54385bcc923811890f7734bd74e17233f6?v=1.8.1",
  "./.git/objects/a6/5693b080e7ae04e14ba5ca597bc0da4ce8d46c?v=1.8.1",
  "./.git/objects/a7/9d155c979cf3a94c42df0444d3cd48bde60605?v=1.8.1",
  "./.git/objects/a7/f39614d21bab8dca56a525a1b5afe13ec32a2d?v=1.8.1",
  "./.git/objects/ab/37ea0506e4f6d2846e061098e4cda462f10283?v=1.8.1",
  "./.git/objects/ac/0e7ec74a6197fc8dadd3520c11d756465fb27c?v=1.8.1",
  "./.git/objects/b0/5a3778207cf6c62e572f791a4987f4113317b8?v=1.8.1",
  "./.git/objects/b5/3d80d94102ff3daa905442f8e68cf8227b26c0?v=1.8.1",
  "./.git/objects/b6/2c8b240fddb014ee67fc9774a9f1bdcadedb6e?v=1.8.1",
  "./.git/objects/bc/14c03bab326ec70d80c62829efb86fd08ce7cb?v=1.8.1",
  "./.git/objects/bc/5e03bbe3a012df09a20150b5bb954cae63e4a6?v=1.8.1",
  "./.git/objects/be/3e833568da3af1479e83385507dfcd73b30944?v=1.8.1",
  "./.git/objects/bf/d3247f59a1173a732a1d5ac3f5c285b108c62d?v=1.8.1",
  "./.git/objects/c6/73aa73140f8885f781e304eb5165fe82395ccd?v=1.8.1",
  "./.git/objects/c8/06cb4408bda27d516790440829f18d5792525f?v=1.8.1",
  "./.git/objects/ca/c99483f9caed23f7414eed1f43c052daa653f6?v=1.8.1",
  "./.git/objects/cd/d8276f45699931574c58d90199759c4f960dd5?v=1.8.1",
  "./.git/objects/d0/8ac958bbc37c7913b0dd00fd34a492a72d73a6?v=1.8.1",
  "./.git/objects/d1/7938d6109c70f4b222cff16d5f309d4ba9542e?v=1.8.1",
  "./.git/objects/d2/171f9f9738d657add9a06b35f9e1ed3c89bb5d?v=1.8.1",
  "./.git/objects/d2/d6df362f7015c628e82f98e9ec9738857269ec?v=1.8.1",
  "./.git/objects/d3/112b4b0e51bcd23b44e3b73030814bbf821563?v=1.8.1",
  "./.git/objects/d3/3bbe6345941bdfef17775d5cc2699bec1baefe?v=1.8.1",
  "./.git/objects/d5/3581ce15b05ccdae1d81537e8c83af18b3fe23?v=1.8.1",
  "./.git/objects/d6/a2783a9140d6bc1261ee534fb31087d48fd4a2?v=1.8.1",
  "./.git/objects/d6/b3de43b91e2bf478e83392b2df0d1ed469a268?v=1.8.1",
  "./.git/objects/d7/070a3fb97c2ef3658cfcc49b93551687a5e095?v=1.8.1",
  "./.git/objects/d7/9db9caac3c6a034ae5b4a612b1d5993d4da2cd?v=1.8.1",
  "./.git/objects/d7/f365d7c0a6df808e73e078ef45b21db7067461?v=1.8.1",
  "./.git/objects/d8/6ed5ab3c88cf11c59ae762f567d48c6f103eb1?v=1.8.1",
  "./.git/objects/d8/7b16ff864ed6daad6f928d60523ef86aea5b5c?v=1.8.1",
  "./.git/objects/d8/d24b29a0bcaeb08fedc3e6a9967fb59c2ad182?v=1.8.1",
  "./.git/objects/d9/d60c7ce3595ee9120717df70b1001150194325?v=1.8.1",
  "./.git/objects/da/751d86b3569ec96e20e45ae4d3dc0cc26ef9f4?v=1.8.1",
  "./.git/objects/da/a1440f6aa92f2176ccc1f0b4928a88261dc139?v=1.8.1",
  "./.git/objects/df/551d0e9d49bb146dc2f248e2208d15f002fd26?v=1.8.1",
  "./.git/objects/e1/25c7e9a873b8cac76f9472e88acecf49eeaf03?v=1.8.1",
  "./.git/objects/e4/060e3842b55efb7ec8fac0229d4a23ea16ec05?v=1.8.1",
  "./.git/objects/e6/9de29bb2d1d6434b8b29ae775ad8c2e48c5391?v=1.8.1",
  "./.git/objects/e6/b3eae15f60ca2b01e1b3ffb1088888586dd02e?v=1.8.1",
  "./.git/objects/ea/322baad90aa00edaeac096defee43f8a024dd7?v=1.8.1",
  "./.git/objects/ec/02a0f4eea9851dd11ffe2481bca7e9f7e3960a?v=1.8.1",
  "./.git/objects/ec/609e7bae76fefe455e628f27679e3e60ad73bd?v=1.8.1",
  "./.git/objects/ec/9b4182d6559c819e3c6d8fa8299cb2e463ab5b?v=1.8.1",
  "./.git/objects/f2/5a4ba9db6a2f36afc8e53c19b5a8ad72a345a7?v=1.8.1",
  "./.git/objects/f5/408c58de236f1fd32d6b396cf68ef0a09b4266?v=1.8.1",
  "./.git/objects/f8/044805b425276790afa8082c7980c84040d2e9?v=1.8.1",
  "./.git/objects/fa/24dc581ec4dad8b39fab38a633f9f0ef0daf18?v=1.8.1",
  "./.git/objects/fa/4e5dab0289f1219a384cc0737ba86686082955?v=1.8.1",
  "./.git/objects/fc/620a8f47aa4e703490df7d123bc8d1e7db9e09?v=1.8.1",
  "./.git/objects/fc/cdf1df0842ebf4b5f0afc87665beb44cd0f80c?v=1.8.1",
  "./.git/objects/ff/272a9382c43c3a229be34816d70f11d1e75bf8?v=1.8.1",
  "./.git/objects/ff/babf1499142826e45a35130c68b094957ced03?v=1.8.1",
  "./.git/refs/heads/main?v=1.8.1",
  "./.git/refs/remotes/origin/main?v=1.8.1",
  "./assets/sounds/click.wav?v=1.8.1",
  "./assets/sounds/crack.wav?v=1.8.1",
  "./assets/sounds/hatch.mp3?v=1.8.1",
  "./assets/sounds/page.wav?v=1.8.1",
  "./assets/sounds/reveal.mp3?v=1.8.1",
  "./assets/sounds/shuffle-end.wav?v=1.8.1",
  "./assets/sounds/tick.wav?v=1.8.1",
  "./assets/sounds/whoosh.wav?v=1.8.1",
  "./assets/sprites/desk-icon.png?v=1.8.1",
  "./assets/sprites/egg/01.png?v=1.8.1",
  "./assets/sprites/egg/02.png?v=1.8.1",
  "./assets/sprites/egg/03.png?v=1.8.1",
  "./assets/sprites/egg/04.png?v=1.8.1",
  "./assets/sprites/egg/05.png?v=1.8.1",
  "./assets/sprites/egg/06.png?v=1.8.1",
  "./assets/sprites/egg/07.png?v=1.8.1",
  "./assets/sprites/egg/08.png?v=1.8.1",
  "./assets/sprites/egg/09.png?v=1.8.1",
  "./assets/sprites/egg/10.png?v=1.8.1",
  "./assets/sprites/egg/11.png?v=1.8.1",
  "./assets/sprites/egg/12.png?v=1.8.1",
  "./assets/sprites/egg/13.png?v=1.8.1",
  "./assets/sprites/fx/burst01.png?v=1.8.1",
  "./assets/sprites/fx/burst02.png?v=1.8.1",
  "./assets/sprites/fx/burst03.png?v=1.8.1",
  "./assets/sprites/fx/burst04.png?v=1.8.1",
  "./assets/sprites/fx/burst05.png?v=1.8.1",
  "./assets/sprites/fx/burst06.png?v=1.8.1",
  "./assets/sprites/fx/rise01.png?v=1.8.1",
  "./assets/sprites/fx/rise02.png?v=1.8.1",
  "./assets/sprites/fx/rise03.png?v=1.8.1",
  "./assets/sprites/fx/rise04.png?v=1.8.1",
  "./assets/sprites/fx/rise05.png?v=1.8.1",
  "./assets/sprites/fx/rise06.png?v=1.8.1",
  "./assets/sprites/fx/rise07.png?v=1.8.1",
  "./assets/sprites/fx/rise08.png?v=1.8.1",
  "./assets/sprites/fx/rise09.png?v=1.8.1",
  "./assets/sprites/fx/rise10.png?v=1.8.1",
  "./assets/sprites/fx/rise11.png?v=1.8.1",
  "./assets/sprites/fx/rise12.png?v=1.8.1",
  "./assets/sprites/icon.png?v=1.8.1",
  "./assets/sprites/mong/a.png?v=1.8.1",
  "./assets/sprites/mong/b.png?v=1.8.1",
  "./assets/sprites/mong/beauty.png?v=1.8.1",
  "./assets/sprites/mong/c.png?v=1.8.1",
  "./assets/sprites/mong/cute.png?v=1.8.1",
  "./assets/sprites/student/boy1-0.png?v=1.8.1",
  "./assets/sprites/student/boy1-1.png?v=1.8.1",
  "./assets/sprites/student/boy1-2.png?v=1.8.1",
  "./assets/sprites/student/boy1-3.png?v=1.8.1",
  "./assets/sprites/student/boy1-4.png?v=1.8.1",
  "./assets/sprites/student/boy1-5.png?v=1.8.1",
  "./assets/sprites/student/boy1-6.png?v=1.8.1",
  "./assets/sprites/student/boy1-7.png?v=1.8.1",
  "./assets/sprites/student/boy1.png?v=1.8.1",
  "./assets/sprites/student/boy2-0.png?v=1.8.1",
  "./assets/sprites/student/boy2-1.png?v=1.8.1",
  "./assets/sprites/student/boy2-2.png?v=1.8.1",
  "./assets/sprites/student/boy2-3.png?v=1.8.1",
  "./assets/sprites/student/boy2-4.png?v=1.8.1",
  "./assets/sprites/student/boy2-5.png?v=1.8.1",
  "./assets/sprites/student/boy2-6.png?v=1.8.1",
  "./assets/sprites/student/boy2-7.png?v=1.8.1",
  "./assets/sprites/student/boy2.png?v=1.8.1",
  "./assets/sprites/student/girl1-0.png?v=1.8.1",
  "./assets/sprites/student/girl1-1.png?v=1.8.1",
  "./assets/sprites/student/girl1-2.png?v=1.8.1",
  "./assets/sprites/student/girl1-3.png?v=1.8.1",
  "./assets/sprites/student/girl1-4.png?v=1.8.1",
  "./assets/sprites/student/girl1-5.png?v=1.8.1",
  "./assets/sprites/student/girl1-6.png?v=1.8.1",
  "./assets/sprites/student/girl1-7.png?v=1.8.1",
  "./assets/sprites/student/girl1.png?v=1.8.1",
  "./assets/sprites/student/girl2-0.png?v=1.8.1",
  "./assets/sprites/student/girl2-1.png?v=1.8.1",
  "./assets/sprites/student/girl2-2.png?v=1.8.1",
  "./assets/sprites/student/girl2-3.png?v=1.8.1",
  "./assets/sprites/student/girl2-4.png?v=1.8.1",
  "./assets/sprites/student/girl2-5.png?v=1.8.1",
  "./assets/sprites/student/girl2-6.png?v=1.8.1",
  "./assets/sprites/student/girl2-7.png?v=1.8.1",
  "./assets/sprites/student/girl2.png?v=1.8.1",
  "./config.js?v=1.8.1",
  "./css/fonts.css?v=1.8.1",
  "./css/style.css?v=1.8.1",
  "./icons/icon-180.png?v=1.8.1",
  "./icons/icon-192.png?v=1.8.1",
  "./icons/icon-512.png?v=1.8.1",
  "./icons/icon-maskable-512.png?v=1.8.1",
  "./js/audio.js?v=1.8.1",
  "./js/editor.js?v=1.8.1",
  "./js/layout.js?v=1.8.1",
  "./js/main.js?v=1.8.1",
  "./js/panel.js?v=1.8.1",
  "./js/presets.js?v=1.8.1",
  "./js/render.js?v=1.8.1",
  "./js/shuffle.js?v=1.8.1",
  "./js/state.js?v=1.8.1",
  "./js/util.js?v=1.8.1",
  "./version.js?v=1.8.1"
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* 인터넷 응답을 기다려 주는 시간 (밀리초). 이 안에 안 오면 캐시로 보여 줍니다. */
const NET_TIMEOUT = 3500;

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    promise.then((v) => { clearTimeout(t); resolve(v); },
                 (e) => { clearTimeout(t); reject(e); });
  });
}

async function pageFirst(req) {
  try {
    const res = await withTimeout(fetch(req), NET_TIMEOUT);
    const copy = res.clone();
    caches.open(CACHE).then((c) => c.put('./index.html', copy));
    return res;
  } catch (err) {
    const hit = await caches.match('./index.html');
    if (hit) return hit;
    throw err;
  }
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // 화면(html)은 늘 인터넷을 먼저 봅니다 — 새 버전이 바로 들어오게 하려고.
  // 다만 학교 인터넷이 «끊긴 건 아닌데 응답이 없는» 상태일 때 하염없이 기다리면
  // 화면이 아예 안 뜹니다. 그래서 NET_TIMEOUT 만큼만 기다리고 캐시로 넘어갑니다.
  const isPage = req.mode === 'navigate' || (req.destination === 'document');
  if (isPage) {
    e.respondWith(pageFirst(req));
    return;
  }

  // 나머지는 주소에 ?v=버전 이 붙어 있어 캐시를 먼저 봐도 안전합니다
  e.respondWith(
    caches.match(req).then((hit) => hit || withTimeout(fetch(req), NET_TIMEOUT).then((res) => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
      }
      return res;
    }))
  );
});
