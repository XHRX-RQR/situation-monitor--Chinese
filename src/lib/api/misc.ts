/**
 * Miscellaneous API functions for specialized panels
 * Note: Some of these use mock data as the original APIs require authentication
 */

import { translateText } from '$lib/services/translation';

export interface Prediction {
	id: string;
	question: string;
	yes: number;
	volume: string;
	translatedQuestion?: string;
}

export interface WhaleTransaction {
	coin: string;
	amount: number;
	usd: number;
	hash: string;
}

export interface Contract {
	agency: string;
	description: string;
	vendor: string;
	amount: number;
	translatedDescription?: string;
}

export interface Layoff {
	company: string;
	count: number;
	title: string;
	date: string;
	translatedTitle?: string;
}

/**
 * Fetch Polymarket predictions
 * Note: Polymarket API requires authentication - returns curated prediction data
 */
export async function fetchPolymarket(): Promise<Prediction[]> {
	// These represent active prediction markets on major events
	const predictions: Prediction[] = [
		{
			id: 'pm-1',
			question: 'Will there be a US-China military incident in 2026?',
			yes: 18,
			volume: '2.4M'
		},
		{ id: 'pm-2', question: 'Will Bitcoin reach $150K by end of 2026?', yes: 35, volume: '8.1M' },
		{ id: 'pm-3', question: 'Will Fed cut rates in Q1 2026?', yes: 42, volume: '5.2M' },
		{ id: 'pm-4', question: 'Will AI cause major job losses in 2026?', yes: 28, volume: '1.8M' },
		{ id: 'pm-5', question: 'Will Ukraine conflict end in 2026?', yes: 22, volume: '3.5M' },
		{ id: 'pm-6', question: 'Will oil prices exceed $100/barrel?', yes: 31, volume: '2.1M' },
		{
			id: 'pm-7',
			question: 'Will there be a major cyberattack on US infrastructure?',
			yes: 45,
			volume: '1.5M'
		}
	];

	// 翻译所有问题
	const translated = await Promise.all(
		predictions.map(async (p) => {
			try {
				const translatedQuestion = await translateText(p.question);
				return { ...p, translatedQuestion };
			} catch {
				return p;
			}
		})
	);

	return translated;
}

/**
 * Fetch whale transactions
 * Note: Would use Whale Alert API - returning sample data
 */
export async function fetchWhaleTransactions(): Promise<WhaleTransaction[]> {
	// Sample whale transaction data
	return [
		{ coin: 'BTC', amount: 1500, usd: 150000000, hash: '0x1a2b...3c4d' },
		{ coin: 'ETH', amount: 25000, usd: 85000000, hash: '0x5e6f...7g8h' },
		{ coin: 'BTC', amount: 850, usd: 85000000, hash: '0x9i0j...1k2l' },
		{ coin: 'SOL', amount: 500000, usd: 75000000, hash: '0x3m4n...5o6p' },
		{ coin: 'ETH', amount: 15000, usd: 51000000, hash: '0x7q8r...9s0t' }
	];
}

/**
 * Fetch government contracts
 * Note: Would use USASpending.gov API - returning sample data
 */
export async function fetchGovContracts(): Promise<Contract[]> {
	// Sample government contract data
	const contracts: Contract[] = [
		{
			agency: 'DOD',
			description: 'Advanced radar systems development and integration',
			vendor: 'Raytheon',
			amount: 2500000000
		},
		{
			agency: 'NASA',
			description: 'Artemis program lunar lander support services',
			vendor: 'SpaceX',
			amount: 1800000000
		},
		{
			agency: 'DHS',
			description: 'Border security technology modernization',
			vendor: 'Palantir',
			amount: 450000000
		},
		{
			agency: 'VA',
			description: 'Electronic health records system upgrade',
			vendor: 'Oracle Cerner',
			amount: 320000000
		},
		{
			agency: 'DOE',
			description: 'Clean energy grid infrastructure',
			vendor: 'General Electric',
			amount: 275000000
		}
	];

	// 翻译所有描述
	const translated = await Promise.all(
		contracts.map(async (c) => {
			try {
				const translatedDescription = await translateText(c.description);
				return { ...c, translatedDescription };
			} catch {
				return c;
			}
		})
	);

	return translated;
}

/**
 * Fetch layoffs data
 * Note: Would use layoffs.fyi API or similar - returning sample data
 */
export async function fetchLayoffs(): Promise<Layoff[]> {
	const now = new Date();
	const formatDate = (daysAgo: number) => {
		const d = new Date(now);
		d.setDate(d.getDate() - daysAgo);
		return d.toISOString();
	};

	const layoffs: Layoff[] = [
		{ company: 'Meta', count: 1200, title: 'Restructuring engineering teams', date: formatDate(2) },
		{ company: 'Amazon', count: 850, title: 'AWS division optimization', date: formatDate(5) },
		{
			company: 'Salesforce',
			count: 700,
			title: 'Post-acquisition consolidation',
			date: formatDate(8)
		},
		{
			company: 'Intel',
			count: 1500,
			title: 'Manufacturing pivot restructure',
			date: formatDate(12)
		},
		{ company: 'Snap', count: 500, title: 'Cost reduction initiative', date: formatDate(15) }
	];

	// 翻译所有标题
	const translated = await Promise.all(
		layoffs.map(async (l) => {
			try {
				const translatedTitle = await translateText(l.title);
				return { ...l, translatedTitle };
			} catch {
				return l;
			}
		})
	);

	return translated;
}
