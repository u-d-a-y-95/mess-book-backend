
export default function (schema){
    return async(req,res,next) =>{
        try {
            const data = await schema.parseAsync(req.body)
            next()
        } catch (error) {
            next(JSON.stringify(error.flatten().fieldErrors))
        }
    }
  
}