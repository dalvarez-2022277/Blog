import jwt from 'jsonwebtoken'

export const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }
        jwt.sign(
            payload,
            process.env.KEY_SFX_JWT,
            {
                expiresIn: '8h'
            },
            (err, token)=>{
                err ? (console.log(err),reject('we have a proble to generate the token')) : resolve(token)
            }
        )
    })
}