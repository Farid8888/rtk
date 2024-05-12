class NotFoundError{
    constructor(error){
        this.error = error
        this.status = 404
    }
}


exports.NotFoundError =NotFoundError