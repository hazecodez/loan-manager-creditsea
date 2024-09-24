import { Schema, model, Document } from "mongoose";

interface IAdmin extends Document {
  name: string;
  password: string;
}

const adminSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const AdminModel = model<IAdmin>("Admin", adminSchema);
