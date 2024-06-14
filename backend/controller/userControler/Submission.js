import { ObjectId } from "mongodb";
import Submission from "../../models/Submission.js";
import Problem from "../../models/Problem.js";

export const submissionHandler = async (req, res) => {
  try {
    const user_id = new ObjectId(req.user._id);
    //console.log(user_id);
    const submissions = await Submission.aggregate([
      {
        $match: {
          user_id,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return res.status(200).json({
      message: "[RESPONSE SUBMISSION DATA]",
      submissions,
    });
  } catch (error) {
    //console.error("Error fetching problems:", error);
    return res.status(500).json({
      message: "[SERVER ERROR] Unable to fetch Profile",
      error: error.message,
    });
  }
};
