const fs = require('fs');
const mongoose = require('mongoose');
const Sale = require('C:\Users\Susmita Chowdhury\mongodb-sba\models\Sales'); // Correct the path here

async function populateSalesData() {
  try {
    // Read sample sales data from JSON file
    const rawData = fs.readFileSync('C:\Users\Susmita Chowdhury\mongodb-sba\SampleSalesData.json');
    const sampleSalesData = JSON.parse(rawData);

    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://susmitachowdhury:01817704564tanmoy@momoscluster.e4lqkpx.mongodb.net/Database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Insert sample sales data
    await Sale.insertMany(sampleSalesData);
    console.log('Sample sales data inserted successfully');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error populating sales data:', err);
  }
}

// Call the populateSalesData function
populateSalesData();
