const { Expo } = require("expo-server-sdk");

const expo = new Expo({});

function handleSendNotifications(pushToken, { title, body }) {
  const messages = [];
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
  }
  messages.push({
    to: pushToken,
    sound: "default",
    title,
    body,
  });

  const chunks = expo.chunkPushNotifications(messages);
  (async () => {
    for (let chunk of chunks) {
      try {
        await expo.sendPushNotificationsAsync(chunk);
      } catch (error) {
        console.error(error);
      }
    }
  })();
}

async function handleSendNotification(pushToken, title, body, data = {}) {
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
  }
  const payload = {
    to: pushToken,
    sound: "default",
    title,
    body,
    data: JSON.stringify(data),
  };
  try {
    let receipts = await expo.sendPushNotificationsAsync([payload]);
    console.log(receipts);
  } catch (error) {
    console.error("Error send notifications !", error);
  }
}

module.exports = { handleSendNotifications, handleSendNotification };
