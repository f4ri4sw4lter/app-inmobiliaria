import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return{
        NODE_ENV: process.env.NODE_ENV,
        DB_URI: process.env.DB_URI,
    };
});