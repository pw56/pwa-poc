// 1. 今「ブラウザ」で開いている場合のみ処理を実行
const isBrowser = !window.matchMedia('(display-mode: standalone)').matches;
alert(isBrowser);

if (isBrowser) {
  initPwaGuide();
}

async function initPwaGuide() {
  const ua = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isAndroid = /android/.test(ua);

  // --- Androidの場合 ---
  if (isAndroid && 'getInstalledRelatedApps' in navigator) {
    const relatedApps = await navigator.getInstalledRelatedApps();
    if (relatedApps.length > 0) {
      showGuideBanner('android-installed');
    }
  } 
  
  // --- iOSの場合 ---
  else if (isIOS) {
    // めんどくさいので無条件
    showGuideBanner('ios-installed');
  }
}

// 案内を表示する関数
function showGuideBanner(type) {
  let message = "";
  
  if (type === 'android-installed') {
    message = "【アプリ版が登録済です】<br>ブラウザの上部（URLバー）にある<strong>「アプリで開く」アイコン</strong>を押すか、ホーム画面のアイコンから起動してください。";
  } else if (type === 'ios-installed') {
    message = "【アプリ版が登録済です】<br>このサイトはアプリとしてホーム画面に追加されています。<strong>ホーム画面のアイコン</strong>から起動してください。";
  }

  const banner = document.createElement('div');
  banner.style.cssText = "position:fixed; top:0; left:0; width:100%; background:#1a1a1a; color:#fff; padding:15px; text-align:center; font-size:14px; z-index:9999; box-shadow:0 2px 10px rgba(0,0,0,0.3); line-height:1.5;";
  banner.innerHTML = message;
  
  // 閉じるボタンなどをつけると親切です
  document.body.prepend(banner);
}
