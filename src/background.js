const TYPES_MAP = {
  "email": "https://mail.google.com/mail/u/0/#inbox?compose=new",
  "gif": "https://gfycat.com/upload",
  "gist": "https://gist.github.com/",
  "image": "https://imgur.com/upload",
  "issue": null,
  "pin": "https://www.pinterest.com/pin-builder",
  "post": "https://www.reddit.com/submit",
  "product": "https://www.producthunt.com/posts/new",
  "project": "https://www.behance.net/portfolio/editor",
  "repo": "https://github.com/new",
  "shot": "https://dribbble.com/shots/new",
  "subreddit": "https://www.reddit.com/subreddits/create",
  "thread": "https://spectrum.chat/new/thread",
}

function redirect(details) {
  const { url } = details
  const productOrServiceType = url.split('://')[1].split('.')[0]
  return {
    redirectUrl: TYPES_MAP[productOrServiceType]
  }
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: ['*://*.new/'] },
  [ 'blocking' ],
)
