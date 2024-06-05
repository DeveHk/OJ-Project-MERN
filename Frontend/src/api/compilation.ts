import axios from "axios";

export interface SolutionRun {
    lang: string;
    code: string;
    inputValue: string[];
}
export interface SolutionSubmit {
    lang: string;
    code: string;
    prob_id: string;
}

const apicallcompile = async (data: SolutionRun) => {
    const res = await axios.post(
        `http://localhost:8000/compiler/run`, data, {
        withCredentials: true
    }
    );
    return res
}

const apicallsubmit = async (data: SolutionSubmit) => {
    const res = await axios.post(
        `http://localhost:8000/compiler/submit`, data, {
        withCredentials: true
    }
    );
    return res
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
export { apicallcompile, apicallsubmit }