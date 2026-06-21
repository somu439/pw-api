import { spawn } from 'child_process';

/**
 * Runs a Java jar file and pipes output to the terminal.
 * @param jarPath Path to the .jar file
 * @param args Array of arguments to pass to the application
 */
function runJar(jarPath: string, args: string[]): void {
  // Construct the command arguments
  const javaArgs = ['-jar', jarPath, ...args];

  console.log(`Executing: java ${javaArgs.join(' ')}\n`);

  // Spawn the child process
  const javaProcess = spawn('java', javaArgs);

  // Stream standard output to terminal
  javaProcess.stdout.on('data', (data: Buffer) => {
    process.stdout.write(`[Java Output]: ${data.toString()}`);
  });

  // Stream standard error to terminal
  javaProcess.stderr.on('data', (data: Buffer) => {
    process.stderr.write(`[Java Error]: ${data.toString()}`);
  });

  // Handle process completion
  javaProcess.on('close', (code: number) => {
    console.log(`\nJava process exited with code ${code}`);
  });

  // Handle errors (e.g., java not found)
  javaProcess.on('error', (err: Error) => {
    console.error(`Failed to start Java process: ${err.message}`);
  });
}

// Example usage:
runJar('my-app.jar', ['--input', 'data.txt', '--verbose']);
