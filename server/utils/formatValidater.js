const zod=require("zod");

const signupSchema= zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})

const updateUserSchema=zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional(),
})

const loginSchema=zod.object({
    username:zod.string(),
    password:zod.string(),
})

module.exports={signupSchema,updateUserSchema,loginSchema}