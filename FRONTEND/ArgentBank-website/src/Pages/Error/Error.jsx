
import { Link } from 'react-router-dom';
import './Error.scss';

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Oops! Something went wrong...</h1>
      <p> We are sorry, but it seems like there was an error.</p>
      <p>Please try again later or go back to the <Link to="/">home page</Link>.</p>
    </div>
  );
};

export default ErrorPage;
