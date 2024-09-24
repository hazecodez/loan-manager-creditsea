import * as Yup from "yup";

const LoanSchema = Yup.object().shape({
  userName: Yup.string().required("This field is required"),

  loanAmount: Yup.number()
    .required("This field is required")
    .min(10000, "Minimum loan is 10,000"),

  loanTenure: Yup.number().required("This field is required").min(1,"Minimum one month"),

  employmentStatus: Yup.string().required("This field is required"),

  employmentAddress: Yup.string().required("This field is required"),

  reason: Yup.string().required("This field is required"),
});

export default LoanSchema;
