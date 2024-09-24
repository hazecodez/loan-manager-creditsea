import * as Yup from "yup";

const AdminSchema = Yup.object().shape({
  name: Yup.string().required("The Email field is required"),
  password: Yup.string()
    .required("The Password field is required")
    .min(4, "Password must be 4 characters long"),
});

export default AdminSchema;
