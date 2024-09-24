import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("The Email field is required")
    .email("Please enter valid Email Address"),
  password: Yup.string()
    .required("The Password field is required")
    .min(4, "Password must be 4 characters long"),
});

export default LoginSchema;