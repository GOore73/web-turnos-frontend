import { useState } from 'react';
import { Form, Modal, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';

import { Center } from '../../../../api/center';
import { initialValues, validationSchema } from './CenterForm.form';
import { useAuth } from '../../../../hooks';
import './CenterForm.scss';

const centerController = new Center();

export const CenterForm = (props) => {
  const { close, onReload, center, secondModal } = props;
  const { accessToken } = useAuth();
  const [error, setError] = useState('');
  const formik = useFormik({
    initialValues: initialValues(center),
    validationSchema: validationSchema(center),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (error) setError('');
      try {
        if (!center) {
          // crear centro
          const res = await centerController.createCenter(
            accessToken,
            formValue
          );
          if (res.status !== 201) {
            setError(`${res.status} - ${res.statusText}`);
          } else {
            onReload();
            close();
            secondModal(true);
          }
        } else {
          // update centro
          // await userController.updateUser(accessToken, user._id, formValue);
          // console.log(formValue);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Form className='center-form' onSubmit={formik.handleSubmit}>
      {/* {console.log(formik)} */}
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
        <Form.Input
          name='address.postcode'
          placeholder='Código postal'
          onChange={formik.handleChange}
          value={formik.values.address.postcode}
          error={formik.errors.address?.postcode}
        />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Radio
          toggle
          label='Activo'
          onChange={() => (formik.values.active = !formik.values.active)}
        ></Form.Radio>
      </Form.Group>
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        {center ? 'Actualizar centro' : 'Crear Centro'}
      </Form.Button>
      <p>{error}</p>
    </Form>
  );
};
