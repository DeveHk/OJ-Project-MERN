import { executeCpp, generateFile } from "./Functions.js";

export const compiler = async (req, res) => {
  try {
    //1. Check all parameters there
    const { language = "cpp", code } = req.body;
    if (!code) {
      return res
        .status(400)
        .send({ success: false, message: "[Code is Missing]" });
    }
    const filepath = generateFile(language, code);
    const output = await executeCpp(filepath, language);
    console.log(output);
    return res.status(200).json({
      success: true,
      message: "[Successful Compilation]",
      filepath,
      output,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "[Internal Server Error]",
      error: err.message,
    });
  }
};
