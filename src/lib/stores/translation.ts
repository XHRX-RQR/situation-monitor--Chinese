/**
 * Translation Store - 管理翻译偏好和状态
 */

import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'translation-settings';

export interface TranslationSettings {
	enabled: boolean; // 是否启用自动翻译
	autoTranslate: boolean; // 是否自动翻译新加载的新闻
	showOriginal: boolean; // 是否同时显示原文
}

// 默认设置
const defaultSettings: TranslationSettings = {
	enabled: true,
	autoTranslate: false, // 默认关闭自动翻译，由用户手动触发
	showOriginal: false
};

// 从 localStorage 加载设置
function loadSettings(): TranslationSettings {
	if (!browser) return defaultSettings;

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			return { ...defaultSettings, ...JSON.parse(stored) };
		}
	} catch (error) {
		console.error('Failed to load translation settings:', error);
	}

	return defaultSettings;
}

// 保存设置到 localStorage
function saveSettings(settings: TranslationSettings) {
	if (!browser) return;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
	} catch (error) {
		console.error('Failed to save translation settings:', error);
	}
}

// 创建存储
function createTranslationStore() {
	const { subscribe, set, update } = writable<TranslationSettings>(loadSettings());

	return {
		subscribe,

		/**
		 * 切换翻译功能
		 */
		toggle() {
			update((settings) => {
				const newSettings = { ...settings, enabled: !settings.enabled };
				saveSettings(newSettings);
				return newSettings;
			});
		},

		/**
		 * 切换自动翻译
		 */
		toggleAutoTranslate() {
			update((settings) => {
				const newSettings = { ...settings, autoTranslate: !settings.autoTranslate };
				saveSettings(newSettings);
				return newSettings;
			});
		},

		/**
		 * 切换显示原文
		 */
		toggleShowOriginal() {
			update((settings) => {
				const newSettings = { ...settings, showOriginal: !settings.showOriginal };
				saveSettings(newSettings);
				return newSettings;
			});
		},

		/**
		 * 更新设置
		 */
		updateSettings(partial: Partial<TranslationSettings>) {
			update((settings) => {
				const newSettings = { ...settings, ...partial };
				saveSettings(newSettings);
				return newSettings;
			});
		},

		/**
		 * 重置为默认设置
		 */
		reset() {
			saveSettings(defaultSettings);
			set(defaultSettings);
		},

		/**
		 * 获取当前设置
		 */
		getSettings(): TranslationSettings {
			return get({ subscribe });
		}
	};
}

// 导出单例
export const translationStore = createTranslationStore();
