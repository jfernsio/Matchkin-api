import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  role: 'client' | 'consultant';
  otp?: string;
  
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['client', 'consultant'], required: true },
  otp: { type: String },
 
},{ timestamps:true});

export default mongoose.model<IUser>('User', userSchema);
