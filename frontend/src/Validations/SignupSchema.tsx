import * as Yup from "yup";

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .required("The Name field is required")
    .test(
      "min-characters",
      "Name must be at least 3 characters long",
      function (value) {
        // Remove spaces and numbers, then check the length
        const alphabeticCharacters = value
          ? value.replace(/[^a-zA-Z]/g, "")
          : "";
        return alphabeticCharacters.length >= 3;
      }
    ),
  email: Yup.string()
    .required("The Email field is required")
    .email("Please enter valid Email Address"),
  password: Yup.string()
    .required("The Password field is required")
    .min(4, "Password must be 4 characters long")
});

export default SignUpSchema;