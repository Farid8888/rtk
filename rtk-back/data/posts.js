const fs = require('node:fs/promises')
const {NotFoundError} = require('../utils/error')
const {v4:generateId} = require("uuid")

const readData = async ()=>{
    const data = await fs.readFile('posts.json','utf-8')
    return JSON.parse(data)
}

const writeData = async(data)=>{
    await fs.writeFile('posts.json',JSON.stringify(data))
}


const getAllPosts = async()=>{
const data = await readData()
// if(!data.posts || data.posts.length ===0){
//    throw new NotFoundError('Posts not fetched')
// }
if(!data.posts){
    throw new NotFoundError('Posts not fetched')
 }
return data.posts
}

const addToFile =async(post)=>{
    const data = await readData()
    if(!data.posts) throw new NotFoundError('Post not added')
   data.posts.unshift({...post,id:generateId()})
   await writeData(data)
   return data.posts
}


const getOne = async(id)=>{
const data = await readData()
if(!data.posts || data.posts.length === 0) throw new NotFoundError('Posts not fetched')
const post  = data.posts.find(post=>post.id == id)
if(!post) throw new NotFoundError('Post not fetched')
return post
}

const editOne = async(id,post)=>{
    const data = await readData()
    if(!data.posts || data.posts.length === 0) throw new NotFoundError('Posts not fetched')
   const ind = data.posts.findIndex(post=>post.id == id)
   if(ind<0) throw new NotFoundError('Could not find id ' + id)
   data.posts[ind] = {...post,id}
   await writeData(data)
   return data
}

const remove = async(id)=>{
    const data = await readData()
    if(!data.posts || data.posts.length === 0) throw new NotFoundError('Posts not fetched')
    const removed =data.posts.filter(post=>post.id != id)
    await writeData({posts:removed})
    return removed
}

exports.remove = remove
exports.editOne = editOne
exports.addToFile = addToFile
exports.getOne = getOne
exports.getAllPosts = getAllPosts
