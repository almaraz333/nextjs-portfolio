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
                    Conway's Game of Life <Badge>2021</Badge>
                </Title>
                <Paragraph>
                    Conway's Game of Life made in Python utilizing pyGame and
                    Numpy. The Game of Life, also known simply as Life, is a
                    cellular automaton devised by the British mathematician John
                    Horton Conway in 1970. It is a zero-player game and it is
                    Turing complete and can simulate a universal constructor or
                    any other Turing machine.
                </Paragraph>
                <Box mt={20}>
                    <List ml={4} my={4}>
                        <ListItem>
                            <Meta>Website</Meta>
                            <Link href="https://github.com/almaraz333/conways-game-of-life">
                                Repo
                                <ExternalLinkIcon mx={2} />
                            </Link>
                        </ListItem>

                        <ListItem>
                            <Meta>Stack</Meta>
                            <span>Python, pyGame, Numpy</span>
                        </ListItem>
                    </List>

                    <ProjectImage
                        src="/images/projects/gameOfLife.png"
                        alt="game of life"
                    />
                </Box>
            </Container>
        </Layout>
    );
};

export default Project;
