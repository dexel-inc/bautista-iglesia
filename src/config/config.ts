const env = import.meta.env;

// Currently not using site title from env, but keeping it for future usages
export const SITE_TITLE = env.VITE_SITE_TITLE || 'Title not set in env file';