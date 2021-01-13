// mongoose : 
const mongoose = require('mongoose');
const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vss5k.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

if (!dbUrl) {
  console.error("MOngo url not sat in env file");
  return new Error("MOngo url not sat in env file");
}

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
   useUnifiedTopology: true
}, err => {
  if (err) {
    console.error(`failed to connect using mongoose : ${err}`);
  } else {
    console.log(`connected to DATA_BASE server`);
  }
})

module.exports = mongoose;