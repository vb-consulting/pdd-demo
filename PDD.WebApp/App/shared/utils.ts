export function urlToHandle(source: string) {
    let split = source.split("/").filter(s => s != "");
    return "@" + split[split.length-1];
}

export function take(source: string, n: number, extra = "...") {
    if (!source) {
        return source;
    }
    let len = source.length;
    if (len <= n) {
        return source;
    }
    return source.substring(0, n) + extra;
}

export function flagUrl(value: any) {
    if (!value) {
        return value;
    }
    return `https://cdn.jsdelivr.net/gh/lipis/flag-icons@6.6.6/flags/4x3/${value.toLowerCase()}.svg`
}

export function flagBackgroundImageStyle(value: any) {
    return `background-image: url(${flagUrl(value)})`;
}