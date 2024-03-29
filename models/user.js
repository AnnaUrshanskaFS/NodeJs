const { boolean } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: " it is required field",
    minlength: 6,
    maxlength: 2555,
  },
  email: {
    type: String,
    required: " it is required field",
    minlength: 6,
    maxlength: 2555,
    unique: true,
  },
  password: {
    type: String,
    required: " it is required field",
    minlength: 6,
    maxlength: 2555,
  },
  biz: {
    type: Boolean,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  cards: Array,
});
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, biz: this.biz },
    config.get("jwtKey")
  );
  return token;
};

const User = mongoose.model("User", UserSchema);
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(6).max(2555).required(),
    email: Joi.string().min(6).max(2555).required().email(),
    password: Joi.string().min(6).max(2555).required(),
    biz: Joi.boolean().required(),
  });
  return schema.validate(user);
}
function validateCards(data) {
  const schema = Joi.object({
    cards: Joi.array().min(1).required(),
  });

  return schema.validate(data);
}
exports.User = User;
exports.validate = validateUser;
exports.validateCards = validateCards;
