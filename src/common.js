export function countConverter(count) {
    let result;
    if (count < 1000) {
        result = count;
    } else if (count < 10000) {
        const num = count / 1000;
        result = `${num.toFixed(1)}천`;
    } else if (count < 100000) {
        const num = count / 10000;
        result = `${num.toFixed(1)}만`;
    } else if (count < 100000000) {
        result = `${Math.floor(count / 10000)}만`;
    } else {
        result = `${Math.floor(count / 100000000)}억`;
    }
    return result;
}

export function agoConverter(dateString) {
    const publishedDate = new Date(dateString);
    const currentDate = new Date();
    const seconds = (currentDate.getTime() - publishedDate.getTime()) / 1000;
    let result;
    if (seconds < 60) {
        result = `${seconds}초 전`;
    } else if (seconds < 3600) {
        result = `${Math.floor(seconds / 60)}분 전`;
    } else if (seconds < 86400) {
        result = `${Math.floor(seconds / 3600)}시간 전`;
    } else if (seconds < 604800) {
        result = `${Math.floor(seconds / 86400)}일 전`;
    } else if (seconds < 2592000) {
        result = `${Math.floor(seconds / 604800)}주 전`;
    } else if (seconds < 31536000) {
        result = `${Math.floor(seconds / 2592000)}달 전`;
    } else {
        result = `${Math.floor(seconds / 31536000)}년 전`;
    }
    return result;
}
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function dateConverter(publishedAt) {
    const before = new Date(publishedAt);
    const year = before.getFullYear();
    const month = before.getMonth();
    const date = before.getDate();
    return `${year}. ${month}. ${date}.`;
}
export function tagMaker(tags) {
    let result = '';
    let i = 0;
    while (i < 3) {
        result += `#${tags[i]} `;
        i++;
    }
    return result;
}
