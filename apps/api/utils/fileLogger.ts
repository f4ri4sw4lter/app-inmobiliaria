import * as fs from 'fs';
import * as path from 'path';

class FileLogger {
    private logFilePath: string;

    constructor(logFilePath: string) {
        this.logFilePath = logFilePath;

        // Verificar si el archivo existe, si no, crearlo
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '', { flag: 'w' });
        }
    }

    log(message: string): void {
        const currentDateTime = new Date().toLocaleString();
        const logMessage = `${currentDateTime} - ${message}\n`;

        // Escribir el mensaje en el archivo de log
        fs.appendFileSync(this.logFilePath, logMessage);
    }
}

export default FileLogger;
