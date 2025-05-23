import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Create a schema for the User
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    starredGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
starredFiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],

});
// Password hash before saving the user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
// Create the model
const User = mongoose.model('User', userSchema);
export default User;