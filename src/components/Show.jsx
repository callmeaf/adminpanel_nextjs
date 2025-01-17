import React from 'react';

const Show = ({when, children}) => {
    const [whenChild, elseChild] = React.Children.toArray(children)
    return when ? whenChild : elseChild;
};

export default Show;