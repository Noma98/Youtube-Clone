class Youtube {
    constructor(key) {
        this.getRequestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        this.key = key;
    }
    async search(query) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?maxResults=2&q=${query}&part=snippet&type=video&key=${this.key}`, this.getRequestOptions);
        const result = await response.json();
        return result.items.map(item => ({ ...item, id: item.id.videoId }));
    }
    async mostPopular() {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=id,snippet&chart=mostPopular&maxResults=2&key=${this.key}`, this.getRequestOptions);
        const result = await response.json();
        return result.items;
    }
}
export default Youtube;