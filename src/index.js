import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo-hooks'
import './styles/bulma.css';
import './styles/bulma-checkradio.min.css';
import './styles/animate.min.css';
import './styles/index.css';
import { ThemeProvider } from 'styled-components';
import Routes from './components/Routes.jsx';



const client = new ApolloClient({
  uri: 'http://localhost:9000/graphql'
});

const mainTheme = {
  mainColor: "#546e7a",
  mainColorLight: "#819ca9",
  greyColor: "#29434e",
  marginTop: '10%',
  title: {
    font: "18px",
    weight: "bold"
  },
  number: {
    font: "40px",
    weight: "300"
  }
};



ReactDOM.render(<ApolloProvider client={client}>
<ThemeProvider theme={mainTheme}><Routes /></ThemeProvider>
</ApolloProvider>, document.getElementById('root'));
