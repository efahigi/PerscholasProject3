const Order = require('../../models/order');

exports.createOrder = async (req, res) => {
  console.log('@create order')
  const newOrder = new Order(req.body);
  newOrder.datePlaced= new Date() 

  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
   
    await Order.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: 'Order updated' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Order  deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

exports.fetchOrderById = async (req, res) => {
  const id = req.params.id;
 
  try {
    const order = await Order.findById(id); 
  
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message  });
  }
};
