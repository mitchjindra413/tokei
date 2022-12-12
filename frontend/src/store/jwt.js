function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name.trim() === cookieName) return value;
    }
    return null;
}

async function jwtFetch(url, options = {}) {
    options.method = options.method || "GET";
    options.headers = options.headers || {};

    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) options.headers["Authorization"] = 'Bearer ' + jwtToken;

    // If the options.method is not 'GET', then set the "Content-Type" header to
    // "application/json" and the "CSRF-Token" header to the value stored in the
    // "CSRF-TOKEN" cookie.
    if (options.method.toUpperCase() !== "GET") {
        if (!url.includes("add-photo")) {
            options.headers["Content-Type"] =
                options.headers["Content-Type"] || "application/json";
        }
        options.headers["CSRF-Token"] = getCookie("CSRF-TOKEN");
    }

    const res = await fetch(url, options);

    if (res.status >= 400) throw res;

    return res;
}

export default jwtFetch;