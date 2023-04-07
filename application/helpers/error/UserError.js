class UserError extends Error {
    constructor(message, redirectULR, status) {
        super(message);
        this.redirectULR = redirectULR;
        this.status = status;
    }
    getMessage() {
        return this.Message;
    }

    getRedirectURL() {
        return this.redirectULR;
    }

    getStatus() {
        return this.status;
    }
}

module.exports = UserError;