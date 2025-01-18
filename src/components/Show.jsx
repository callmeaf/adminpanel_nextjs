import {callIfFunction} from "@/helpers";

const Show = ({when, whenChild, elseChild, loading, loadingChild}) => {

    if (loading) {
        return callIfFunction(loadingChild)
    }

    return !!when ? callIfFunction(whenChild) : callIfFunction(elseChild);
};

export default Show;