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
                Developed an Etherium trading app, an online Ethereum trading platform that enables users to effortlessly send and receive cryptocurrency. By integrating with users&apos; ETH wallets, the platform facilitates real-time transactions, providing a secure and efficient trading experience. 
                </Paragraph>
                <Box mt={20}>
                    <List ml={4} my={4}>
                        <ListItem>
                            <Meta>Website</Meta>
                            <Link href="https://blockchain-app-olive.vercel.app/" target="_blank">
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
