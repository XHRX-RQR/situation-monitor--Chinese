/**
 * World Leaders API - Fetch news for world leaders from GDELT
 */

import { WORLD_LEADERS } from '$lib/config/leaders';
import type { WorldLeader, LeaderNews } from '$lib/types';
import { CORS_PROXY_URL, logger } from '$lib/config/api';
import { translateText } from '$lib/services/translation';

interface GdeltArticle {
	title: string;
	url: string;
	seendate: string;
	domain: string;
}

interface GdeltResponse {
	articles?: GdeltArticle[];
}

/**
 * Fetch news for a single leader
 */
async function fetchLeaderNews(leader: WorldLeader): Promise<WorldLeader> {
	// Build query from leader's keywords
	const query = leader.keywords.map((k) => `"${k}"`).join(' OR ');

	logger.log('Leaders API', `🔍 Fetching news for ${leader.name} with query: ${query}`);

	try {
		const gdeltUrl = `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}&mode=artlist&maxrecords=5&format=json&sort=date`;
		const proxyUrl = CORS_PROXY_URL + encodeURIComponent(gdeltUrl);

		logger.log('Leaders API', `📡 Requesting: ${proxyUrl.substring(0, 150)}...`);

		const response = await fetch(proxyUrl);
		if (!response.ok) {
			logger.error('Leaders API', `❌ HTTP ${response.status} for ${leader.name}`);
			throw new Error(`HTTP ${response.status}`);
		}

		const contentType = response.headers.get('content-type');
		if (!contentType?.includes('application/json')) {
			logger.warn('Leaders API', `⚠️ Non-JSON response for ${leader.name}: ${contentType}`);
			return { ...leader, news: [] };
		}

		const text = await response.text();
		let data: GdeltResponse;
		try {
			data = JSON.parse(text);
		} catch {
			logger.error('Leaders API', `❌ JSON parse failed for ${leader.name}`);
			return { ...leader, news: [] };
		}

		const articleCount = data.articles?.length || 0;
		logger.log('Leaders API', `✅ Found ${articleCount} articles for ${leader.name}`);

		const news: LeaderNews[] = (data.articles || []).map((article) => ({
			source: article.domain || 'Unknown',
			title: article.title || '',
			link: article.url || '',
			pubDate: article.seendate || ''
		}));

		if (news.length > 0) {
			logger.log('Leaders API', `🌐 Translating ${news.length} articles for ${leader.name}...`);
		}

		// 翻译所有新闻标题
		const translatedNews = await Promise.all(
			news.map(async (item) => {
				try {
					const translatedTitle = await translateText(item.title);
					return { ...item, translatedTitle };
				} catch (error) {
					logger.error('Leaders API', 'Translation failed:', error);
					return item;
				}
			})
		);

		if (translatedNews.length > 0) {
			logger.log('Leaders API', `✅ Translation complete for ${leader.name}`);
		}

		return { ...leader, news: translatedNews };
	} catch (error) {
		logger.warn('Leaders API', `Error fetching news for ${leader.name}:`, error);
		return { ...leader, news: [] };
	}
}

/**
 * Fetch news for all world leaders
 * Batches requests to avoid rate limits
 */
export async function fetchWorldLeaders(): Promise<WorldLeader[]> {
	const batchSize = 5;
	const results: WorldLeader[] = [];

	// Fetch in batches to avoid rate limits
	for (let i = 0; i < WORLD_LEADERS.length; i += batchSize) {
		const batch = WORLD_LEADERS.slice(i, i + batchSize);
		const batchResults = await Promise.allSettled(batch.map(fetchLeaderNews));

		for (const result of batchResults) {
			if (result.status === 'fulfilled') {
				results.push(result.value);
			}
		}

		// Small delay between batches
		if (i + batchSize < WORLD_LEADERS.length) {
			await new Promise((resolve) => setTimeout(resolve, 300));
		}
	}

	// Sort by news activity (leaders with more news first)
	return results.sort((a, b) => (b.news?.length || 0) - (a.news?.length || 0));
}
