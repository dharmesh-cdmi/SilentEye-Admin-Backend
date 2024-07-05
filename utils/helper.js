const bcrypt = require('bcrypt');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

// Function to hash passwords
const hashPasswords = async (users) => {
    for (const user of users) {
        const salt = await bcrypt.genSalt(SALT_ROUNDS?SALT_ROUNDS:10);
        user.password = await bcrypt.hash(user.password, salt);
    }
};

module.exports = {
    hashPasswords,
};
