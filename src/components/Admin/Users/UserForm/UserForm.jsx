import { Form, Image } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './UserForm.form';
import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';
import { image } from '../../../../assets';
import { User } from '../../../../api/user';
import { Auth } from '../../../../api/auth';
import { useAuth } from '../../../../hooks';
import { ENV } from '../../../../utils';
import './UserForm.scss';

const userController = new User();
const authController = new Auth();

const roleOptions = [
  {
    key: 'user',
    text: 'Usuario',
    value: 'user',
  },
  {
    key: 'admin',
    text: 'Administrador',
    value: 'admin',
  },
];

export const UserForm = (props) => {
  const { close, onReload, user } = props;
  const { accessToken } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: validationSchema(user),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (!user) {
          await userController.createUser(accessToken, formValue); // crear nuevo usuario
        } else {
          await userController.updateUser(accessToken, user._id, formValue);
          console.log(formValue);
        }
        onReload();
        close();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]; // el elemento seleccionado
    formik.setFieldValue('avatar', URL.createObjectURL(file)); //esto lo mostrará en pantalla;
    formik.setFieldValue('fileAvatar', file); //esto será para enviar al server
  });
  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    onDrop,
  });

  const getAvatar = () => {
    if (formik.values.fileAvatar) {
      return formik.values.avatar;
    } else if (formik.values.avatar) {
      return `${ENV.BASE_PATH}/${formik.values.avatar}`;
    }
    return image.noAvatar;
  };

  return (
    <Form className='user-form' onSubmit={formik.handleSubmit}>
      <div className='user-form__avatar' {...getRootProps()}>
        <input {...getInputProps()} />
        <Image avatar size='small' src={getAvatar()} />
      </div>
      <Form.Group widths='equal'>
        <Form.Input
          name='firstname'
          placeholder='Nombre'
          onChange={formik.handleChange}
          value={formik.values.firstname}
          error={formik.errors.firstname}
        />
        <Form.Input
          name='lastname'
          placeholder='Apellido'
          onChange={formik.handleChange}
          value={formik.values.lastname}
          error={formik.errors.lastname}
        />
      </Form.Group>

      <Form.Group widths='equal'>
        <Form.Input
          name='email'
          placeholder='Correo electrónico'
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Form.Dropdown
          placeholder='Selecciona un rol'
          options={roleOptions}
          onChange={(_, data) => formik.setFieldValue('role', data.value)}
          value={formik.values.role}
          error={formik.errors.role}
        />
      </Form.Group>

      <Form.Input
        type='password'
        name='password'
        placeholder='Contraseña'
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Form.Button type='submit' primary fluid loading={formik.isSubmitting}>
        {user ? 'Actualizar usuario' : 'Crear usuario'}
      </Form.Button>
    </Form>
  );
};
