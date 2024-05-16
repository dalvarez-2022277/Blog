import mongoose, { Schema } from 'mongoose'

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    username:{
        type: String
    },
    password:{
        type: String
    },
    role:{
        type: String,
        default: 'user'
    },
})

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
  }

export default mongoose.model('User', UserSchema)