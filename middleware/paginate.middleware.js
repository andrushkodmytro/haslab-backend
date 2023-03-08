module.exports = (model) => {
  return async (req, res, next) => {
    const { page = 1, limit = 5, sortBy, orderBy } = req.query;

    const paginatedResult = {};
    const sort = {};

    if (sortBy && orderBy) {
      console.log(sortBy, orderBy)
      sort[req.query.sortBy] = orderBy === 'desc' ? -1 : 1;
    }

    try {
      paginatedResult.data = await model
        .find()
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await model.countDocuments();
      // paginatedResult.totalPages  = Math.ceil(count / limit)
      paginatedResult.totalPages = count;
      paginatedResult.page = page;
      res.paginatedResult = paginatedResult;

      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
};
