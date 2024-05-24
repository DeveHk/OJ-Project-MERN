import axios from "axios";
const apicalls = async () => {
    try {
        const res = await axios.get(
            "http://localhost:5000/problem/read",
            {
                withCredentials: true,
            }
        );
        console.log(res);
        return res
    }
    catch (err) {
        console.log(err);
        return err
    }
}
export default apicalls