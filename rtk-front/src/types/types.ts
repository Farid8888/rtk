


export interface POST{
    title?:string,
    id?:any,
    body?:string,
    userId?:number,
    [key:string]:any
}

export type POSTS={
    posts:POST[] 
}

export type VAL={
    [key:string]:string | boolean
}

export type STATUS={
    status:string,
    message:string,
}

export type ERR={
    title:string | boolean,
    body:string | boolean
}