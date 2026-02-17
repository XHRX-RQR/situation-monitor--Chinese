/**
 * Service layer exports
 */

// Errors
export { ServiceError, NetworkError, TimeoutError, CircuitOpenError } from './errors';

// Cache Manager
export {
	CacheManager,
	cacheManager,
	type CacheEntry,
	type CacheResult,
	type CacheManagerOptions,
	type CacheStats
} from './cache';

// Circuit Breaker
export {
	CircuitBreaker,
	CircuitBreakerRegistry,
	CircuitBreakerStates,
	circuitBreakerRegistry,
	type CircuitBreakerState,
	type CircuitBreakerOptions,
	type CircuitBreakerStatus
} from './circuit-breaker';

// Request Deduplicator
export { RequestDeduplicator, requestDeduplicator } from './deduplicator';

// Service Registry
export {
	ServiceRegistry,
	SERVICE_CONFIG,
	type ServiceConfig,
	type ServiceId,
	type CacheConfig,
	type CircuitBreakerConfig
} from './registry';

// Service Client
export {
	ServiceClient,
	serviceClient,
	type RequestOptions,
	type RequestResult,
	type ServiceClientOptions,
	type HealthStatus
} from './client';

// Translation Service
export {
	translateText,
	translateBatch,
	clearTranslationCache,
	getTranslationCacheSize,
	preTranslateText
} from './translation';
