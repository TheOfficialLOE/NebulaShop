
module.exports = class MyPrismaException extends Error {
    constructor(code, message) {
        super(code);
        this.code = code;
        this.message = message;
    }
};