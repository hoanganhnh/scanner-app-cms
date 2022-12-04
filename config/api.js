module.exports = {
  responses: {
    privateAttributes: [
      "_v",
      "id",
      "created_at",
      // "createdAt",
      "updatedAt",
      "publishedAt",
    ],
  },
  rest: {
    defaultLimit: 25,
    maxLimit: 100,
    withCount: true,
  },
};
