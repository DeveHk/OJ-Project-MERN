import Problem from "../models/Problem.js";
import Testcase from "../models/Testcase.js";

export const createproblem = async (req, res) => {
  //console.log("[PROCEEDED createproblem]");
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
    //console.log(newProblem);
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
    ////console.log(err);
    return res.status(500).json({
      message: "Error WHile Creating Problem",
      error: err.message,
    });
  }
};

export const readProblemall = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming `authenticateToken` middleware sets `req.user`
    //console.log("[PROCEEDED readProblem]", req.user);

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

export const readProblem = async (req, res) => {
  try {
    const problemId = req.params.problemId;
    //console.log("[PROCEEDED readProblem]", problemId);
    const problem = await Problem.findById(problemId);
    const testcases = await Testcase.find({ problem_id: problemId });
    return res.status(200).json({
      message: "[RESPONSE TESTCASE]",
      problem,
      testcases,
    });
  } catch (error) {
    console.error("Error fetching problems:", error);
    return res.status(500).json({
      message: "[SERVER ERROR] Unable to fetch problems",
      error: error.message,
    });
  }
};

export const updateproblem = async (req, res) => {
  //console.log("[PROCEEDED updateproblem]");
  try {
    const problemId = req.params.problemId; // Get problemId from params
    const userId = req.user._id; // Assuming `authenticateToken` middleware sets `req.user`
    const { title, difficulty, statement, testCases, active } = req.body;

    // Find the problem by its ID
    const problem = await Problem.findOne({ _id: problemId });

    // Check if the user is authorized to update the problem
    if (userId != problem._doc.u_id) {
      return res.status(400).json({
        message: "[You Are Not Authorized to update this]",
      });
    }

    // Update the problem details
    const updatedProblem = await Problem.findByIdAndUpdate(
      problemId,
      {
        $set: {
          title,
          difficulty,
          description: statement,
          testcasecount: testCases.length,
          active,
        },
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    // Update test cases
    // Remove existing test cases
    await Testcase.deleteMany({ problem_id: problemId });

    // Create new test cases
    const testCasePromises = testCases.map((tc) => {
      return Testcase.create({
        problem_id: updatedProblem._id,
        testin: tc.testin,
        testout: tc.testout,
        visible: tc.visible,
      });
    });
    await Promise.all(testCasePromises);
    // //console.log(testCasePromises);
    ////console.log(updatedProblem);
    return res.status(200).json({
      message: "Problem and test cases updated successfully",
      problem: updatedProblem,
    });
  } catch (err) {
    // //console.log(err);
    if (err.code == 11000)
      if (err.keyPattern["title"] !== undefined)
        return res.status(400).send({ message: "[TITLE EXISTS]", on: "title" });
    return res.status(500).json({
      message: "Error While Updating Problem",
      error: err.message,
    });
  }
};

export const disableproblem = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming `authenticateToken` middleware sets `req.user`
    const problemId = req.params.problemId;
    //console.log("[PROCEEDED disableproblem]", req.user);
    const problem = await Problem.findOne({ _id: problemId });
    if (userId != problem.u_id) {
      return res.status(400).json({
        message: "[You Are Not Authorized to disable this]",
      });
    }
    const updatedProblem = await Problem.findByIdAndUpdate(
      problemId,
      { $set: { active: !problem.active } },
      { new: true } // Return the updated document
    );
    return res.status(200).json({
      message: "[RESPONSE PROBLEMS]",
      problems: updatedProblem,
    });
  } catch (error) {
    console.error("Error fetching problems:", error);
    return res.status(500).json({
      message: "[SERVER ERROR] Unable to fetch problems",
      error: error.message,
    });
  }
};
