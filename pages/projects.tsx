import { Container, Box, Heading, SimpleGrid, Divider } from "@chakra-ui/react";

import { Section } from "../components/Section";
import { GridItem } from "../components/GridItem";
import biggbyThumbnail from "../public/images/projects/biggby.png";
import { Layout } from "../components/layouts/article";

const Projects = () => {
    return (
        <Layout>
            <Container>
                <Heading as="h3" fontSize={20} mb={4}>
                    Projects
                </Heading>
                <SimpleGrid columns={[1, 1, 2]} gap={6}>
                    <Section>
                        <GridItem
                            id={"biggby"}
                            title="BIGGBY Online Ordering"
                            thumbnail={biggbyThumbnail}
                            href="https://app.biggby.com"
                        >
                            Online Ordering for BIGGBY
                        </GridItem>
                    </Section>
                    <Section>
                        <GridItem
                            id={"biggby"}
                            title="BIGGBY Online Ordering"
                            thumbnail={biggbyThumbnail}
                            href="/"
                        >
                            Online Ordering for BIGGBY
                        </GridItem>
                    </Section>
                    <Section>
                        <GridItem
                            id={"biggby"}
                            title="BIGGBY Online Ordering"
                            thumbnail={biggbyThumbnail}
                            href="/"
                        >
                            Online Ordering for BIGGBY
                        </GridItem>
                    </Section>
                </SimpleGrid>
            </Container>
        </Layout>
    );
};

export default Projects;
