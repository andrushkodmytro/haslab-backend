module.exports = (model) => {
  return async (req, res, next) => {
    const { page = 1, limit = 5, sortBy, orderBy, search, ...filters } = req.query;

    const paginatedResult = {};
    const sort = {};

    if (sortBy && orderBy) {
      sort[req.query.sortBy] = orderBy === 'desc' ? -1 : 1;
    }

    let newFilters;
    if (Object.keys(filters).length);
    newFilters = {};
    for (let key in filters) {
      newFilters[key] = JSON.parse(filters[key]);
    }

    if(search){
      newFilters.name= { $regex: search, $options: "i" }
    }

    try {
      paginatedResult.data = await model
        .find(newFilters)
        .sort(sort)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const count = await model.countDocuments(newFilters);
      // paginatedResult.totalPages  = Math.ceil(count / limit)
      paginatedResult.totalPages = count;
      paginatedResult.page = +page;
      res.paginatedResult = paginatedResult;

      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
};
