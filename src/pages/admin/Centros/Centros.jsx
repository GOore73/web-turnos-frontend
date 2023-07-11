import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { BasicModal } from '../../../components/Shared';
import { CenterForm } from '../../../components/Admin/Centers/CenterForm';
import './Centros.scss';

export const Centros = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [reload, setReload] = useState(false); //hook para llamar para recargar los datos, por ejemplo al crear un nuevo usuario.

  const onOpenCloseModal = () => {
    setShowModal((prevState) => !prevState);
  }; //prevState, estatus actual de la variable del estado

  const onReload = () => setReload((prevState) => !prevState);
  return (
    <>
      <div className='centros-page__title'>
        <h4>Centros</h4>
      </div>
      <div className='centros-page'>
        <Button
          className='centros-page__add'
          primary
          icon='plus'
          circular
          onClick={onOpenCloseModal}
        ></Button>
      </div>
      <BasicModal
        show={showModal}
        close={onOpenCloseModal}
        title='Crear nuevo centro'
      >
        <CenterForm
          close={onOpenCloseModal}
          onReload={onReload}
          secondModal={setShowSecondModal}
        />
      </BasicModal>
      <BasicModal
        show={showSecondModal}
        size='small'
        title='Centro creado corretamente'
        close={() => setShowSecondModal(false)}
      ></BasicModal>
    </>
  );
};
