export interface JwtPayload {
    userId?: string;
    username?: string;
    role: string;
    sub: string;
    // Otros campos...
}