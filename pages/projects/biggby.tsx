import { Container, Badge, Link, List, ListItem } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { Title, ProjectImage, Meta } from "../../components/Project";
import { Paragraph } from "../../components/Paragraph";
import { Layout } from "../../components/layouts/article";

const Project = () => {
    return (
        <Layout title="Biggby">
            <Container>
                <Title>
                    Biggby <Badge>2020</Badge>
                </Title>
                <Paragraph>Biggby Desc.</Paragraph>
                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>Website</Meta>
                        <Link href="https://www.app.biggby.com">
                            https://app.biggby.com <ExternalLinkIcon mx={2} />
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

                <ProjectImage src="/images/projects/biggby.png" alt="biggby" />
            </Container>
        </Layout>
    );
};

export default Project;
