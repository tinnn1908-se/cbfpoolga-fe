import UserAPI from "../apis/http.user";
import { SigninRequest, SignupRequest, User } from "../models";

export default class UserService {
    static async register(signupRequest: SignupRequest) {
        return await UserAPI.register(signupRequest);
    }
    static async verifyEmail(token: string) {
        console.log('UserService verifyEmail')
        return await UserAPI.verifyEmail(token);
    }
    static async signin(inputString: string, password: string) {
        var signinRequest: SigninRequest = {
            username: '',
            email: '',
            password
        }
        if (inputString.includes('@')) {
            signinRequest.email = inputString;
        } else {
            signinRequest.username = inputString;
        }
        var user: User | null | undefined = await UserAPI.signin(signinRequest);
        return user;

    }
}