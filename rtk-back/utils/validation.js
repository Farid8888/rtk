

const validateName =(name)=>{
    return name.trim().length === 0 && !name
}


exports.validateName = validateName