chrome.runtime.onInstalled.addListener((details) => {
  /// set default values for fields in storage
  chrome.storage.local.set({
    shows: [],
  });

  /// create context menu when the onInstalled event is fired
  chrome.contextMenus.create({
    title: "Test Context Menu",
    id: "contextMenu1",
    contexts: ["page", "selection"], // the menu will appear when right-clicking in the page or after selecting a text
  });

  chrome.contextMenus.create({
    title: "Read This Text",
    id: "contextMenu2",
    contexts: ["page", "selection"],
  });
});

// The mutual click handler for all menu items.
// Notice that this handler must be registered outside the "runtime.OnInstalled"
// handler. Otherwise once the service worker goes to sleep, the listeners won't
// get register properly the next time it wakes up.
chrome.contextMenus.onClicked.addListener((event) => {
  console.log(event);

  //   chrome.search.query({
  //     disposition: "NEW_TAB",
  //     text: `imdb ${event.selectionText || ""}`,
  //   });

  //   chrome.tabs.query(
  //     {
  //       currentWindow: true,
  //     },
  //     (tabs) => {
  //       console.log(tabs);
  //     }
  //   );

  //   chrome.tabs.create({
  //     url: `https://www.imdb.com/find?q=${event.selectionText || ""}`,
  //   });

  if (event.menuItemId === "contextMenu1") {
    fetch("https://api.tvmaze.com/search/shows?q=marvel")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        chrome.storage.local.set({
          shows: data,
        });
      });
  } else if (event.menuItemId === "contextMenu2") {
    chrome.tts.speak(event.selectionText, {
      lang: "zh-CN",
      rate: 0.9,
    });
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(msg);
  console.log(sender);
  sendResponse("received msg inside bg");
  chrome.tabs.sendMessage(sender.tab.id, "Got your msg inside bg");
});

// console.log("bg script running...");
