import NextLink from "next/link";
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
import { BsLinkedin, BsGithub, BsInstagram } from "react-icons/bs";

import { Section } from "../components/Section";
import { Paragraph } from "../components/Paragraph";
import { BioSection, BioYear } from "../components/Bio";
import { Layout } from "../components/layouts/article";

const Page = () => {
    return (
        <Layout>
            <Container>
                <Box display={{ md: "flex" }}>
                    <Box flexGrow={1} position={"relative"}>
                        <Heading
                            as="h2"
                            variant="page-title"
                            textDecoration="underline"
                            textDecorationColor="#1f506e"
                            marginBottom=".5rem"
                        >
                            Colton Almaraz
                        </Heading>
                        Experience Architect
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
                    <Heading as="h3" variant="section-title">
                        Bio
                    </Heading>
                    <BioSection>
                        <BioYear>2019-2020</BioYear>
                        Software Developer and UX Designer - PAHA
                    </BioSection>
                    <BioSection>
                        <BioYear>2020</BioYear>
                        Graduated from Michigan State University
                    </BioSection>
                    <BioSection>
                        <BioYear>2020-2021</BioYear>
                        Software Developer - BIGGBY coffee
                    </BioSection>
                    <BioSection>
                        <BioYear>2021-</BioYear>
                        UX Engineer - Ernst & Young
                    </BioSection>
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

                        <ListItem>
                            <Link
                                href="https://instagram.com/almaraz333/"
                                target="_blank"
                            >
                                <Button
                                    variant="ghost"
                                    colorScheme={"red"}
                                    leftIcon={<Icon as={BsInstagram} />}
                                    href="https://instagram.com/almaraz333/"
                                >
                                    @almaraz333
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
