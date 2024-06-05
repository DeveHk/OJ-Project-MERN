import { execute, generateFile } from "./Functions.js";
export const compiler = async (req, res) => {
  try {
    const { lang = "cpp", code, inputValue = [] } = req.body;
    if (!code) {
      return res
        .status(400)
        .send({ success: false, message: "[Code is Missing]" });
    }
    const filepath = generateFile(lang, code);
    console.log(filepath, "[INTPUJT]:", inputValue);
    const output = await execute(filepath, lang, inputValue);
    console.log(output);
    return res.status(200).json({
      success: true,
      message: "[Successful]",
      filepath,
      output,
    });
  } catch (err) {
    if (err.status == 1) {
      return res.status(400).send({
        success: false,
        message: "[Compilation Failed]",
        error: err,
      });
    }
    if (err.status == 2) {
      return res.status(401).send({
        success: false,
        message: "[Execution Failed]",
        error: err,
      });
    }
    return res.status(500).send({
      success: false,
      message: "[Internal Server Error]",
      error: err.message,
    });
  }
};