import mongoose, { Document, Schema, Types } from "mongoose";

export interface IClientProfile extends Document {
  user: Types.ObjectId;
  companyName: string;
  industry: string;
  companyDescription?: string;
  projectsPosted: number;
}

const clientProfileSchema = new Schema<IClientProfile>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  companyName: { type: String, required: true },
  industry: { type: String, required: true },
  companyDescription: { type: String },
  projectsPosted: { type: Number, default: 0 }
},{ timestamps:true});

export default mongoose.model<IClientProfile>('ClientProfile', clientProfileSchema);
