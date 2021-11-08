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
                    <Box flexGrow={1}>
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
                            borderColor="whiteAplha800"
                            borderWidth={2}
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
                        Projects
                    </Heading>
                    <Paragraph>
                        blah blah blah worked on projects such as{" "}
                        <NextLink href="/projects/SOMEPROjeCT">
                            <Link>PROJECT NAME</Link>
                        </NextLink>
                    </Paragraph>
                    <Box align="center"></Box>
                </Section>
                <Section delay={"0.2"}>
                    <Heading as="h3" variant="section-title">
                        Bio
                    </Heading>
                    <BioSection>
                        <BioYear>1996</BioYear>
                        Born (unfortunately)
                    </BioSection>
                    <BioSection>
                        <BioYear>1996</BioYear>
                        Born (unfortunately)
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
                                >
                                    @almaraz
                                </Button>
                            </Link>
                        </ListItem>

                        <ListItem>
                            <Link href="/" target="_blank">
                                <Button
                                    variant="ghost"
                                    colorScheme={"red"}
                                    leftIcon={<Icon as={BsLinkedin} />}
                                >
                                    @almaraz
                                </Button>
                            </Link>
                        </ListItem>

                        <ListItem>
                            <Link href="/" target="_blank">
                                <Button
                                    variant="ghost"
                                    colorScheme={"red"}
                                    leftIcon={<Icon as={BsInstagram} />}
                                >
                                    @almaraz
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
