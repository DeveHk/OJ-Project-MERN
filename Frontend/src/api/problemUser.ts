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
        problems: Problem[];
        testcases: Problem[] // Use the interface defined for the problem object
    };
    status: number;
    statusText: string;
    headers: unknown;
    config: unknown;
    request: unknown;
}
export type TestCase = {
    testin: string;
    testout: string;
    visible: boolean
};
export interface ApiResponseData {
    success: boolean;
    message: string;
    problem: Problem;
    testcases: TestCase[]
}
export interface ApiResponseData1 {
    success: boolean;
    message: string;
    problems: Problem[];
    testcases: TestCase[]
}


const apicalls = async (num: number): Promise<ApiResponseData1> => {
    try {
        const res = await axios.post(
            "http://localhost:5000/question/read", {
            page: num
        },
        );
        console.log(res);
        return res.data
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}
export const apicall = async (id: string | null): Promise<ApiResponseData> => {
    try {
        const res = await axios.get(
            `http://localhost:5000/question/read/${id}`
        );
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
export default apicalls