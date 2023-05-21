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
import Lottie from "lottie-react";
import TechLottie from '../public/images/tech.json'

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
            cardTitle: "Senior Software Engineer",
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
                        textAlign="center"
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
                <Lottie style={{paddingBottom: "2rem"}} animationData={TechLottie} loop={true} />
                <Section delay={"0.1"}>
                    <Heading as="h3" variant={"section-title"}>
                        About Me
                    </Heading>
                    <Paragraph>
                    As a senior software engineer, I specialize in creating minimal, effective products with a focus on ethical and profitable outcomes. I excel in both designing and developing websites and applications, from mockups and prototypes to front-end and back-end implementation. My technical skills include TypeScript, React, Rust, C++, Python, and more, and I have experience with Git, CI/CD, Jest, OOP, and Agile methodologies. With a background in Experience Architecture and UX design, I prioritize user-centric design and accessibility, ensuring an unforgettable experience for website users. In my current and past roles, I have designed and developed AI-integrated data visualization tools, collaborated remotely with global clients, overseen CI/CD processes, and developed e-commerce storefronts that boosted sales by 20-30%. 
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
