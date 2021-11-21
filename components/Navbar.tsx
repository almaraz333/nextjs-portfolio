import { Logo } from "./Logo";
import NextLink from "next/link";
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
        <NextLink href={href}>
            <Link
                p={2}
                bg={active ? "glassTeal" : undefined}
                color={active ? "#202023" : inactiveColor}
            >
                {children}
            </Link>
        </NextLink>
    );
};

const Navbar = (props) => {
    return (
        <Box
            position="fixed"
            zIndex={999}
            as="nav"
            w="100%"
            backgroundColor={useColorModeValue("#fffffffc", "#262629fc")}
            style={{ backdropFilter: "blur(10px)" }}
            {...props}
        >
            <Container
                display="flex"
                p={2}
                maxW="container.lg.md"
                wrap="wrap"
                align="center"
                justify="space-between"
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
                        <LinkItem href="/projects" path={"/path"}>
                            Projects
                        </LinkItem>
                        <LinkItem
                            href="/docs/AlmarazColton_Resume.pdf"
                            path={"path"}
                        >
                            Resume
                        </LinkItem>
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
                                    <MenuItem as={Link}>About</MenuItem>
                                </NextLink>
                                <NextLink href="/projects" passHref>
                                    <MenuItem as={Link}>Projects</MenuItem>
                                </NextLink>
                                <NextLink
                                    href="https://github.com/almaraz333/nextjs-portfolio"
                                    passHref
                                >
                                    <MenuItem as={Link}>Source</MenuItem>
                                </NextLink>
                                <NextLink
                                    href="/docs/AlmarazColton_Resume.pdf"
                                    passHref
                                >
                                    <MenuItem as={Link}>
                                        <a href="/docs/AlmarazColton_Resume.pdf">
                                            Resume
                                        </a>
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
