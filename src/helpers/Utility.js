const keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    enter: 13,
    back: 27
};

export const keyCodes = () => {
    return keys;
};

// Remove keydown handler
export const removeKeyHandler = handler => {
    document.removeEventListener("keydown", handler);
};

// Add keydown handler
export const addKeyHandler = handler => {
    document.addEventListener("keydown", handler);
};

export const addOnKeyUp = handler => {
    document.addEventListener("keyup", handler);
};
export const removeKeyUp = handler => {
    document.removeEventListener("keyup", handler);
};