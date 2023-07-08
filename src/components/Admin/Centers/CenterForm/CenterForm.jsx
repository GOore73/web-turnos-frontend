import { Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './CenterForm.form';
// import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
// import { image } from '../../../../assets';
// import { User } from '../../../../api/user';
// import { Auth } from '../../../../api/auth';
import { useAuth } from '../../../../hooks';
import { ENV } from '../../../../utils';
import './CenterForm.scss';

export const CenterForm = (props) => {
  const { close, onReload, center } = props;
  const { accessToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(center),
    validationSchema: validationSchema(center),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (!center) {
          console.log('Crear centro con estos datos:');
          console.log(formValue);
          // await userController.createUser(accessToken, formValue); // crear nuevo usuario
        } else {
          // await userController.updateUser(accessToken, user._id, formValue);
          // console.log(formValue);
        }
        onReload();
        close();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form className='center-form' onSubmit={formik.handleSubmit}>
      {console.log(formik)}
      <Form.Group widths='equal'>
        <Form.Input
          name='name'
          placeholder='Centro - nombre'
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        <Form.Input
          name='alias'
          placeholder='Alias'
          onChange={formik.handleChange}
          value={formik.values.alias}
          error={formik.errors.alias}
        />
      </Form.Group>

      <Form.Group widths='equal'>
        <Form.Input
          name='address.street'
          placeholder='Calle'
          onChange={formik.handleChange}
          value={formik.values.address.street}
          error={formik.errors.address?.street} //esto daba un error cannot read property of undefined. con el Optional chaining (?.) si la propiedad es undefined, devuelve undefined en lugar de throwing an error.
        />
        <Form.Input
          name='address.num'
          placeholder='Número'
          onChange={formik.handleChange}
          value={formik.values.address.num}
          error={formik.errors.address?.num}
        />
      </Form.Group>

      <Form.Group widths='equal'>
        <Form.Input
          name='address.city'
          placeholder='Ciudad'
          onChange={formik.handleChange}
          value={formik.values.address.city}
          error={formik.errors.address?.city}
        />
        <Form.Input
          name='address.state'
          placeholder='Provincia'
          onChange={formik.handleChange}
          value={formik.values.address.state}
          error={formik.errors.address?.state}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Input
          name='address.country'
          placeholder='Pais'
          onChange={formik.handleChange}
          value={formik.values.address.country}
          error={formik.errors.address?.country}
        />
        <Form.Radio
          toggle
          label='Activo'
          onChange={() => (formik.values.active = !formik.values.active)}
        ></Form.Radio>
      </Form.Group>
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        {center ? 'Actualizar centro' : 'Crear Centro'}
      </Form.Button>
    </Form>
  );
};
