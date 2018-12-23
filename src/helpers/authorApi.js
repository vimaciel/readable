export const setAuthor = (username) => {
    document.cookie = `username=${username}`
}

export const getAuthor = () => {
    return document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

