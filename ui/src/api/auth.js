import { getCookie } from './cookie';
//0735 096 284
export let apiHost = (process.env['REACT_APP_NODE_ENV'] === "dev") ? 'http://localhost:8080' : '';

export let LDAPApi = async(params) => {

    let _defaultHeaders = {
        "Content-Type": 'application/json',
        "Authorization": `Bearer ${getCookie("token")}`,
    }
    try {
        let response = await fetch(String(`${apiHost}${params.url}`), {
            headers: _defaultHeaders,
            method: params.method ? String(params.method) : 'GET',
            ...(params.method !== 'GET') && { body: String(params.data) }
        })
        let responseJSON = await response.json()
        let res = {
            status: "success",
            statusText: response.statusText,
            data: responseJSON
        }
        return res
    } catch (error) {
        console.error(error)
        let res = {
            statusText: "FHIRFetch: server error",
            status: "error",
            error: error
        }
        console.error(error)
        return res
    }

}