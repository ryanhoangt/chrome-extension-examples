// confirm("hello from content script");

const texts = [];

// manipulate/collect information on the webpages user visitted.
const aTags = document.getElementsByTagName("a");
for (const tag of aTags) {
  if (tag.textContent.includes("i")) {
    tag.style = "background-color: yellow;";
  }

  texts.push(tag.textContent);
}

// chrome.storage.local.set({ texts });

chrome.runtime.sendMessage(null, texts, (resp) => {
  console.log("from the send resp func: " + resp);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  console.log(sender);
});
