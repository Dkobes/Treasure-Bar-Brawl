import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            maxLength: 20
        },
        password: {
            type: String,
            required: true
        },
        party: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Character',
            }
        ],
        enemies: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Enemy',
            }
        ]
    },
    {
        id: false
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('users', userSchema);

export default User;