import axios from "axios";
import { APPCONSTANT } from "../app.constant";

export default axios.create({
    baseURL: APPCONSTANT.base_url
})