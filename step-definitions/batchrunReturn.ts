import { spawn } from 'child_process';

/**
 * Runs a Java jar and returns the string found after the marker.
 */
function runJarAndExtract(jarPath: string, args: string[], marker: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const javaArgs = ['-jar', jarPath, ...args];
    const javaProcess = spawn('java', javaArgs);
    let outputBuffer = '';
    let extractedValue: string | null = null;

    javaProcess.stdout.on('data', (data: Buffer) => {
      outputBuffer += data.toString();
      
      // If we haven't found the marker yet, look for it
      if (!extractedValue) {
        const startIndex = outputBuffer.indexOf(marker);
        if (startIndex !== -1) {
          // Extract everything after the marker
          extractedValue = outputBuffer.substring(startIndex + marker.length).trim();
        }
      }
    });

    javaProcess.on('close', (code: number) => {
      if (code === 0) {
        resolve(extractedValue);
      } else {
        reject(new Error(`Java process exited with error code ${code}`));
      }
    });

    javaProcess.on('error', (err: Error) => {
      reject(err);
    });
  });
}

// Example usage:
async function main() {
  try {
    const result = await runJarAndExtract('my-app.jar', ['--input', 'data.txt'], 'not eligible) ');
    
    if (result) {
      console.log(`Successfully extracted: ${result}`);
    } else {
      console.log("Marker not found in output.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
