const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const result = await User.updateMany(
    { role: 'admin', approved: { $ne: true } },
    { $set: { approved: true } }
  );
  console.log(`✅ Approved ${result.modifiedCount} admin(s).`);
  mongoose.disconnect();
});
