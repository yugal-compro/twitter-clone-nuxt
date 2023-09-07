import UrlPattern from "url-pattern"
import { decodeAccessToken } from "../utils/jwt"
import { getUserById } from "../db/users"

export default defineEventHandler(async(event) => {
    const endpoints = [
        '/api/auth/user',
        '/api/user/tweets',
        '/api/tweets',
        '/api/tweets/:id'
    ]

    const isHandledByThisMiddleware = endpoints.some((endpoint) => {
        const pattern = new UrlPattern(endpoint)
        return pattern.match(getRequestURL(event).pathname)
    })


    if(!isHandledByThisMiddleware){
        return;
    }

    const token = getRequestHeader(event, 'authorization')?.split(' ')[1]

    const decoded = decodeAccessToken(token)

    if(!decoded){
        return sendError(event, createError({
            statusCode: 401,
            statusMessage: 'Unauthorized'
        }))
    }

   

    try{
        const userId = decoded.userId;
        const user = await getUserById(userId);
        event.context.auth = { user }
    }catch(error){
        return
    }


})
  