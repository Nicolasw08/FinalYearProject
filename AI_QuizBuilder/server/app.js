require('dotenv').config();
const connectDB = require('./src/config/connectDB');
const createApp = require('./src/appFactory');

const PORT = process.env.PORT || 5000;
const { app } = createApp();

async function start() {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error('Failed to start server', error);
    process.exit(1);
  });
}

module.exports = { start };
