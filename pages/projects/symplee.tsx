import { Container, Badge, Link, List, ListItem, Box } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { Title, ProjectImage, Meta } from "../../components/Project";
import { Paragraph } from "../../components/Paragraph";
import { Layout } from "../../components/layouts/article";

const Project = () => {
    return (
        <Layout title="Biggby">
            <Container>
                <Title>
                    Symplee <Badge>2020</Badge>
                </Title>
                <Paragraph>
                    A fast, intuitive, text and video chat app focused on a good
                    user experience. Being able to communicate with friends in
                    an efficient way while also knowing you secure while doing
                    so was a vital idea in this project.
                </Paragraph>
                <Box mt={20}>
                    <List ml={4} my={4}>
                        <ListItem>
                            <Meta>Website</Meta>
                            <Link href="https://app.symplee.com">
                                https://symplee.app/
                                <ExternalLinkIcon mx={2} />
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Meta>Platform</Meta>
                            <span>Desktop/Mobile</span>
                        </ListItem>
                        <ListItem>
                            <Meta>Stack</Meta>
                            <span>NodeJS, React, Apollo, Graphql</span>
                        </ListItem>
                    </List>

                    <ProjectImage
                        src="/images/projects/symplee.png"
                        alt="symplee"
                    />
                </Box>
            </Container>
        </Layout>
    );
};

export default Project;
