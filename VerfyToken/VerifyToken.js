import jwt from 'jsonwebtoken'

const VerifyToken = async (req, res, next) => {
    const token = req?.cookies?.token

    if (!token) {
        return res.status(401).send({
            "success": false,
            "message": "Validation error occurred.",
            "errorDetails": {
                "field": "email",
                "message": "Invalid email format."
            }
        }
        )
    }
    jwt.verify(token, process.env.user_token, async (err, decoded) => {
        if (err) {
            return res.status(403).send({
                "success": false,
                "message": "Unauthorized access.",
            })
        }
        // console.log(decoded);
        else {
            req.user = decoded
            next()
        }
    })

}

export default VerifyToken