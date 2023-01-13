// console.log("Hello from SW!");
// console.log(this);

/*
let time;

// this goes to sleep after a while (since SW goes to sleep)
setInterval(() => {
  time += 1;
  console.log(time);
}, 1000);
*/

chrome.alarms.create({
  periodInMinutes: 1 / 60,
});

chrome.alarms.onAlarm.addListener((alarm) => {
  //   console.log(alarm);
  chrome.storage.local.get(["timer", "isRunning"], (res) => {
    const time = res.timer ?? 0;
    const isRunning = res.isRunning ?? true;

    if (!isRunning) return;

    chrome.storage.local.set({
      timer: time + 1,
    });

    chrome.action.setBadgeText(
      {
        text: `${time + 1}`,
      }
      //   () => {
      //     console.log("Finished setting badge text");
      //   }
    );

    chrome.storage.sync.get(["notificationTime"], (res) => {
      const notificationTime = res.notificationTime ?? 1000;

      if (time != 0 && time % notificationTime == 0) {
        this.registration.showNotification("Chrome Timer Extension", {
          body: `${notificationTime} seconds has passed!`,
          icon: "icon.png",
        });
      }
    });
  });
});
