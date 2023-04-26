import { Container, Badge, Link, List, ListItem, Box } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

import { Title, ProjectImage, Meta } from "../../components/Project";
import { Paragraph } from "../../components/Paragraph";
import { Layout } from "../../components/layouts/article";

const Project = () => {
    return (
        <Layout title="EY Blog">
            <Container>
                <Title>
                    EY <Badge>2022</Badge>
                </Title>
                <Paragraph>
                Developed a contemporary, responsive blog platform for EY studios worldwide, catering to a diverse audience of tens of thousands of readers across various devices. The objective of this project was to revitalize the studio blog, providing an enhanced user experience that reflects the modern age and seamlessly adapts to a wide range of screen sizes. As a full-stack software engineer, I successfully implemented cutting-edge frontend and backend technologies to ensure efficient performance, user engagement, and maintainability.
                </Paragraph>
                <Box mt={20}>
                    <List ml={4} my={4}>
                        <ListItem>
                            <Meta>Website</Meta>
                            <Link href="https://studio.ey.com/blog/study-halls/" target="_blank">
                            https://studio.ey.com/blog/study-halls/
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
                                HTML, JS, Greensock, 11ty
                            </span>
                        </ListItem>
                    </List>

                    <ProjectImage
                        src="/images/projects/eyBlogHomepage.png"
                        alt="ey blog homepage"
                    />
                </Box>
            </Container>
        </Layout>
    );
};

export default Project;
