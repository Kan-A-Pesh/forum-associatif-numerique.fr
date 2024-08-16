export default function convertToEmbed(url: string) {
    try {
        const urlObject = new URL(url);

        if (urlObject.hostname === "www.youtube.com" || urlObject.hostname === "youtube.com") {
            const videoId = urlObject.searchParams.get("v");
            return `https://www.youtube.com/embed/${videoId}`;
        }

        if (urlObject.hostname === "www.twitch.tv" || urlObject.hostname === "twitch.tv") {
            const videoId = urlObject.pathname.split("/").pop();
            return `https://player.twitch.tv/?channel=${videoId}`;
        }

        if (urlObject.hostname === "www.twitter.com" || urlObject.hostname === "twitter.com") {
            const tweetId = urlObject.pathname.split("/").pop();
            return `https://twitframe.com/show?url=https://twitter.com/i/status/${tweetId}`;
        }

        if (urlObject.hostname === "www.instagram.com" || urlObject.hostname === "instagram.com") {
            const postUrl = urlObject.pathname;
            return `https://www.instagram.com/p${postUrl}`;
        }

        if (urlObject.hostname === "www.facebook.com" || urlObject.hostname === "facebook.com") {
            const postUrl = urlObject.pathname;
            return `https://www.facebook.com/plugins/post.php?href=https://www.facebook.com${postUrl}`;
        }

        if (urlObject.hostname === "www.soundcloud.com" || urlObject.hostname === "soundcloud.com") {
            const trackId = urlObject.pathname.split("/").pop();
            return `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${trackId}`;
        }

        return url;
    } catch {
        return url;
    }
}
