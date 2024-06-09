import axios from "axios";
import { BACKENDURL } from "./api";
const apicalls = async () => {
    try {
        const res = await axios.get(
            `${BACKENDURL}:5000/problem/read`,//http://localhost
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