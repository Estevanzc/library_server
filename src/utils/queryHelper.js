const getPagination = (query) => {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    
    return { limit, offset };
};

const getMonthWindow = () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
};

module.exports = {
    getPagination,
    getMonthWindow
};