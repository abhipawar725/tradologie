const authorisation = async (req, res, next) => {
    const token = req.cookies.token 
    console.log('token', token)
    // next()
}

export default authorisation