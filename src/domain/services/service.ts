import axios from "axios";
import {API_URL} from "@/config/config.ts";


export default axios.create({
    baseURL: `${API_URL}`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: "X-XSRF-TOKEN",
});