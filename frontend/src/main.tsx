import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, gql } from '@apollo/client';
import { Provider } from 'react-redux'
import { store } from './redux/store.ts';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider, useCookies } from 'react-cookie';
import { setContext } from '@apollo/client/link/context';

// Custom hook to get the token from cookies
const useAuthToken = () => {
  const [cookies] = useCookies(['auth']);
  console.log(cookies.auth);
  
  return cookies.auth || '';  // Return the auth token from cookies
};

const createApolloClient = (token: string) => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql', 
  });

  const authLink = setContext((_, { headers }) => {
    if (!token) {
      return { headers };  
    }
    return {
      headers: {
        ...headers,  
        Authorization: token ? token : "",  
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),  
    cache: new InMemoryCache(),
  });
};

const ApolloWrapper = () => {
  // Get the token using the custom hook
  const token = useAuthToken();

  // Create Apollo Client with the token
  const client = createApolloClient(token);

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENTID_API_KEY}>
          <ApolloWrapper />
        </GoogleOAuthProvider>
      </CookiesProvider>
    </Provider>
  </StrictMode>
);
