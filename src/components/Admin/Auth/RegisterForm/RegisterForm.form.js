import * as Yup from 'yup'
export function initialValues() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
    conditionsAccepted: false,
  }
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string().email("Email inválido").required("Email obligatorio"),
    password: Yup.string().required("Password obligatorio"),
    repeatPassword: Yup.string().required("Repetir password obligatorio").oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
    conditionsAccepted: Yup.bool().isTrue(true),
  })
}