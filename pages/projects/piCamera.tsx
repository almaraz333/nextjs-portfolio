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
                    Pi Dog Surveillance Camera <Badge>2021</Badge>
                </Title>
                <Paragraph>
                    A Raspberry Pi Cam to keep an eye on my dog while I'm away.
                    Making sure my dog was safe while I was going to the store,
                    the gym, anywhere that wasn't home, is very important to me.
                    So to make sure he didn't get into any trouble I set up a Pi
                    Cam to stream to another Pi I set up as a server so I could
                    access the feed anywhere from my phone.
                </Paragraph>
                <Box mt={20}>
                    <List ml={4} my={4}>
                        <ListItem>
                            <Meta>Stack</Meta>
                            <span>Raspberry Pi, Pi Cam, Ranger</span>
                        </ListItem>
                    </List>

                    <ProjectImage
                        src="/images/projects/Ranger.jpg"
                        alt="game of life"
                    />
                </Box>
            </Container>
        </Layout>
    );
};

export default Project;
