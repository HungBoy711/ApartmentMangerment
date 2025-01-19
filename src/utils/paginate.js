const paginate = (req, query) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * limit;
    return {
        results: query.skip(skip).limit(limit),
        pagination: { page, limit, skip }
    };
}

module.exports = paginate;