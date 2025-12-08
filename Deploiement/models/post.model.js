import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    titre: {
      type: String
    },
    contenu: {
      type: String
    }
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
