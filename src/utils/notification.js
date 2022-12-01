const { Expo } = require("expo-server-sdk");

const expo = new Expo({});

function handleSendNotifications(pushToken) {
  const messages = [];
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
  }
  messages.push({
    to: pushToken,
    sound: "default",
    title: "Title",
    body: "This is a test notification",
  });

  const chunks = expo.chunkPushNotifications(messages);
  (async () => {
    for (let chunk of chunks) {
      try {
        console.log(chunk);
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log(receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
}

async function handleSendNotification(pushToken, title, body, data = {}) {
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    return;
  }
  const payload = {
    to: pushToken,
    sound: "default",
    title,
    body,
    body,
    data,
    priority: "high",
  };
  try {
    let receipts = await expo.sendPushNotificationsAsync([payload]);
    console.log(receipts);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { handleSendNotifications, handleSendNotification };
