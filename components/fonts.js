import { Global } from "@emotion/react";

const Fonts = () => (
    <Global
        styles={`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');
        
        body {
            font-family: 'Noto Sans', sans-serif;         
         }
        `}
    />
);

export default Fonts;
