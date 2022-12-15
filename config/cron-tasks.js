const { Strapi } = require("@strapi/strapi/lib/Strapi");

const formatCurrentDate = require("../src/utils/time");
const { handleSendNotification } = require("../src/utils/notification");

async function findNotification(userId, message, productId) {
  const noti = await strapi.db
    .query("api::notification.notification")
    .findMany({
      where: {
        userId,
        message,
        productId,
      },
    });
  return noti[0];
}

async function publishedNotifications() {
  const notifiocations = await strapi.db
    .query("api::notification.notification")
    .findMany({
      where: {
        publishedAt: {
          $null: true,
        },
      },
    });

  await Promise.all(
    notifiocations.map((notifiocation) => {
      return strapi.entityService.update(
        "api::notification.notification",
        notifiocation.id,
        {
          data: {
            publishedAt: new Date(),
          },
        }
      );
    })
  );
}

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */

  /* \[SECOND (optional)\] [MINUTE] \[HOUR\] [DAY OF MONTH] \[MONTH OF YEAR\] [DAY OF WEEK] */
  // send expire date product
  pushNotificationExpireDateProduct: {
    task: async () => {
      const products = await strapi.db.query("api::product.product").findMany({
        where: {
          expireDate: {
            $eq: formatCurrentDate(),
          },
        },
      });
      const productNotifications = await Promise.all(
        products.map(async (product) => {
          const token = await strapi.db
            .query("api::token-device.token-device")
            .findOne({
              where: {
                userId: {
                  $eq: product.userId,
                },
              },
            });
          return {
            name: product.name,
            tokenDevice: token !== null ? token.token : null,
            userId: product.userId,
            productId: product.id,
          };
        })
      );

      for (const product of productNotifications) {
        if (!product.tokenDevice) {
          continue;
        }
        const message = `Product ${product.name} is expired !`;
        const notification = await findNotification(
          product.userId,
          message,
          product.productId
        );

        if (!notification && product.tokenDevice !== null) {
          const noti = await strapi.entityService.create(
            "api::notification.notification",
            {
              data: {
                message,
                userId: product.userId,
                productId: product.productId,
              },
            }
          );

          if (noti.id) {
            await handleSendNotification(
              product.tokenDevice,
              "Expire product",
              message,
              {
                ...product,
                messageId: noti.id,
              }
            );
          }
        }
      }

      await publishedNotifications();
    },
    options: {
      rule: "* * * * *",
    },
  },
  pushNotificationBestBeforeDateProduct: {
    task: async () => {
      const products = await strapi.db.query("api::product.product").findMany({
        where: {
          bestBeforeDay: {
            $eq: formatCurrentDate(),
          },
        },
      });

      const productNotifications = await Promise.all(
        products.map(async (product) => {
          const token = await strapi.db
            .query("api::token-device.token-device")
            .findOne({
              where: {
                userId: {
                  $eq: product.userId,
                },
              },
            });
          return {
            name: product.name,
            tokenDevice: token !== null ? token.token : null,
            userId: product.userId,
            productId: product.id,
          };
        })
      );

      for (const product of productNotifications) {
        if (!product.tokenDevice) {
          continue;
        }
        const message = `Product ${product.name} is about to expired !`;
        const notification = await findNotification(
          product.userId,
          message,
          product.productId
        );

        if (!notification && product.tokenDevice !== null) {
          const noti = await strapi.entityService.create(
            "api::notification.notification",
            {
              data: {
                message,
                userId: product.userId,
                productId: product.productId,
              },
            }
          );

          if (noti.id) {
            await handleSendNotification(
              product.tokenDevice,
              "Expire product",
              message,
              {
                ...product,
                messageId: noti.id,
              }
            );
          }
        }
      }

      await publishedNotifications();
    },
    options: {
      rule: "* * * * *",
    },
  },
};
