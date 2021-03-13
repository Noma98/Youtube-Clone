class Youtube {
    constructor(httpClient) {
        this.youtube = httpClient;
    }

    async getMostPopular() {
        const response = await this.youtube.get('videos', {
            params: {
                part: 'snippet',
                chart: 'mostPopular',
                maxResults: 4,
                fields: 'items(id,snippet(channelId))',
            },
        });
        return response.data.items;
    }

    async getSearchResult(query) {
        const response = await this.youtube.get('search', {
            params: {
                part: 'snippet',
                type: 'video',
                q: query,
                maxResults: 2,
                fields: 'items(id(videoId),snippet(channelId))',
            },
        });
        return response.data.items.map(item => ({ ...item, id: item.id.videoId }));
    }

    async getRcmData(videoId) {
        const response = await this.youtube.get('search', {
            params: {
                part: 'snippet',
                type: 'video',
                relatedToVideoId: videoId,
                maxResults: 2,
                fields: 'items(id.videoId,snippet(channelId))',
            },
        });
        return response.data.items.map(item => ({ ...item, id: item.id.videoId }));
    }
    async fetchVideoData(videoId) {
        const response = await this.youtube.get('videos', {
            params: {
                part: 'snippet, statistics',
                id: videoId,
                fields: 'items(id,snippet(publishedAt,title,description,thumbnails.medium.url,tags),statistics(viewCount,likeCount,dislikeCount,commentCount))',
            }
        });
        return response.data.items[0];
    }
    async fetchChannelData(channelId) {
        const response = await this.youtube.get('channels', {
            params: {
                part: 'snippet,statistics',
                id: channelId,
                fields: 'items(id,snippet(title,thumbnails.default.url),statistics(subscriberCount))',
            }
        });
        return response.data.items[0];
    }
    getAllData(videoId, channelId) {
        return Promise.all([this.fetchVideoData(videoId), this.fetchChannelData(channelId)]);
    }

}
export default Youtube;