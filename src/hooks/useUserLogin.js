import { useApolloClient, useQuery } from '@apollo/react-hooks';
import { IS_USER_LOGGED_IN, USER } from 'apollo/queries';

const useUserLogin = () => {
  useQuery(USER);
  const {
    data: { isUserLoggedIn }
  } = useQuery(IS_USER_LOGGED_IN);
  const client = useApolloClient();


  if (!isUserLoggedIn) {
    client.writeData({
      data: {
        isUserLoggedIn: Boolean(localStorage.getItem('token'))
      }
    });
  }

  return { isUserLoggedIn };
};

export default useUserLogin;
