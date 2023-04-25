import { Chrono } from "react-chrono";
import {
    Container,
    Box,
    Heading,
    Image,
    Link,
    Button,
    Icon,
    List,
    ListItem,
    useColorModeValue
} from "@chakra-ui/react";
import { BsLinkedin, BsGithub } from "react-icons/bs";

import { Section } from "../components/Section";
import { Paragraph } from "../components/Paragraph";
import { Layout } from "../components/layouts/article";

const Page = () => {
    const timelineItems = [
        {
            title: "2019",
            cardTitle: "Software Developer and UX Designer",
            cardSubtitle: "Professional Athletes Healthcare Advocates",
            cardDetailedText: "HTML, CSS, Javascript"
        },
        {
            title: "2020",
            cardTitle: "Graduated Michigan State University",
            cardSubtitle: "Experience Architecture",
            cardDetailedText: "Focus on UX design and front end engineering"
        },
        {
            title: "2020",
            cardTitle: "Software Engineer",
            cardSubtitle: "BIGGBY Coffee",
            cardDetailedText:
                "React, Typescript, Sass, GraphQL, Apollo Client, Python, MySQL"
        },
        {
            title: "2021",
            cardTitle: "Senior Frontend Engineer",
            cardSubtitle: "Ernst & Young",
            cardDetailedText: "React, Typescript, Sass, NX"
        }
    ];
    return (
        <Layout>
            <Container>
                <Box
                    display={{ md: "flex" }}
                    marginBottom="5rem"
                    marginTop="1rem"
                >
                    <Box flexGrow={1} position={"relative"}>
                        <Heading
                            as="h2"
                            variant="page-title"
                            textDecoration="underline"
                            textDecorationColor="#4666FF"
                            marginBottom="1rem"
                        >
                            Colton Almaraz
                        </Heading>
                        Software Engineer
                    </Box>
                    <Box
                        flexShrink={0}
                        mt={{ base: 4, md: 0 }}
                        ml={{ md: 6 }}
                        align="center"
                    >
                        <Image
                            borderColor={useColorModeValue(
                                "black",
                                "whiteAlpha.500"
                            )}
                            borderWidth={2}
                            borderStyle="solid"
                            width="100px"
                            height="100px"
                            objectFit="cover"
                            objectPosition="50% 40%"
                            display="inline-block"
                            borderRadius="full"
                            src={"images/headShot.jpg"}
                            alt="Profile Image"
                        />
                    </Box>
                </Box>
                <Section delay={"0.1"}>
                    <Heading as="h3" variant={"section-title"}>
                        About Me
                    </Heading>
                    <Paragraph>
                        I am a remote developer who creates minimal, effective
                        products, and sometime has a hand in designing them.
                        Whether it is mockups, prototypes, back-end, or
                        front-end, I have the technical skills required to
                        create an unforgettable experience for the website
                        users. I focus on services and products from an ethical
                        standpoint as well as profitable standpoint.
                    </Paragraph>
                </Section>
                <Section delay={"0.2"}>
                    <div style={{ margin: "5rem 0" }}>
                        <Chrono
                            hideControls={true}
                            items={timelineItems}
                            theme={{
                                primary: "#4666FF",
                                titleColor: useColorModeValue(
                                    "black",
                                    "whiteAlpha.500"
                                ),
                                secondary: "#fff"
                            }}
                        />
                    </div>
                </Section>
                <Section delay="0.3">
                    <Heading as="h3" variant="section-title">
                        Find me
                    </Heading>
                    <List>
                        <ListItem>
                            <Link
                                href="https://github.com/almaraz333"
                                target="_blank"
                            >
                                <Button
                                    variant="ghost"
                                    colorScheme={"red"}
                                    leftIcon={<Icon as={BsGithub} />}
                                    href="https://github.com/almaraz333"
                                >
                                    @almaraz333
                                </Button>
                            </Link>
                        </ListItem>

                        <ListItem>
                            <Link
                                href="https://linkedin.com/in/coltonalmaraz/"
                                target="_blank"
                            >
                                <Button
                                    variant="ghost"
                                    colorScheme={"red"}
                                    leftIcon={<Icon as={BsLinkedin} />}
                                    href="https://linkedin.com/in/coltonalmaraz/"
                                >
                                    @coltonalmaraz
                                </Button>
                            </Link>
                        </ListItem>
                    </List>
                </Section>
            </Container>
        </Layout>
    );
};

export default Page;
