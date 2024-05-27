import axios from "axios";

export interface Problem {
    _id: string;
    u_id: string;
    title: string;
    difficulty: string;
    description: string;
    active: boolean;
    testcasecount: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export interface ApiResponse {
    data: {
        success: boolean;
        message: string;
        problems: Problem[]; // Use the interface defined for the problem object
    };
    status: number;
    statusText: string;
    headers: unknown;
    config: unknown;
    request: unknown;
}

const apicalls = async (num: number) => {
    try {
        const res = await axios.post(
            "http://localhost:5000/question/read", {
            page: num
        },
        );
        console.log(res);
        return res
    }
    catch (err) {
        console.log(err);
        return err
    }
}
export const apicall = async (id: string | null) => {
    try {
        const res = await axios.get(
            `http://localhost:5000/question/read/${id}`
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