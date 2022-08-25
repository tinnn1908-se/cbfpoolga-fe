import UserAPI from "../apis/http.user";
import { SignupRequest } from "../models";

export default class UserService {
    static async register(signupRequest: SignupRequest) {
        return await UserAPI.register(signupRequest);
    }
    static async verifyEmail(token: string) {
        console.log('UserService verifyEmail')
        return await UserAPI.verifyEmail(token);
    }
}