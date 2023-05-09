import * as Yup from 'yup'

export function initialValues() {
  return {
    email: "",
    password: "",
  }
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email("Email inválido").required("Email obligatorio"),
    password: Yup.string().required("Password obligatorio"),
  })
}