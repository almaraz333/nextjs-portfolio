import { Container, Badge, Link, List, ListItem, Box } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { Title, ProjectImage, Meta } from "../../components/Project";
import { Paragraph } from "../../components/Paragraph";
import { Layout } from "../../components/layouts/article";

const Project = () => {
    return (
        <Layout title="Crypto App">
            <Container>
                <Title>
                    Ethereum Trading App <Badge>2022</Badge>
                </Title>
                <Paragraph>
                    An online Ethereum trading platform for sending and
                    receiving crypto. Connect your ETH wallet to the app and
                    complete transactions in real-time. With the ability to see
                    past transactions and manage them.
                </Paragraph>
                <Box mt={20}>
                    <List ml={4} my={4}>
                        <ListItem>
                            <Meta>Website</Meta>
                            <Link href="https://blockchain-app-olive.vercel.app/">
                                https://blockchain-app-olive.vercel.app/
                                <ExternalLinkIcon mx={2} />
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Meta>Platform</Meta>
                            <span>Desktop/Mobile</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Stack</Meta>
                            <span>
                                NodeJS, React, Ethers, Recoil, Typescript,
                                Tailwind, Hardhat
                            </span>
                        </ListItem>
                    </List>

                    <ProjectImage
                        src="/images/projects/cryptoapp2.png"
                        alt="crypto app"
                    />
                </Box>
            </Container>
        </Layout>
    );
};

export default Project;
