import {callIfFunction} from "@/helpers";

const Show = ({when, whenChild, elseChild, loading, loadingChild, loadingChildWithWhenChild = false}) => {

    return <>
        {loading && callIfFunction(loadingChild)}
        {!!when ? loading && loadingChildWithWhenChild ? callIfFunction(whenChild) : callIfFunction(whenChild) : callIfFunction(elseChild)}
    </>;
};

export default Show;