import { getUserByUsername } from "~/server/db/users";
import bcrypt from 'bcrypt';
import { generateTokens, sendRefreshToken } from "~/server/utils/jwt";
import { userTransformer } from "~/server/transformers/user";
import { createRefreshToken } from "~/server/db/refreshTokens";

export default defineEventHandler(async(event)=>{
    const body = await readBody(event);
    const {username, password} = body;

    if(!username || !password){
        return sendError(event, createError({statusCode:400, statusMessage: 'invalid params'}));
    }

    // Is the user registered
    const user = await getUserByUsername(username)
    if(!user){
        return sendError(event, createError({statusCode:400, statusMessage: 'Username or password is invalid'}));
    }

    // Compare passwords
    const doesThePasswordMatch = await bcrypt.compare(password, user.password)
    if(!doesThePasswordMatch){
        return sendError(event, createError({statusCode:400, statusMessage: 'Username or password is invalid'}));
    }
    // Generate Tokens
    // Access Token
    // Refresh Token

    const { accessToken, refreshToken } = generateTokens(user);

    //save to db
    await createRefreshToken({
        token: refreshToken,
        userId: user.id
    })
    //save to http only cookie
    sendRefreshToken(event, refreshToken)

    return {
        access_token:accessToken,
        user: userTransformer(user)
    }

})