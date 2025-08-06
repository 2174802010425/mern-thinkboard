import rateLimite from "../src/upstash.js"

export const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await rateLimite.limit('my-limit-key')
        if (!success) {
            return res.status(429).json({error : 'Too many requests, please try again later'})
        }
        next()
    } catch (error) {
        console.log(error)
    }
}