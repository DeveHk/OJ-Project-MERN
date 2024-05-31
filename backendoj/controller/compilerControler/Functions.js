import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";
import exp from "constants";
import { exec } from "child_process";

/*Create if the directory not exists*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirCodes = path.join(__dirname, "codes");
const dirOutputs = path.join(__dirname, "outputs");
const dirTempinput = path.join(__dirname, "tempInput");
[dirCodes, dirOutputs, dirTempinput].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});
const genDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};
//////////////////////////////////////

/*For Java Get PUBLIC class*/
const extractClassName = (code) => {
  const match = code.match(/public\s+class\s+(\w+)/);
  if (!match) {
    throw new Error("Invalid Java code: no public class found.");
  }
  return match[1];
};
/////////////////////////////////
/**Write Input to temp file */
const writeInputToFile = async (input, i) => {
  const fileTempinput = path.join(dirTempinput, `temp${i}.txt`);
  await fs.promises.writeFile(fileTempinput, input);
  return fileTempinput;
};
////////////////////////////////////
/*Generate Code File of the respective language */
export const generateFile = (language, code) => {
  const jobId = uuid();
  let filename;
  let filepath;
  let dir;
  switch (language) {
    case "c++":
    case "cpp":
      {
        filename = `${jobId}.cpp`;
        dir = path.join(dirCodes, "cpp");
      }
      break;
    case "c":
      {
        filename = `${jobId}.c`;
        dir = path.join(dirCodes, "c");
      }
      break;
    case "py":
    case "python":
      {
        filename = `${jobId}.py`;
        dir = path.join(dirCodes, "py");
      }
      break;
    /*case "java":
      {
        const mainclass = extractClassName(code);
        ////console.log(mainclass);
        filename = `${mainclass}.java`;
        const javafiledir = path.join(dirCodes, "java");
        genDir(javafiledir);
        dir = path.join(javafiledir, jobId);
      }
      break;
    case "js":
    case "javascript":
      {
        filename = `${jobId}.js`;
        dir = path.join(dirCodes, "js");
      }
      break;*/
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
  genDir(dir);
  filepath = path.join(dir, filename);
  //console.log(filepath);
  fs.writeFileSync(filepath, code);
  return filepath;
};
/////////////////////////////////////////////

export const execute = async (filepathcode, language, inputValue) => {
  const jobId = path.basename(filepathcode).split(".")[0];
  let filename;
  let filepath;
  let exeString;
  let compileString = "";
  switch (language) {
    case "c++":
    case "c":
    case "cpp":
      {
        filename = `${jobId}.exe`;
        const dir = path.join(dirOutputs, language == "c" ? "c" : "cpp");
        genDir(dir);
        filepath = path.join(dir, filename);
        compileString = `${
          language == "c" ? "gcc" : "g++"
        } \"${filepathcode}\" -o \"${filepath}\" -mconsole`;
        exeString = (input) => `\"${filepath}\" < \"${input}\"`;
      }
      break;
    case "py":
    case "python":
      {
        exeString = (input) => `python  -u \"${filepathcode}\" < \"${input}\"`;
      }
      break;
    /* case "js":
    case "javascript":
      {
        exeString = (input) => `node \"${filepathcode}\" < \"${input}\"`;
      }
      break;
    case "java":
      {
        filename = `${jobId}.java`;
        const dir = path.join(dirOutputs, "java");
        genDir(dir);
        filepath = path.join(dir, filename);
      }
      break;*/
  }
  let compileOut, codeOut;
  /*Compilation*/
  if (compileString)
    try {
      compileOut = await cmdExe(compileString);
    } catch (err) {
      if (language == "c" || language == "cpp" || language == "c++")
        throw parseErrorsCpp(err, jobId);
      throw err;
    }

  /*Execution*/
  try {
    const outputPromises = inputValue.map(async (input, i) => {
      const inputFile = await writeInputToFile(input, i);
      console.log(inputFile);
      return cmdExe(exeString(inputFile));
    });
    const outputValue = await Promise.all(outputPromises);
    return outputValue;
  } catch (err) {
    console.log(err);
    throw { status: 2, error: String(err) };
  }
};

const cmdExe = (exeString) => {
  console.log(exeString);
  return new Promise((resolve, reject) => {
    exec(exeString, (err, stdout, stderr) => {
      if (stderr) reject(new Error(stderr));
      if (err) reject(err);
      resolve(stdout);
    });
  });
};
