import {Transform, Type} from "class-transformer";

export class ApiResponse<T> {
    success: boolean;
    message?: string;
    @Type(() => Date)
    @Transform(({ value }) => value.toISOString(), { toPlainOnly: true })
    expiresAt?: Date;

    constructor(success: boolean, message?: string, expiresAt?: Date) {
        this.success = success;
        this.message = message;
        this.expiresAt = expiresAt;
    }
}
