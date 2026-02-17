/**
 * DeepLX Translation Service
 * 实时翻译新闻标题和描述
 */

import { logger } from '$lib/config/api';

// DeepLX API 配置
const DEEPLX_API_URL = 'https://api.deeplx.org/Z-JfCHlUsFJvglsRpLYwGS9Syd7ycbUyjkTcdDaQLmU/translate';
const DEEPLX_API_KEY = 'Z-JfCHlUsFJvglsRpLYwGS9Syd7ycbUyjkTcdDaQLmU';

// 翻译请求接口
interface TranslateRequest {
	text: string;
	source_lang?: string;
	target_lang: string;
}

// 翻译响应接口
interface TranslateResponse {
	code: number;
	data: string;
	alternatives?: string[];
	source_lang?: string;
	target_lang?: string;
}

// 翻译缓存
const translationCache = new Map<string, string>();

// 生成缓存键
function getCacheKey(text: string, targetLang: string): string {
	return `${targetLang}:${text}`;
}

/**
 * 翻译文本
 * @param text 要翻译的文本
 * @param targetLang 目标语言 (默认: zh - 简体中文)
 * @param sourceLang 源语言 (默认: auto - 自动检测)
 * @returns 翻译后的文本
 */
export async function translateText(
	text: string,
	targetLang: string = 'zh',
	sourceLang: string = 'auto'
): Promise<string> {
	// 检查缓存
	const cacheKey = getCacheKey(text, targetLang);
	if (translationCache.has(cacheKey)) {
		logger.log('Translation', 'Cache hit:', text.substring(0, 50));
		return translationCache.get(cacheKey)!;
	}

	try {
		const requestBody: TranslateRequest = {
			text,
			target_lang: targetLang
		};

		// 只在非自动检测时添加源语言
		if (sourceLang !== 'auto') {
			requestBody.source_lang = sourceLang;
		}

		logger.log('Translation', `Translating: ${text.substring(0, 50)}...`);

		const response = await fetch(DEEPLX_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		});

		if (!response.ok) {
			throw new Error(`Translation API error: ${response.status}`);
		}

		const result: TranslateResponse = await response.json();

		if (result.code !== 200) {
			throw new Error(`Translation failed with code: ${result.code}`);
		}

		// 缓存翻译结果
		translationCache.set(cacheKey, result.data);

		logger.log('Translation', 'Success:', result.data.substring(0, 50));

		return result.data;
	} catch (error) {
		logger.error('Translation', 'Error:', error);
		// 翻译失败时返回原文
		return text;
	}
}

/**
 * 批量翻译多个文本
 * @param texts 要翻译的文本数组
 * @param targetLang 目标语言
 * @param sourceLang 源语言
 * @param concurrent 并发数 (默认: 3)
 * @returns 翻译后的文本数组
 */
export async function translateBatch(
	texts: string[],
	targetLang: string = 'zh',
	sourceLang: string = 'auto',
	concurrent: number = 3
): Promise<string[]> {
	const results: string[] = new Array(texts.length);
	const queue = texts.map((text, index) => ({ text, index }));

	// 并发控制函数
	async function processQueue() {
		while (queue.length > 0) {
			const item = queue.shift();
			if (!item) break;

			const translated = await translateText(item.text, targetLang, sourceLang);
			results[item.index] = translated;

			// 避免请求过快,添加小延迟
			await new Promise((resolve) => setTimeout(resolve, 100));
		}
	}

	// 创建并发任务
	const workers = Array.from({ length: Math.min(concurrent, texts.length) }, () =>
		processQueue()
	);

	await Promise.all(workers);

	return results;
}

/**
 * 清除翻译缓存
 */
export function clearTranslationCache() {
	translationCache.clear();
	logger.log('Translation', 'Cache cleared');
}

/**
 * 获取缓存大小
 */
export function getTranslationCacheSize(): number {
	return translationCache.size;
}

/**
 * 预翻译文本(不等待结果)
 * 用于预加载翻译
 */
export function preTranslateText(text: string, targetLang: string = 'zh') {
	const cacheKey = getCacheKey(text, targetLang);
	if (!translationCache.has(cacheKey)) {
		translateText(text, targetLang).catch(() => {
			// 静默失败
		});
	}
}
