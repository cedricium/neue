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
    // 3. If not validated:
    //    - open `license.html` page --> opportunity to purchase and/or input license
    redirectUrl = 'https://www.example.com/'// chrome.createUrl(`license.html`)
  }
  return { redirectUrl }
}

chrome.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: ['*://*.new/'] },
  [ 'blocking' ],
)

// TODO - remove before publishing
chrome.browserAction.onClicked.addListener(function(tabs) {
  const auth = {
    licenseKey: 'asdf-qwerty-poiuy-2342jk',
  }
  chrome.storage.sync.set(auth)
  // chrome.storage.sync.clear()
})
