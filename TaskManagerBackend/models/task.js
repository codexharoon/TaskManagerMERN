const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        owner : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'USER'
        }
    },
    { timestamps: true }
);

const TASK = mongoose.model('TASK', taskSchema);

module.exports = TASK;