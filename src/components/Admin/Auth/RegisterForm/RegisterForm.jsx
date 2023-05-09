import { Form } from 'semantic-ui-react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './RegisterForm.form';
import { Auth } from '../../../../api';
import './RegisterForm.scss';

const authController = new Auth();

export const RegisterForm = (props) => {
  const { openLogin } = props;
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    // este es para indicar que solo valida al submit
    onSubmit: async (formValue) => {
      try {
        response = await authController.register(formValue);
        console.log(response);
        // openLogin();
      } catch (error) {
        setError('error.msg');
      }
    },
  });
  return (
    <Form className='register-form' onSubmit={formik.handleSubmit}>
      <Form.Input
        name='email'
        placeholder='email'
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name='password'
        type='password'
        placeholder='password'
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Input
        name='repeatPassword'
        type='password'
        placeholder='repetir password'
        onChange={formik.handleChange}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />
      <Form.Checkbox
        name='conditionsAccepted'
        label='He leído y acepto las condiciones de privacidad'
        onChange={(_, data) =>
          // no lo maneja el handleChange, sino que hay que manejarlo manualmente
          formik.setFieldValue('conditionsAccepted', data.checked)
        }
        checked={formik.values.conditionsAccepted}
        error={formik.errors.conditionsAccepted}
      />
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        Crear cuenta
      </Form.Button>
      <p className='register-form__error'>{error}</p>
    </Form>
  );
};
