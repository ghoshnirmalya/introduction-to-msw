if (process.env.NODE_ENV === "development") {
  require("mocks");
}

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
