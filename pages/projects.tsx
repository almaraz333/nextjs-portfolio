import {
    Container,
    Heading,
    SimpleGrid,
    Divider,
    Text
} from "@chakra-ui/react";

import { Section } from "../components/Section";
import { GridItem } from "../components/GridItem";
import biggbyThumbnail from "../public/images/projects/biggby.png";
import sympleeThumbnail from "../public/images/projects/symplee.png";
import gameOfLifeThumbnail from "../public/images/projects/gameOfLife.png";
import webScraperThumbnail from "../public/images/projects/webScraper.png";
import piCameraThumbnail from "../public/images/projects/piCamera.jpg";
import cryptoAppThumbnail from "../public/images/projects/cyrptoapp.png";
import eyBlogThumbnail from "../public/images/projects/eyBlog.png"
import { Layout } from "../components/layouts/article";

const Projects = () => {
    return (
        <Layout>
            <Container>
                <Text as="h2" fontSize={20} mb={4}>
                    Professional
                </Text>
                <SimpleGrid columns={[1, 1, 2]} gap={6}>
                <Section>
                        <GridItem
                            id={"eyBlog"}
                            title="EY Blog"
                            thumbnail={eyBlogThumbnail}
                            href="/ey-blog"
                        >
                            New blog designed for and by EY Studios
                        </GridItem>
                    </Section>

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
                            id={"webScraper"}
                            title="Sports Web Scraper"
                            thumbnail={webScraperThumbnail}
                            href="/webScraper"
                        >
                            A Python web scraper aimed at collecting sports data
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
                </SimpleGrid>
                <Divider />
                <Text as="h2" fontSize={20} my={4}>
                    Personal
                </Text>

                <SimpleGrid columns={[1, 1, 2]} gap={6}>
                    <Section>
                        <GridItem
                            id={"cryptoApp"}
                            title="Ethereum Crypto App"
                            thumbnail={cryptoAppThumbnail}
                            href="/cryptoApp"
                        >
                            An online Ethereum trading platform
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

                    <Section>
                        <GridItem
                            id={"piCamera"}
                            title="Pi Camera"
                            thumbnail={piCameraThumbnail}
                            href="/piCamera"
                        >
                            A surveillance camera to keep an eye on my dog
                        </GridItem>
                    </Section>
                </SimpleGrid>
            </Container>
        </Layout>
    );
};

export default Projects;
