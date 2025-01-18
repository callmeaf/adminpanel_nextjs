export const actionState = (inputs) => {
    return {
        inputs,
    }
}

export const callIfFunction = (func, defaultValue) => {
    if (func && func instanceof Function) {
        func = func()
    }

    return func ?? defaultValue
}