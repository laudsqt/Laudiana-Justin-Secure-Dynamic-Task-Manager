// Utility module: shared validation helpers.
export function isBlank(value) {
    return value.trim() === "";
}

export function showValidationMessage(messageElement, message) {
    messageElement.textContent = message;
}

export function clearValidationMessage(messageElement) {
    messageElement.textContent = "";
}
