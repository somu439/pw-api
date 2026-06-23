import { execSync } from 'child_process';
import * as path from 'path';

export function extractPasswordFromJar(): string {
    const utilsDir = path.resolve(__dirname);
    const output = execSync('java -jar myjar.jar read.txt', {
        cwd: utilsDir,
        encoding: 'utf-8'
    });
    const match = output.match(/password\s+is\s+(\S+)/i);
    if (!match) throw new Error(`Password not found in jar output: ${output}`);
    return match[1];
}
