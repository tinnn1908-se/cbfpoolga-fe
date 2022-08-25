import { SignupRequest } from "../models";
import HTTP from "./http.common";
import request from 'axios'

export default class UserAPI {
    static async register(singupReq: SignupRequest) {
        var access_token = '';
        try {
            var resp = await HTTP.post('api/auth/signup', singupReq);
            if (resp && resp.data) {
                console.log('register : ')
                console.log('resp.data : ')
                access_token = resp.data.access_token
            };
        } catch (error) {
            if (request.isAxiosError(error)) {
                console.log(error)
            }
        }
        return access_token;
    }
    static async verifyEmail(token: string) {
        var isEmailVerified = false;
        console.log('UserAPI verifyEmail')
        try {
            var resp = await HTTP.post(`api/auth/confirm/${token}`);
            console.log('verifyEmail resp : ' + resp.data + ' - ' + resp.status)
            if (resp && resp.status === 200) isEmailVerified = true;
        } catch (error) {
            if (request.isAxiosError(error)) {
                console.log(error)
            }
        }
        return isEmailVerified;
    }
}