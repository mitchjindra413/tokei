const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: { type: String, required: true },
    doc: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'docModel'
    },
    docModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});