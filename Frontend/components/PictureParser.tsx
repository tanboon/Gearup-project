export default function PictureParser(url: string): string {
    if (!url) {
        return url;
    } else {
        return url.replace("amp;", "");
    }
};
