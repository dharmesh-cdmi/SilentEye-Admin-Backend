const bcrypt = require('bcrypt');

// Function to hash passwords
const hashPasswords = async (users) => {
    for (const user of users) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
};

module.exports = {
    hashPasswords,
};
