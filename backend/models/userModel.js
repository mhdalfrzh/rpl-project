import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        noHandphone: { type: Number, required: true },
        nim: { type: String, required: true, unique: true},
        image: { type: String },
        isAdmin: { type: Boolean, default: false, required: true },
        isSeller: { type: Boolean, default: true, required: true },
        seller: {
            logo: String,
        },
    },
    {
        timestamps: true,
    }
);
const User = mongoose.model('User', userSchema);

export default User;