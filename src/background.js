(function() {
  chrome.storage.sync.get('licenseKey', function(items) {
    authCache.licenseKey = items.licenseKey || null
  })
  chrome.storage.onChanged.addListener(function (changes, area) {
    console.log(changes, area)
    if (area === 'sync' && 'licenseKey' in changes) {
      authCache.licenseKey = changes.licenseKey.newValue
    }
  })
})()

let authCache = {}

function redirect(details) {
  let redirectUrl = ''
  const { url } = details
  const productOrServiceType = url.split('://')[1].split('.')[0]
  const licenseKey = authCache.licenseKey || null

  if (BLACK_LIST.includes(productOrServiceType)) {
    return
  } else if (authCache && Object.keys(authCache).length > 0 && licenseKey) {
    redirectUrl = TYPES_MAP[productOrServiceType]
  } else {
    redirectUrl = chrome.runtime.getURL('pages/license/build/index.html')
  }
  return { redirectUrl }
}

chrome.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: ['*://*.new/'] },
  [ 'blocking' ],
)

chrome.runtime.onInstalled.addListener(function(details) {
  const { reason } = details
  if (reason === 'install') {
    const licenseUrl = chrome.runtime.getURL('pages/license/build/index.html')
    chrome.tabs.create({
      url: licenseUrl,
      active: true,
    })
  }
})
