import { Modal, Grid } from 'semantic-ui-react';

export const BasicModal = (props) => {
  const { show, close, title, size, children } = props;
  return (
    <Grid>
      <Modal closeIcon open={show} onClose={close} size={size}>
        {title && <Modal.Header>{title}</Modal.Header>}
        <Modal.Content>{children}</Modal.Content>
      </Modal>
    </Grid>
  );
};

BasicModal.defaultProps = {
  size: 'tiny',
};
