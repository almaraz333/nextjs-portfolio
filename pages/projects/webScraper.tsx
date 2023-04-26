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
                    Sports Web Scraper <Badge>2019</Badge>
                </Title>
                <Paragraph>
                    A project for a small sports related insurance company to
                    gather data on players who played for certain teams for all
                    major national sports. Using a mix of Python and Beautiful
                    Soup I was able to scrape data from multiple sites, format
                    it, and present it in an easy-to-read format.
                </Paragraph>
                <Box mt={20}>
                    <List ml={4} my={4}>
                        <ListItem>
                            <Meta>Website</Meta>
                            <Link href="https://github.com/almaraz333/Sports-Web-Scraper" target="_blank">
                                Repo
                                <ExternalLinkIcon mx={2} />
                            </Link>
                        </ListItem>

                        <ListItem>
                            <Meta>Stack</Meta>
                            <span>Python, BeautifulSoup, Pandas</span>
                        </ListItem>
                    </List>

                    <ProjectImage
                        src="/images/projects/proFootballRef.png"
                        alt="football site"
                    />
                </Box>
            </Container>
        </Layout>
    );
};

export default Project;
