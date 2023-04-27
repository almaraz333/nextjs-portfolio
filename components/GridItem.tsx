import NextLink from "next/link";
import Image from "next/image";
import { Box, Text, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Global } from "@emotion/react";

export const GridItem = ({ children, id, href, title, thumbnail }) => {
    return (
        <Box w="100%" align="center">
            <NextLink href={`/projects/${id}`}>
                <LinkBox cursor={"pointer"}>
                    <Image
                        src={thumbnail}
                        alt={title}
                        className="grid-item-thumbnail"
                        placeholder="blur"
                        loading="lazy"
                        height={200}
                        width={400}
                    />
                        <Text mt={2}>{title}</Text>
                    <Text fontSize={14}>{children}</Text>
                </LinkBox>
            </NextLink>
        </Box>
    );
};

export const GridItemStyle = () => (
    <Global styles={`.grid-item-thumbnail { border-radius: 12px; }`} />
);
