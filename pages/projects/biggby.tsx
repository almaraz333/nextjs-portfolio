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
                    Biggby <Badge>2020</Badge>
                </Title>
                <Paragraph>
                Developed a seamless app and web experience for BIGGBY Coffee, an international coffee company, by employing full-stack software engineering expertise. The platform streamlines the ordering process for customers, allowing them to effortlessly place orders and select their preferred store for pickup. With a strong focus on user experience, the intuitive interface prioritizes user satisfaction and ensures a delightful and efficient experience across all devices. The robust backend infrastructure guarantees smooth and reliable communication between the customer-facing app, web platform, and store systems. An app and web experience for the international coffee
                    company, BIGGBY. Working on both front-end and back-end I
                    created a platform for customers to place and order and have
                    that order sent to a store of their choosing. All this while
                    also keeping the user&apos;s experience in mind and making it as
                    enjoyable as possible.
                </Paragraph>
                <Box mt={20}>
                    <List ml={4} my={4}>
                        <ListItem>
                            <Meta>Website</Meta>
                            <Link href="https://app.biggby.com" target="_blank">
                                https://app.biggby.com{" "}
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
                                NodeJS, React, Typescript, Apollo, Graphql
                            </span>
                        </ListItem>
                    </List>

                    <ProjectImage
                        src="/images/projects/biggbyCheckout.png"
                        alt="biggby"
                    />
                </Box>
            </Container>
        </Layout>
    );
};

export default Project;
