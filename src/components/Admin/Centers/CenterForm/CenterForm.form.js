import { object, string, number, boolean } from 'yup';

export const initialValues = (center) => {
  return {
    name: center?.name || "",
    address: {
      street: center?.address.street || "",
      num: center?.address.num || undefined,
      city: center?.address.city || "",
      state: center?.address.state || "",
      country: center?.address.country || "",
    },
    alias: center?.alias || "",
    active: false,
    avatar: "",
  };
}

export const validationSchema = () => {
  return object({
    name: string().required(true),
    alias: string().required(true),
    address: object({
      street: string().required(true),
      num: number().integer().required(true),
      city: string().required(true),
      state: string().required(true),
      country: string().required(true),
    }),
    active: boolean(),
  })
}