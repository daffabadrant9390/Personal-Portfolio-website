/**
 * Projects and experience live in MySQL. Reads are cached so navigating between
 * pages does not wait on the database every time (it can sit behind a tunnel).
 * Edits made in the DB appear within this many seconds, with no deploy.
 */
export const CONTENT_REVALIDATE_SECONDS = 60;

/** Pass to revalidateTag() to refresh the content immediately. */
export const CONTENT_CACHE_TAG = "portfolio-content";
