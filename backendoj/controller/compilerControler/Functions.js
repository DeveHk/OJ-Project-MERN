import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";
import exp from "constants";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname, "codes");
const dirOutputs = path.join(__dirname, "outputs");
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}
if (!fs.existsSync(dirOutputs)) {
  fs.mkdirSync(dirOutputs, { recursive: true });
}
export const generateFile = (language, code) => {
  const jobId = uuid();
  const filename = `${jobId}.${language}`;
  const filepath = path.join(dirCodes, filename);
  fs.writeFileSync(filepath, code);
  return filepath;
};

export const executeCpp = (filepathcode, language) => {
  const jobId = path.basename(filepathcode).split(".")[0];
  const filename = `${jobId}.${language == "cpp" ? "exe" : "out"}`;
  const filepath = path.join(dirOutputs, filename);
  console.log(filename, filepath);
  return new Promise((resolve, reject) => {
    exec(
      `g++ "${filepathcode}" -o "${filepath}" -mconsole && "${filepath}"`,
      //`g++ "${filepathcode}" -o "${filepath}" -mconsole && "${filepath}"`,
      (err, stdout, stderr) => {
        if (err) {
          reject(err);
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};
