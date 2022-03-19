
const responseObject = (success = true, data = {}) => {
    return {
        success,
        data
    };
};

module.exports.findMany = async (prisma, where, select = null) => {

    return await prisma.findMany({
        where,
        select
    }).then(date => {
        return responseObject(true, date);
    }).catch(err => {
        return responseObject(false, err);
    });

};

module.exports.findFirst = async (prisma, where, select = null) => {
    return await prisma.findFirst({
       where,
       select
    }).then(data => {
        return responseObject(true, data);
    }).catch(err => {
        return responseObject(false, err);
    });
}

module.exports.findUnique = async (prisma, where, select = null) => {
    return await prisma.findUnique({
       where,
       select
    }).then(data => {
        return responseObject(true, data);
    }).catch(err => {
        return responseObject(false, err);
    });
}

module.exports.create = async (prisma, data, include = null) => {

    return await prisma.create({
        data,
        include
    }).then(data => {
        return responseObject(true, data);
    }).catch(err => {
        return responseObject(false, err);
    });


};

