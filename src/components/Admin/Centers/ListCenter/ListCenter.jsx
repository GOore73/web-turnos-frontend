import { useEffect, useState, React } from 'react';
import { Loader, List, Table, Icon, Button } from 'semantic-ui-react';
import { size, map, _ } from 'lodash';
import { useAuth } from '../../../../hooks';
import { Center } from '../../../../api/center';

const centerController = new Center();

export const ListCenter = (props) => {
  const { reload, showModal, setCenter } = props;
  const [centers, setCenters] = useState(null);
  const { accessToken } = useAuth();
  const [orderColumn, setOrderColumn] = useState({
    counter: 0,
    column: null,
    direction: 'ascending',
  });

  const editButton = (centro) => {
    setCenter(centro);
    showModal();
  };

  useEffect(() => {
    (async () => {
      if (orderColumn.counter > 0) {
        console.log(orderColumn);

        setCenters(
          _.orderBy(
            _.sortBy(centers, [orderColumn.column]),
            [orderColumn.column],
            [orderColumn.direction === 'ascending' ? 'asc' : 'desc']
          )
        );
        orderColumn.counter = 0;
        console.log(orderColumn);
      } else {
        try {
          console.log('entró aquí');
          console.log(orderColumn);
          setCenters(null); //esto hará que se renderize el componente y aparecerá el loader por unos instantes

          const response = await centerController.getCenters(accessToken);
          setCenters(
            _.orderBy(
              _.sortBy(response.data, [orderColumn.column]),
              [orderColumn.column],
              [orderColumn.direction === 'ascending' ? 'asc' : 'desc']
            )
          );
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }, [orderColumn, reload]);

  if (!centers) return <Loader active inline='centered' />;
  if (size(centers) === 0) return 'No hay ningún centro';

  return (
    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            sorted={
              orderColumn.column === 'alias' ? orderColumn.direction : null
            }
            onClick={() =>
              setOrderColumn({
                counter: 1,
                column: 'alias',
                direction:
                  orderColumn.direction === 'ascending'
                    ? 'descending'
                    : 'ascending',
              })
            }
          >
            Alias
          </Table.HeaderCell>
          <Table.HeaderCell
            sorted={
              orderColumn.column === 'name' ? orderColumn.direction : null
            }
            onClick={() =>
              setOrderColumn({
                counter: 1,
                column: 'name',
                direction:
                  orderColumn.direction === 'ascending'
                    ? 'descending'
                    : 'ascending',
              })
            }
          >
            Nombre
          </Table.HeaderCell>
          <Table.HeaderCell
            textAlign='center'
            sorted={
              orderColumn.column === 'active' ? orderColumn.direction : null
            }
            onClick={() =>
              setOrderColumn({
                counter: 1,
                column: 'active',
                direction:
                  orderColumn.direction === 'ascending'
                    ? 'descending'
                    : 'ascending',
              })
            }
          >
            Activado?
          </Table.HeaderCell>
          <Table.HeaderCell textAlign='center'>Acciones</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(centers, (cter) => (
          <Table.Row key={cter._id}>
            <Table.Cell>{cter.alias}</Table.Cell>
            <Table.Cell>{cter.name}</Table.Cell>
            <Table.Cell textAlign='center'>
              <Icon
                size='large'
                color={cter.active ? 'green' : 'red'}
                name={cter.active ? 'check circle' : 'x'}
              ></Icon>
            </Table.Cell>
            <Table.Cell textAlign='center'>
              <Button icon color='teal'>
                <Icon name='eye' onClick={() => editButton(cter)} />
              </Button>
              <Button icon primary>
                <Icon name='pencil' />
              </Button>
              <Button icon color='red'>
                <Icon name='trash' />
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );

  // return (
  //   <List divided verticalAlign='middle'>
  //     {map(centers, (center) => (
  //       <List.Item key={center._id}>
  //         <List.Content>{`${center.name}-${center.alias}`}</List.Content>
  //       </List.Item>
  //     ))}
  //   </List>
  // );
};
