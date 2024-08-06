module.exports = error = (error, req, res, next) => {

    if(error.name === 'SequelizeValidationError'){
        res.status(400).json({
            message: error.errors[0].message
        })
    }

    if(error.name === 'SequelizeUniqueConstraintError'){
        res.status(400).json({
            message: 'Email has taken'
        })
    }

    if(error.name === 'EmailNotFound'){
        res.status(404).json({
            message: 'Email not found'
        })
    }

    if(error.name === 'PasswordInvalid'){
        res.status(404).json({
            message: 'Password Invalid'
        })
    }

    if(error.name === 'NotFound'){
        res.status(404).json({
            message: 'Error not found'
        })
    }

    res.status(500).json({
        message: 'Internal server error'
    })
}