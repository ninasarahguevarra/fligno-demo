import { wrapper } from "store";
import "assets/styles/globals.scss";

const App = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default wrapper.withRedux(App);