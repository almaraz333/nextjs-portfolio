import { motion } from "framer-motion";
import Head from "next/head";
import { GridItemStyle } from "../GridItem";

const variants = {
    hidden: { opacity: 0, x: 0, y: 20 },
    enter: { opacity: 1, x: 0, y: 20 },
    exit: { opacity: 0, x: 0, y: 20 }
};

type LayoutProps = {
    title?: string;
};

export const Layout: React.FC<LayoutProps> = ({ children, title }) => (
    <motion.article
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.4, type: "easeInOut" }}
        style={{ position: "relative", zIndex: 1 }}
    >
        <>
            {title && (
                <Head>
                    <title>{title} - Colton Almaraz</title>
                </Head>
            )}
            {children}
            <GridItemStyle />
        </>
    </motion.article>
);
