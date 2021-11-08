import Link from "next/link";
import Image from "next/image";
import { Text } from "@chakra-ui/react";
import styled from "@emotion/styled";

const LogoBox = styled.span`
    font-weight: bold;
    font-size: 18px;
    display: inline-flex;
    align-items: center;
    height: 30px;
    line-height: 20px;
    padding: 10px;
    cursor: pointer;
    &:hover img {
        transform: rotate(20deg);
    }
`;

export const Logo = () => {
    return (
        <Link href="/">
            <LogoBox>
                <Image
                    src="/images/logo.png"
                    width={20}
                    height={20}
                    alt="logo"
                />
                <Text fontWeight="bold" ml={3}>
                    Colton Almaraz
                </Text>
            </LogoBox>
        </Link>
    );
};
