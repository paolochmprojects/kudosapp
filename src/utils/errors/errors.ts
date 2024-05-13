export class BadRequestException extends Error {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = "BadRequest";
        this.statusCode = 400;
    }
}

export class InternalServerException extends Error {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = "InternalServer";
        this.statusCode = 500;
    }
}

export class UnauthorizedException extends Error {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = "Unauthorized";
        this.statusCode = 401;
    }
}

export class NotFoundException extends Error {
    statusCode: number;
    constructor(message: string) {
        super(message);
        this.name = "NotFound";
        this.statusCode = 404;
    }
}
