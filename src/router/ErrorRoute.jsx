import { useRouteError } from 'react-router-dom';
export const ErrorRoute = () => {
  // const error = useRouteError();
  return (
    <div>
      <h1>Oops!</h1>
      <p>Un error ha ocurrido</p>
      <p>{/* <i> {error.statusText || error.message}</i> */}</p>
    </div>
  );
};
