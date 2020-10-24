export const TruncateText = text => {
    if (text.length > 50) {
        text = text.substring(0, 50) + "...";
    }
    return text;
};