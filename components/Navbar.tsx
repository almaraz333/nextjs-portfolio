import { Logo } from "./Logo";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
    Container,
    Box,
    Link,
    Stack,
    Heading,
    Flex,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    useColorModeValue,
    IconButton
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ThemeToggle } from "./ThemeToggle";

type LinkItemProps = {
    href: string;
    path: string;
    children: any;
};

const LinkItem = ({ href, path, children }: LinkItemProps) => {
    const active = path === href;
    const inactiveColor = useColorModeValue("gray200", "whiteAlpha.900");

    return (
            <Link
            href={href}
                p={2}
                color={active ? "glassTeal" : inactiveColor}
                style={{
                    borderBottomStyle: active ? "solid" : undefined,
                    borderBottomWidth: active ? "3px" : undefined,
                    borderBottomColor: active ? "glassTeal" : undefined
                }}
            >
                {children}
            </Link>
    );
};

const Navbar = ({openResumeModal, ...rest}) => {
    const { pathname } = useRouter();

    return (
        <Box
            position="fixed"
            zIndex={999}
            as="nav"
            w="100%"
            backgroundColor={useColorModeValue("#fffffffc", "#262629fc")}
            style={{ backdropFilter: "blur(10px)" }}
            {...rest}
        >
            <Container
                display="flex"
                p={1}
                mt={2}
                maxW="container.lg.md"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
            >
                <Flex align="flex-start" mr={5}>
                    <Heading as="h1" size="l" letterSpacing="tighter" pt={1}>
                        <Logo />
                    </Heading>

                    <Stack
                        direction={{ base: "column", md: "row" }}
                        display={{ base: "none", md: "flex" }}
                        width={{ base: "full", md: "auto" }}
                        alignItems="flex-start"
                        flexGrow={1}
                    >
                        <LinkItem href="/projects" path={pathname}>
                            Projects
                        </LinkItem>
                        <Box
                            onClick={openResumeModal}
                            className="neon-button"
                        >
                            Resume
                        </Box>
                    </Stack>
                </Flex>

                <Box flex={1} align="right">
                    <ThemeToggle />
                    <Box ml={2} display={{ base: "inline-block", md: "none" }}>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                icon={<HamburgerIcon />}
                                variant="outline"
                                aria-label="Options"
                            />
                            <MenuList px={2}>
                                <NextLink href="/" passHref>
                                    <MenuItem>About</MenuItem>
                                </NextLink>
                                <NextLink href="/projects" passHref>
                                    <MenuItem>Projects</MenuItem>
                                </NextLink>
                                <NextLink
                                    href="https://github.com/almaraz333/nextjs-portfolio"
                                    passHref
                                >
                                    <MenuItem>Source</MenuItem>
                                </NextLink>
                                <NextLink
                                    href="docs/AlmarazColton_Resume.pdf"
                                    passHref
                                >
                                    <MenuItem>
                                            Resume
                                    </MenuItem>
                                </NextLink>
                            </MenuList>
                        </Menu>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Navbar;
