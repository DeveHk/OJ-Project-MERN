import Submission from "../../models/Submission.js";
import Testcase from "../../models/Testcase.js";
import { generateFile } from "./CompilerFunctions.js";
import { executeCheck } from "./SubmissionFunctions.js";
export const submission = async (req, res) => {
  const user_id = req.user._id;
  const { prob_id, lang = "cpp", code } = req.body;
  if (!code) {
    return res
      .status(400)
      .send({ success: false, message: "[Code is Missing]" });
  }

  const filepath = generateFile(lang, code);

  const testcases = await Testcase.find({ problem_id: prob_id });
  console.log(filepath, "[INTPUJT]:", testcases);
  try {
    const exeTime = await executeCheck(filepath, lang, testcases);
    console.log(exeTime);
    const submission = await Submission.create({
      prob_id,
      code_ref: filepath,
      language: lang,
      verdict: true,
      comment: "ALL PASSED",
      user_id,
      execution_time: exeTime,
    });
    return res.status(200).json({
      success: true,
      message: "[Successful]",
      submission,
    });
  } catch (err) {
    if (err.status == 1) {
      const submission = await Submission.create({
        prob_id,
        code_ref: filepath,
        language: lang,
        verdict: false,
        comment: "Compilation Error",
        user_id,
        execution_time: 0,
      });
      return res.status(400).send({
        success: false,
        message: "[Compilation Failed]",
        error: err,
        submission,
      });
    }
    if (err.status == 2) {
      const submission = await Submission.create({
        prob_id,
        code_ref: filepath,
        language: lang,
        verdict: false,
        comment: err.error,
        user_id,
        execution_time: 0,
      });
      return res.status(401).send({
        success: false,
        message: "[Test Case Failed]",
        error: err,
        submission,
      });
    }
    return res.status(500).send({
      success: false,
      message: "[Internal Server Error]",
      error: err.message,
    });
  }
};
