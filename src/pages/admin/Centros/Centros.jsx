import React, { useState } from 'react';
import { Button, Grid, GridColumn, Segment } from 'semantic-ui-react';
import { BasicModal } from '../../../components/Shared';
import { CenterForm, ListCenter } from '../../../components/Admin/Centers';
import './Centros.scss';

export const Centros = () => {
  const [showModal, setShowModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [reload, setReload] = useState(false); //hook para llamar para recargar los datos.

  const onOpenCloseModal = () => {
    setShowModal((prevState) => !prevState);
  }; //prevState, estatus actual de la variable del estado

  const onReload = () => setReload((prevState) => !prevState);
  return (
    <Grid stackable columns='equal'>
      <Grid.Row>
        <Grid.Column>
          <h4 className='centros-page__title'>Centros</h4>
        </Grid.Column>
        <GridColumn>
          <Button
            floated='right'
            primary
            icon='plus'
            circular
            onClick={onOpenCloseModal}
          ></Button>
        </GridColumn>
      </Grid.Row>
      <Grid.Row>
        <GridColumn>
          <ListCenter reload={reload}></ListCenter>
        </GridColumn>
      </Grid.Row>
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
    </Grid>
  );
};
