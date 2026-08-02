import type { Metadata } from "next";
import { notFound } from "next/navigation";

import WiiShell from "@/components/wii/WiiShell";
import { CHANNELS, getChannel, isChannelSlug } from "@/lib/channels";

interface ChannelPageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
    return CHANNELS.map(channel => ({ slug: channel.slug }));
}

export async function generateMetadata({
    params
}: ChannelPageProps): Promise<Metadata> {
    const { slug } = await params;
    if (!isChannelSlug(slug)) {
        return {};
    }
    const channel = getChannel(slug);
    return {
        title: `${channel.title} — Colton Almaraz`,
        description: channel.blurb
    };
}

export default async function ChannelPage({ params }: ChannelPageProps) {
    const { slug } = await params;
    if (!isChannelSlug(slug)) {
        notFound();
    }
    return <WiiShell initialSlug={slug} />;
}
