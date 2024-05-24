import Problem from "../models/Problem.js";
import Testcase from "../models/Testcase.js";

export const createproblem = async (req, res) => {
  console.log("[PROCEEDED createproblem]");
  try {
    const { title, difficulty, statement, testCases, active } = req.body;
    const newProblem = await Problem.create({
      u_id: req.user._id,
      title,
      difficulty,
      description: statement,
      testcasecount: testCases.length,
      active,
    });
    console.log(newProblem);
    const testCasePromises = testCases.map((tc) => {
      return Testcase.create({
        problem_id: newProblem._id,
        testin: tc.testin,
        testout: tc.testout,
        visible: tc.visible,
      });
    });
    await Promise.all(testCasePromises);

    res.status(201).json({
      message: "Problem and test cases created successfully",
      problem: newProblem,
    });
  } catch (err) {
    if (err.code == 11000)
      if (err.keyPattern["title"] !== undefined)
        return res.status(400).send({ message: "[USER EXISTS]", on: "title" });
    //console.log(err);
    return res.status(500).json({
      message: "Error WHile Creating Problem",
      error: err.message,
    });
  }
};

export const readProblem = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming `authenticateToken` middleware sets `req.user`
    console.log("[PROCEEDED readProblem]", req.user);

    const problems = await Problem.find({ u_id: userId });
    return res.status(200).json({
      message: "[RESPONSE PROBLEMS]",
      problems: problems,
    });
  } catch (error) {
    console.error("Error fetching problems:", error);
    return res.status(500).json({
      message: "[SERVER ERROR] Unable to fetch problems",
      error: error.message,
    });
  }
};
