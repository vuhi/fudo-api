const mongoose = require('mongoose');

const tagSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please add tag name'],
    trim: true,
    maxLength: [15, `tag's name cannot be more than 15`]
  },
  color: {
    type: String,
    require: [true, 'Please add tag color'],
    enum: [
      '#3884ff',
      '#ff9447',
      '#ff4747',
      '#42ed70',
      '#000000',
      '#949599',
      '#d9d566'
    ]
  }
}, { _id: false });

module.exports = tagSchema;
