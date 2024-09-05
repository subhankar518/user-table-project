const mongoose = require('mongoose');

const coordinatesSchema = new mongoose.Schema({
  latitude: { type: String },
  longitude: { type: String },
});

const locationSchema = new mongoose.Schema({
  street: {
    number: { type: Number},
    name: { type: String},
  },
  city: { type: String},
  state: { type: String},
  country: { type: String},
  postcode: { type: Number},
  coordinates: { type: coordinatesSchema},
  timezone: {
    offset: { type: String, required: true },
    description: { type: String, required: true },
  },
});

const loginSchema = new mongoose.Schema({
  uuid: { type: String },
  username: { type: String}, 
  password: { type: String },
  salt: { type: String },
  md5: { type: String },
  sha1: { type: String },
  sha256: { type: String },
});

const dobSchema = new mongoose.Schema({
  date: { type: Date},
  age: { type: Number},
});

const pictureSchema = new mongoose.Schema({
  large: { type: String  },
  medium: { type: String },
  thumbnail: { type: String },
});

const userSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  name: {
    title: { type: String, required: true },
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  location: { type: locationSchema },
  email: { type: String ,required:true},
  login: { type: loginSchema, },
  dob: { type: dobSchema },
  registered: { type: dobSchema }, 
  phone: { type: String},
  cell: { type: String},
  picture: { type: pictureSchema,  },
  nat: { type: String, },
}, { timestamps: true }); 

const User = mongoose.model('User', userSchema);

module.exports = User;
