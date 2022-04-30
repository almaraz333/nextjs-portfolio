import Head from "next/head";
import { Box, Container } from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/react";

import Navbar from "../Navbar";
import { useCreateModal } from "../../hooks/useCreateModal";

type MainProps = {
    router: any;
};

const Main: React.FC<MainProps> = ({ children, router }) => {
    const {
        Modal,
        closeModal: closeResumeModal,
        openModal: openResumeModal
    } = useCreateModal("resume-modal");
    return (
        <Box as="main" pb={8}>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>Colton Almaraz - Homepage</title>
            </Head>
            <Navbar path={router.path} openResumeModal={openResumeModal} />
            <Container maxW="container.md" pt={20}>
                {children}
            </Container>
            <Modal>
                <CloseButton onClick={closeResumeModal} />
                <iframe
                    height="100%"
                    width="100%"
                    src="docs/AlmarazColton_Resume.pdf"
                />
            </Modal>
        </Box>
    );
};

export default Main;
