import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";

import Navbar from "../Navbar";

type MainProps = {
    router: any;
};

const Main: React.FC<MainProps> = ({ children, router }) => {
    return (
        <Box as="main" pb={8}>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>Colton Almaraz - Homepage</title>
            </Head>
            <Navbar path={router.path} />
            <Container maxW="container.md" pt={20}>
                {children}
            </Container>
        </Box>
    );
};

export default Main;
