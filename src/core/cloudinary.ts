const cloudinary = require("cloudinary");
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.CLOUDINARY_NAME)

cloudinary.config({
  cloud_name: "undind",
  api_key: 927929377163559,
  api_secret: "TOfsM-1y0rgP2JeRInDjFl1H0mc"
});

export default cloudinary;