const TYPES_MAP = {
  "blog": "https://medium.com/new-story",
  "drawing": "https://docs.google.com/drawings/create",
  "email": "https://mail.google.com/mail/u/0/#inbox?compose=new",
  "gif": "https://giphy.com/upload",
  "gist": "https://gist.github.com/",
  "image": "https://imgur.com/upload",
  "issue": null,
  "pen": "https://codepen.io/pen",
  "pin": "https://www.pinterest.com/pin-builder",
  "post": "https://www.reddit.com/submit",
  "product": "https://www.producthunt.com/posts/new",
  "project": "https://www.behance.net/portfolio/editor",
  "repo": "https://github.com/new",
  "sandbox": "https://codesandbox.io/s/",
  "shot": "https://dribbble.com/shots/new",
  "subreddit": "https://www.reddit.com/subreddits/create",
  "thread": "https://spectrum.chat/new/thread",
  "tweet": "https://twitter.com/compose/tweet",
}

function redirect(details) {
  let blockingResponse = {
    redirectUrl: ''
  }
  // 1. Validate user is authenticated to use service
  //    - chrome.storage.sync.get('auth') --> validated: Boolean

  // 2. If validated...
  const { url } = details
  const productOrServiceType = url.split('://')[1].split('.')[0]
  blockingResponse.redirectUrl = TYPES_MAP[productOrServiceType]

  // 3. If not validated:
  //    - check URL in blacklist (Google services: doc.new, sheet.new, slide.new, etc.)
  //    - open `license.html` page --> opportunity to purchase and/or input license
  blockingResponse.redirectUrl = ''// chrome.createUrl(`license.html`)

  return blockingResponse
}

chrome.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: ['*://*.new/'] },
  [ 'blocking' ],
)
