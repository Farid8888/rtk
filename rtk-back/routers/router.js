const {Router} = require('express')
const {getAllPosts,getOne,editOne,addToFile,remove} = require('../data/posts')
const {validateName} = require('../utils/validation')

const router = Router()


router.get('/',async(req,res,next)=>{
 try{
  const response = await getAllPosts()
  res.status(201).json(response)
 }catch(e){
   res.status(400).json({message:e})

 }
})

router.get('/:id',async(req,res,next)=>{
    try{
    const data = await getOne(req.params.id)
    res.status(201).json(data)
    }catch(e){
        next(e)
    }
})

router.post('/',async(req,res,next)=>{
    try{
     const {body} = req
      let errors ={}
      if(validateName(body.title)){
        errors.title = 'Name is invalid'
      }
      if(validateName(body.body)){
        errors.body = 'Body is invalid'
      }
      // const data = await addToFile(body) peredayem v res.status(201) t.k. pustoy body
      Object.keys(errors).length > 0 ? res.status(500).json({message:'error is declared',errors:errors})
      :res.status(201).json({message:'post is created',posts:await addToFile(body)})
    }catch(e){
     next(e)
    }
})

router.patch('/:id',async(req,res,next)=>{
    try{
      const {body} = req
      const {id} = req.params
      
      let errors ={}
      if(validateName(body.body)) errors.body = 'Please enter the body'
     if(validateName(body.title)) errors.title = 'Please enter the title'
     Object.keys(errors).length > 0 ? res.status(422).json({message:'Error is declared',errors:errors})
    : res.status(201).json({massage:"edited",posts:await editOne(id,body)})
    }catch(e){
        next(e)
    }
})

router.delete('/:id',async(req,res,next)=>{
    try{
     const data = await remove(req.params.id)
     res.status(201).json({message:'deleted',posts:data})
    }catch(e){
        next(e)
    }
})


module.exports =router