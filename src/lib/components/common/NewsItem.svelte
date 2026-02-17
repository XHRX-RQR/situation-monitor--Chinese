<script lang="ts">
	import type { NewsItem } from '$lib/types';
	import { timeAgo } from '$lib/utils';
	import { translationStore } from '$lib/stores/translation';

	interface Props {
		item: NewsItem;
		showSource?: boolean;
		showAlert?: boolean;
		showDescription?: boolean;
		compact?: boolean;
	}

	let {
		item,
		showSource = true,
		showAlert = true,
		showDescription = false,
		compact = false
	}: Props = $props();

	// 自动使用翻译内容（如果有）
	const displayTitle = $derived(item.translatedTitle || item.title);
	const displayDescription = $derived(item.translatedDescription || item.description);
	
	// 是否显示原文
	const hasTranslation = $derived(!!item.translatedTitle);
</script>

<div class="news-item" class:alert={showAlert && item.isAlert} class:compact>
	{#if showSource}
		<div class="item-source">
			{item.source}
			{#if showAlert && item.isAlert}
				<span class="alert-tag">警报</span>
			{/if}
			{#if hasTranslation}
				<span class="translation-badge" title="已自动翻译">🌐</span>
			{/if}
		</div>
	{/if}

	<a class="item-title" href={item.link} target="_blank" rel="noopener noreferrer">
		{displayTitle}
	</a>

	{#if $translationStore.showOriginal && hasTranslation}
		<div class="item-original">
			<span class="original-label">原文:</span>
			{item.title}
		</div>
	{/if}

	{#if showDescription && displayDescription}
		<p class="item-description">{displayDescription}</p>
	{/if}

	<div class="item-meta">
		<span class="item-time">{timeAgo(item.timestamp)}</span>
		{#if item.region}
			<span class="item-region">{item.region}</span>
		{/if}
	</div>
</div>

<style>
	.news-item {
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
	}

	.news-item:last-child {
		border-bottom: none;
	}

	.news-item.compact {
		padding: 0.35rem 0;
	}

	.news-item.alert {
		background: rgba(255, 68, 68, 0.08);
		margin: 0 -0.5rem;
		padding: 0.5rem;
		border-radius: 4px;
		border: 1px solid rgba(255, 68, 68, 0.2);
		border-bottom: 1px solid rgba(255, 68, 68, 0.2);
	}

	.item-source {
		font-size: 0.55rem;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.03em;
		margin-bottom: 0.2rem;
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.alert-tag {
		background: var(--danger);
		color: white;
		font-size: 0.5rem;
		padding: 0.1rem 0.3rem;
		border-radius: 2px;
		font-weight: 600;
	}

	.translation-badge {
		font-size: 0.7rem;
		margin-left: auto;
		opacity: 0.6;
		transition: opacity 0.2s ease;
	}

	.translation-badge:hover {
		opacity: 1;
	}

	.item-original {
		font-size: 0.6rem;
		color: var(--text-muted);
		margin-top: 0.25rem;
		padding: 0.3rem;
		background: rgba(255, 255, 255, 0.02);
		border-radius: 3px;
		border-left: 2px solid var(--border);
	}

	.original-label {
		font-weight: 600;
		margin-right: 0.25rem;
	}

	.item-title {
		display: block;
		font-size: 0.7rem;
		line-height: 1.35;
		color: var(--text-primary);
		text-decoration: none;
	}

	.item-title:hover {
		color: var(--accent);
	}

	.compact .item-title {
		font-size: 0.65rem;
		line-height: 1.3;
	}

	.item-description {
		font-size: 0.6rem;
		color: var(--text-secondary);
		margin: 0.3rem 0 0;
		line-height: 1.4;
	}

	.item-meta {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.25rem;
	}

	.item-time {
		font-size: 0.55rem;
		color: var(--text-muted);
	}

	.item-region {
		font-size: 0.5rem;
		color: var(--accent);
		background: rgba(var(--accent-rgb), 0.1);
		padding: 0.1rem 0.3rem;
		border-radius: 2px;
		text-transform: uppercase;
	}
</style>
