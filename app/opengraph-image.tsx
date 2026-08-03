import { ImageResponse } from "next/og";

/*
 * Social share card (1200×630) drawn entirely with inline styles — no
 * external fetches, no font loading. A soft Wii Menu vignette: a 4×2 row
 * of channel tiles above the name and headline (facts from cv.md).
 */

export const alt =
    "The Colton Channel — Colton Almaraz, Senior Full-Stack Software Engineer";

export const size = {
    width: 1200,
    height: 630
};

export const contentType = "image/png";

const TILE_COUNT = 8;
const TINTED_TILE = 0;

export default function OpengraphImage() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background:
                    "linear-gradient(180deg, #e8ebef 0%, #f7f9fb 60%, #e8ebef 100%)"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: 4 * 148 + 3 * 20,
                    gap: 20,
                    marginBottom: 64
                }}
            >
                {Array.from({ length: TILE_COUNT }, (_, index) => (
                    <div
                        key={index}
                        style={{
                            width: 148,
                            height: 104,
                            borderRadius: 22,
                            border: "3px solid #c9d2da",
                            background:
                                index === TINTED_TILE
                                    ? "linear-gradient(180deg, #bfe7f7 0%, #9bd9f2 100%)"
                                    : "linear-gradient(180deg, #ffffff 0%, #f2f5f8 100%)",
                            boxShadow: "0 10px 24px rgba(60, 90, 120, 0.16)"
                        }}
                    />
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    fontSize: 84,
                    fontWeight: 700,
                    color: "#33404a",
                    letterSpacing: -1
                }}
            >
                Colton Almaraz
            </div>
            <div
                style={{
                    display: "flex",
                    marginTop: 18,
                    fontSize: 34,
                    fontWeight: 400,
                    color: "#0a7cb5"
                }}
            >
                Senior Full-Stack Software Engineer — The Colton Channel
            </div>
        </div>,
        {
            ...size
        }
    );
}
