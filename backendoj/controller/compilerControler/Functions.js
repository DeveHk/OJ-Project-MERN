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
    case "java":
      {
        filename = `${jobId}.java`;
        dir = path.join(dirCodes, "java");
      }
      break;
    /* case "java":
      {
        const mainclass = extractClassName(code);
        ////console.log(mainclass);
        filename = `${mainclass}.java`;
        const javafiledir = path.join(dirCodes, "java");
        genDir(javafiledir);
        dir = path.join(javafiledir, jobId);
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
        filename = `${jobId}.out`;
        const dir = path.join(dirOutputs, language == "c" ? "c" : "cpp");
        genDir(dir);
        filepath = path.join(dir, filename);
        compileString = `${
          language == "c" ? "gcc" : "g++"
        } \"${filepathcode}\" -o \"${filepath}\"`;
        exeString = (input) => `\"${filepath}\" < \"${input}\"`;
      }
      break;
    case "py":
    case "python":
      {
        exeString = (input) => `python  -u \"${filepathcode}\" < \"${input}\"`;
      }
      break;
    case "java":
      {
        exeString = (input) => `java \"${filepathcode}\" < \"${input}\"`;
      }
      break;
    /* case "java":
      {
        const dirpath = path.dirname(filepathcode).split("/").slice(-1)[0];
        console.log("[giving paths]", filepathcode, dirpath, jobId);
        filename = `${jobId}`;
        const filedir = path.join(dirCodes, "java");
        const dir = path.join(filedir, dirpath);
        genDir(dir);
        filepath = path.join(dir, filename);
        compileString = `javac \"${filepathcode}\"`;
        exeString = (input) => `java \"${filepath}\" < \"${input}\"`;
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
      console.log(err);
      if (language == "c" || language == "cpp" || language == "c++")
        throw parseErrorsCpp(err, jobId);
      throw err;
    }

  /*Execution*/
  try {
    const outputPromises = inputValue.map(async (input, i) => {
      const inputFile = await writeInputToFile(input, i);
      console.log(inputFile);
      const { stdout } = await cmdExe(exeString(inputFile));
      console.log(stdout);
      return stdout;
    });
    const outputValue = await Promise.all(outputPromises);
    return outputValue;
  } catch (err) {
    console.log(err);
    throw { status: 2, error: String(err) };
  }
};

export const executeCheck = async (filepathcode, language, testcases) => {
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
        filename = `${jobId}.out`;
        const dir = path.join(dirOutputs, language == "c" ? "c" : "cpp");
        genDir(dir);
        filepath = path.join(dir, filename);
        compileString = `${
          language == "c" ? "gcc" : "g++"
        } \"${filepathcode}\" -o \"${filepath}\"`;
        exeString = (input) => `\"${filepath}\" < \"${input}\"`;
      }
      break;
    case "py":
    case "python":
      {
        exeString = (input) => `python  -u \"${filepathcode}\" < \"${input}\"`;
      }
      break;
    case "java": {
      exeString = (input) => `java \"${filepathcode}\" < \"${input}\"`;
    }
  }
  let compileOut, codeOut;
  /*Compilation*/
  if (compileString)
    try {
      compileOut = await cmdExe(compileString);
    } catch (err) {
      if (language == "c" || language == "cpp" || language == "c++") {
        throw parseErrorsCpp(err, jobId);
      }
      throw err;
    }

  /*Execution*/
  let maxExecutionTime = 0;
  for (const [i, testcase] of testcases.entries()) {
    const inputFile = await writeInputToFile(testcase.testin, i);
    const { stdout, executionTime } = await cmdExe(exeString(inputFile));
    maxExecutionTime = Math.max(maxExecutionTime, executionTime);
    const cmpOut = JSON.stringify(stdout.replaceAll("\r\n", "\n"));
    const cmpTestOut = JSON.stringify(testcase.testout);
    if (cmpOut === cmpTestOut) {
      continue;
    }
    console.log("CASE:", i, cmpOut === cmpTestOut);
    console.log("Expected:\n", cmpTestOut);
    console.log("Output:\n", cmpOut);
    // Compare lengths
    console.log("Length of Expected:", cmpTestOut.length);
    console.log("Length of Output:", cmpOut.length);
    throw { status: 2, error: `failed at testcase ${i + 1}` };
  }
  return maxExecutionTime;
  /* const outputPromises = testcases.map(async (testcase, i) => {
    const inputFile = await writeInputToFile(testcase.testin, i);
    console.log(inputFile);
    const output = await cmdExe(exeString(inputFile));
    const cmpOut = JSON.stringify(output.replaceAll("\r\n", "\n"));
    const cmpTestOut = JSON.stringify(testcase.testout);
    if (cmpOut == cmpTestOut) return true;
    console.log("CASE:", i, output == testcase.testout);
    console.log("Expected:\n", cmpTestOut);
    console.log("Output:\n", cmpOut);

    // Compare lengths
    console.log("Length of Expected:", cmpTestOut.length);
    console.log("Length of Output:", cmpOut.length);
    throw { status: 2, error: `failed at testcase ${i+1}` };
  });
  const outputValue = await Promise.all(outputPromises);
  return outputValue;*/
};

const cmdExe = (exeString) => {
  console.log(exeString);
  return new Promise((resolve, reject) => {
    const start = process.hrtime();
    exec(exeString, (err, stdout, stderr) => {
      const end = process.hrtime(start);
      const executionTime = end[0] * 1000 + end[1] / 1e6;
      if (stderr) reject(new Error(stderr));
      if (err) reject(err);
      resolve({ stdout, executionTime });
    });
  });
};

function parseErrorsCpp(errorLog, filename) {
  const errorLogString = String(errorLog);
  const errorLines = errorLogString
    .split("\n")
    .filter((line) => line.includes("error:"));
  const errorCount = errorLines.length;

  const formattedErrors = errorLines.map((line) => {
    console.log(filename);
    return line.split(filename)[1];
  });

  return { status: 1, errorCount, formattedErrors };
}
