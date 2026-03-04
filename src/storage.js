export function saveToLocalStorage(objectName, object) {
    localStorage.setItem(objectName,JSON.stringify(object));
}

export function getFromLocalStorage(objectName) {
    return JSON.parse(localStorage.getItem(objectName));
}

export function removeFromLocalStorage(object) {
    localStorage.removeItem(object);
}
