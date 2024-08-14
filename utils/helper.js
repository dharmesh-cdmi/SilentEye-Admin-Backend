const bcrypt = require('bcrypt');
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 10; // Default to 10 if SALT_ROUNDS is not defined
const Orders = require('../models/ordersModel'); // Adjust the path as necessary



// Function to hash passwords
const hashPasswords = async (users) => {
    try {
        for (const user of users) {
            const salt = await bcrypt.genSalt(SALT_ROUNDS);
            const hashedPassword = await bcrypt.hash(user.password, salt);
            user.password = hashedPassword;
        }
    } catch (err) {
        console.error('Error hashing passwords:', err);
        throw err; // Throw error to handle in calling function
    }
};

// Helper function to generate a new orderId
const generateOrderId = async (session) => {
    const lastOrder = await Orders.findOne().sort({ createdAt: -1 }).session(session).exec();
    let newOrderId;
    if (lastOrder && lastOrder.orderId) {
      const lastOrderIdNum = parseInt(lastOrder.orderId.slice(2), 10);
      newOrderId = 'SE' + (lastOrderIdNum + 1).toString().padStart(6, '0');
    } else {
      newOrderId = 'SE000142'; // Default starting orderId
    }
    return newOrderId;
  };


module.exports = {
    hashPasswords,
    generateOrderId
};
