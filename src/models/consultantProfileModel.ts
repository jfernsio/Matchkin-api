import mongoose, { Document, Schema, Types } from "mongoose";

export interface IConsultant extends Document {
  user: Types.ObjectId;
  fullName: string;
  skills: string[];
  domain: string;
  availabilityTimeline: string;
  yearsOfExperience: number;
  bio?: string;
}

const consultantProfileSchema: Schema = new Schema<IConsultant>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  fullName: { type: String, required: true },
  skills: [{ type: String, required: true }], //  ['nodejs', 'java']
  domain: { type: String, required: true }, //  'healthcare', 'fintech'
  availabilityTimeline: { type: String, required: true }, //'1 month', 'immediate'
  yearsOfExperience: { type: Number , default: 0 , required: true }, // default to 0 if not provided
  bio: { type: String },
},{ timestamps:true});

export default mongoose.model<IConsultant>(
  "ConsultantProfile",
  consultantProfileSchema
);
