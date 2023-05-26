import { Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useAuth } from '../../../../hooks';
import { initialValues, validationSchema } from './LoginForm.form';
import { Auth } from '../../../../api';
import './LoginForm.scss';

const authController = new Auth();

export const LoginForm = () => {
  const { login } = useAuth(); //función que actualiza los datos de login y token en el contexto
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (error) setError('');
      try {
        const res = await authController.login(formValue);
        if (!res.response.status) {
          throw res;
        }
        if (res.response.status !== 200) {
          setError(res.result.msg);
        } else {
          //registrar el accesstoken en el contexto
          authController.setAccessToken(res.result.access);
          authController.setRefreshToken(res.result.refresh);
          login(res.result.access);
          setError('OK');
        }
      } catch (err) {
        setError('Error externo a la aplicación');
      }
    },
  });
  return (
    <Form className='login-form' onSubmit={formik.handleSubmit}>
      <Form.Input
        name='email'
        placeholder='email'
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name='password'
        placeholder='password'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        Entrar
      </Form.Button>
      <p className='login-form__error'>{error}</p>
    </Form>
  );
};
