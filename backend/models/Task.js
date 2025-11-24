import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    dueDate: {type: String, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
});

export default mongoose.model('Task', TaskSchema);