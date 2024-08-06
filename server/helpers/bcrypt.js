const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(8);

const hash = (password) => {
    return bcrypt.hashSync(password, salt);
}

const compare = (password, dbPassword) => {
    return bcrypt.compare(password, dbPassword);
}

module.exports = { hash, compare }