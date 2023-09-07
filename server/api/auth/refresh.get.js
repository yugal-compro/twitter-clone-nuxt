import { parseCookies, sendError } from "h3"
import { getRefreshTokenByToken } from "~/server/db/refreshTokens"
import { decodeRefreshToken, generateTokens } from "~/server/utils/jwt"
import { getUserById } from "~/server/db/users"

export default defineEventHandler( async(event) => {

    const cookie = parseCookies(event)
    const refreshToken = cookie.refresh_token

    if(!refreshToken){
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh Token is Invalid'
        }))
    }

    const rToken = await getRefreshTokenByToken(refreshToken);

    if(!rToken){
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Refresh Token is Invalid'
        }))
    }
   
    const token = decodeRefreshToken(refreshToken)

    try{
        const user = await getUserById(token.userId)
        const { accessToken } = generateTokens(user)
        return {
            access_token: accessToken
        }
    }catch(error){
        return sendError(event, createError({
            statusCode: 500,
            statusMessage: 'Something went wrong'
        }))
    }

    return {
        hello: user
    }
} )