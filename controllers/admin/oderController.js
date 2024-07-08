const Orders = require('../../models/ordersModel');

// Controller to fetch orders
exports.fetchOrders = async (req, res) => {
  try {
    const orders = await Orders.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
