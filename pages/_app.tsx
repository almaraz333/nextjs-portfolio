import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import Layout from "../components/layouts/main";
import theme from "../libs/theme";
import "./app.scss";

function MyApp({ Component, pageProps, router }) {
    return (
        <ChakraProvider theme={theme}>
            <Layout router={router}>
                <AnimatePresence mode="wait" initial={true}>
                    <Component {...pageProps} key={router.route} />
                </AnimatePresence>
            </Layout>
        </ChakraProvider>
    );
}
export default MyApp;
