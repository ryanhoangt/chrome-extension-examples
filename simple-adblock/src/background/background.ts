chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    const url = details.url;
    const filters = ["googleadservices", "googlesyndication", "g.doubleclick"];
    console.log(details);
    for (const filter of filters) {
      if (url.indexOf(filter) !== -1) {
        return {
          cancel: true,
        };
      }
    }
    return {
      cancel: false,
    };
  },
  {
    urls: ["<all_urls>"],
  },
  ["blocking"] // block requests until the listener execution has completed
);
