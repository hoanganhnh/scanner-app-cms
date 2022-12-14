module.exports = (plugin) => {
  plugin.controllers.user.updateMe = async (ctx) => {
    await strapi
      .query("plugin::users-permissions.user")
      .update({
        where: { id: ctx.state.user.id },
        data: ctx.request.body,
      })
      .then((res) => {
        ctx.response.status = 200;
      });
  };

  plugin.routes["content-api"].routes.push({
    method: "POST",
    path: "/users/update-me",
    handler: "user.updateMe",
    config: {
      prefix: "",
      policies: [],
    },
  });

  return plugin;
};
