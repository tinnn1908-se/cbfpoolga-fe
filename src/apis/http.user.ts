import { SigninRequest, SignupRequest, User } from "../models";
import HTTP from "./http.common";
import request from 'axios'
import { Http } from "@mui/icons-material";

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
    static async signin(signinRequest: SigninRequest) {
        // authen 
        // return token
        // author
        // return user
        var tokens: {
            access_token: string,
            refresh_token: string
        } = {
            access_token: '', refresh_token: ''
        }
        var user: User | null = null;
        console.log('signinrequest : ' + signinRequest.password)
        try {
            var authenResponse = await HTTP.post('api/auth/authentication', signinRequest);
            if (authenResponse.status === 200 && authenResponse.data) {
                tokens = authenResponse.data.tokens;
                console.log("tokens : " + Object.values(tokens))
                var authorResponse = await HTTP.post('api/auth/authorization', tokens);
                user = authorResponse.data.user;
                if (user) {
                    user.tokens = tokens;
                    return user;
                }
            }
            return null;
        } catch (error) {
            if (request.isAxiosError(error)) {
                return null;
            }
        }
    }
}