class ValidationError extends Error {
    constructor() {
        super()
    }
}

class NotFoundError {
    constructor() {
        super()
    }
}

function handleError(err, req, res, next) {
    if (err instanceof NotFoundError) {
        res
            .status(404)
            .render('error', {
                message: 'Nie można znaleźć elementu o danym ID'
            })
    }

    res.status(err instanceof ValidationError ? 400 : 500)
    res.render({
        message: err instanceof ValidationError ? err.message : "Coś poszło nie tak, spróbuj ponownie. ",
    })
}



module.exports = {
    handleError,
    ValidationError,
    NotFoundError
}