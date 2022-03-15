const host="http://localhost:3030";

async function request(method = 'get', url, data) {
    const options = {
        method,
        headers: {}
    }

    if (data != undefined) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(host+url, options);

        if (response.ok != true) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status == 204) {
            return response;
        }
        else {
            return response.json();
        }

    } catch (error) {
        alert(error.message);
        throw error;
    }

}

const gett = request.bind(null, 'get');
const post = request.bind(null, 'post');
const put = request.bind(null, 'put');
const del = request.bind(null, 'delete');

export {
    gett, put, post, del as delete
}



//window.api = { request }