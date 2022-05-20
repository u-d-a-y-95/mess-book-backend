
export default function (schema){
    return async(req,res,next) =>{
        try {
            const data = await schema.parseAsync(req.body)
            req.body = data
            next()
        } catch (error) {
            next(error.flatten().fieldErrors)
        }
    }
  
}