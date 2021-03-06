
const generateResponse = (success = true, data = {}) => {
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
        return generateResponse(true, date);
    }).catch(err => {
        return generateResponse(false, err);
    });

};

module.exports.findFirst = async (prisma, where, select = null) => {
    return await prisma.findFirst({
       where,
       select
    }).then(data => {
        return generateResponse(true, data);
    }).catch(err => {
        return generateResponse(false, err);
    });
}

module.exports.findUnique = async (prisma, where, select = null) => {
    return await prisma.findUnique({
       where,
       select
    }).then(data => {
        return generateResponse(true, data);
    }).catch(err => {
        return generateResponse(false, err);
    });
}

module.exports.create = async (prisma, data, include = null) => {

    return await prisma.create({
        data,
        include
    }).then(data => {
        return generateResponse(true, data);
    }).catch(err => {
        return generateResponse(false, err);
    });

};

module.exports.createMany = async (prisma, data) => {

    return await prisma.createMany({
        data
    }).then(data => {
        return generateResponse(true, data);
    }).catch(err => {
        return generateResponse(false, err);
    });

}

module.exports.update = async (prisma, where, data) => {
    return await prisma.update({
        where,
        data
    }).then(data => {
        return generateResponse(true, data);
    }).catch(err => {
        return generateResponse(false, err);
    });
}

module.exports.updateMany = async (prisma, where, data) => {
    return await prisma.updateMany({
        where,
        data
    }).then(data => {
        return generateResponse(true, data);
    }).catch(err => {
       return generateResponse(false, err);
    });
};

