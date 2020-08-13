// For demo purposes, we're loading the mock data from MSW. In a real app, the
// mocks should be present only for 'development' environment. The code for
// that change is below.
// if (process.env.NODE_ENV === "development") {
//   require("mocks");
// }

// If you want to include the mocks only on 'development' environment, you
// should remove the next line and uncomment lines 4, 5 and 6.
require("mocks");

const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
