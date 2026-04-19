
// using try catch block
const registerUser =async(req, res)=>{
    try {
        const {name , email, password}= req.body
        const userExist = await User.findOne({email})
    } catch (error) {
        res.status(400)
        throw new Error("something went wrong")
    }
}