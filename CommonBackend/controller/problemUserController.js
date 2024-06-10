import mongoose from "mongoose";
import Problem from "../models/Problem.js";
import Testcase from "../models/Testcase.js";
export const readproblems = async (req, res) => {
  try {
    const counttag = req.body.page;
    if (!counttag) {
      return res.status(404).json({
        message: "[no Page number given]",
        success: false,
      });
    }
    const skip = (counttag - 1) * 4;
    const problems = await Problem.find({ active: true }).skip(skip).limit(4);
    return res.status(200).json({
      success: true,
      message: "[RESPONSE PROBLEMS]",
      problems: problems,
    });
  } catch (error) {
    console.error("Error fetching problems:", error);
    return res.status(500).json({
      success: false,
      message: "[SERVER ERROR] Unable to fetch problems",
      error: error.message,
    });
  }
};
export const readproblem = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id) {
      return res.status(404).json({
        message: "[no id given]",
        success: false,
      });
    }
    const problem = await Problem.findById(id);
    const testcases = await Testcase.find({
      problem_id: id,
      visible: true,
    });
    return res.status(200).json({
      success: true,
      message: "[RESPONSE PROBLEMS]",
      problem,
      testcases,
    });
  } catch (error) {
    console.error("Error fetching problems:", error);
    return res.status(500).json({
      success: false,
      message: "[SERVER ERROR] Unable to fetch problems",
      error: error.message,
    });
  }
};
