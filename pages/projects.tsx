import { Container, Box, Heading, SimpleGrid, Divider } from "@chakra-ui/react";

import { Section } from "../components/Section";
import { GridItem } from "../components/GridItem";
import biggbyThumbnail from "../public/images/projects/biggby.png";
import sympleeThumbnail from "../public/images/projects/symplee.png";
import gameOfLifeThumbnail from "../public/images/projects/gameOfLife.png";
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
                            href="/biggby"
                        >
                            Online Ordering for BIGGBY
                        </GridItem>
                    </Section>
                    <Section>
                        <GridItem
                            id={"symplee"}
                            title="Symplee"
                            thumbnail={sympleeThumbnail}
                            href="/symplee"
                        >
                            An Online Text and Video Chat Platform
                        </GridItem>
                    </Section>
                    <Section>
                        <GridItem
                            id={"gameOfLife"}
                            title="Conway's Game of Life"
                            thumbnail={gameOfLifeThumbnail}
                            href="/gameOfLife"
                        >
                            Conway's Game of Life
                        </GridItem>
                    </Section>
                </SimpleGrid>
            </Container>
        </Layout>
    );
};

export default Projects;
