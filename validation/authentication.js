// Load modules
const {
    body
} = require('express-validator');

// Validate user input
function userValidation() {
    return [
        // Validate fisrtName
        body('firstName')
        .isAlpha()
        .withMessage('The first name can only contain letters.'),

        // Validate lastName
        body('lastName')
        .isAlpha()
        .withMessage('The last name can only contain letters.'),

        // Validate username
        body('username')
        .isAlphanumeric()
        .isLength({
            min: 4, max:12
        })
        .withMessage('Username can only contain numbers and letters.'),
        
        // Validate email format
        body('email')
        .isEmail()
        .withMessage('Must be a valid email address.'),

        // Validate phoneNumber format
        body('phoneNumber')
        .isMobilePhone()
        .withMessage('Must be a valid phone number.'),

        // Validate password
        body('password')
        .isLength({
            min: 8
        })
        .withMessage('Password must be at least 8 characters long.'),

        // Validate confirm password
        // body('confirmPassword')
        // .contains(body('password'))
        // .withMessage('Password not matched'),

    ];
};

// Export userValidation function
module.exports = {
    userValidation,
}