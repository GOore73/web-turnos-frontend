import { Form } from 'semantic-ui-react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './LoginForm.form';
import { Auth } from '../../../../api';
import './LoginForm.scss';
import { set } from 'lodash';

const authController = new Auth();

export const LoginForm = () => {
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authController.login(formValue);
        if (response.status !== 200) throw response;
      } catch (err) {
        setError(
          err.msg
            ? `${err.status}, ${err.msg}`
            : `${err.status}:${err.statusText}`
        );
        console.log(err);
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
