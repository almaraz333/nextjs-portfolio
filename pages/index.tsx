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
                {/* <Box
                    borderRadius="5"
                    bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.200")}
                    p={3}
                    my={6}
                    align="center"
                >
                    Hello, I'm a remote front-end engineer based in Portland,
                    OR!
                </Box> */}

                <Box display={{ md: "flex" }}>
                    <Box flexGrow={1} position={"relative"}>
                        <Heading as="h2" variant="page-title">
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
                                "whiteAlpha.200",
                                "whiteAlpha.500"
                            )}
                            borderWidth={1}
                            borderStyle="solid"
                            maxWidth="100px"
                            display="inline-block"
                            borderRadius="full"
                            src="/images/logo.png"
                            alt="Profile Image"
                        />
                    </Box>
                </Box>
                <Section delay={"0.1"}>
                    <Heading as="h3" variant={"section-title"}>
                        About Me
                    </Heading>
                    <Paragraph>
                        I'm a mostly remote dev who creates minimal, effective
                        products and sometimes has a hand in designing them.
                        Whether it's mockups, prototypes, back-end, or front-end
                        I have the skills required to create and experience the
                        user will never forget. I focus on products from a human
                        perspective as well as business.
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
                </Section>
                <Section delay="0.3">
                    <Heading as="h3" variant="section-title">
                        Find me
                    </Heading>
                    <List>
                        <ListItem>
                            <Link href="/" target="_blank">
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
                            <Link href="/" target="_blank">
                                <Button
                                    variant="ghost"
                                    colorScheme={"red"}
                                    leftIcon={<Icon as={BsLinkedin} />}
                                    href="https://www.linkedin.com/in/coltonalmaraz/"
                                >
                                    @coltonalmaraz
                                </Button>
                            </Link>
                        </ListItem>

                        <ListItem>
                            <Link href="/" target="_blank">
                                <Button
                                    variant="ghost"
                                    colorScheme={"red"}
                                    leftIcon={<Icon as={BsInstagram} />}
                                    href="https://www.instagram.com/almaraz333/"
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
