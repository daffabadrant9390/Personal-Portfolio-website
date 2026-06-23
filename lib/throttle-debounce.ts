// Self-contained debounce/throttle, no lodash dependency.
// Algorithm mirrors lodash's approach: throttle is just debounce with
// `maxWait` pinned to the wait time, which guarantees periodic execution
// instead of only firing once activity stops.

type AnyFunction = (...args: never[]) => unknown;

export interface ControllableFunction<F extends AnyFunction> {
  (...args: Parameters<F>): void;
  /** Cancels any pending invocation. */
  cancel: () => void;
  /** Immediately invokes a pending call, if any, and returns its result. */
  flush: () => ReturnType<F> | undefined;
  /** True while a call is scheduled but hasn't fired yet. */
  pending: () => boolean;
}

export interface DebounceOptions {
  /** Invoke on the leading edge of the wait window. Default: false. */
  leading?: boolean;
  /** Invoke on the trailing edge of the wait window. Default: true. */
  trailing?: boolean;
  /** Upper bound on how long calls can be delayed before a forced invoke. */
  maxWait?: number;
}

/**
 * Delays invoking `func` until `wait` ms have elapsed since the last call.
 * Useful for things like search-as-you-type inputs, where only the final
 * value (after the user stops typing) matters.
 *
 * @example
 * const onSearch = debounce((query: string) => fetchResults(query), 300);
 * <input onChange={(e) => onSearch(e.target.value)} />
 */
export function debounce<F extends AnyFunction>(
  func: F,
  wait = 0,
  options: DebounceOptions = {}
): ControllableFunction<F> {
  const { leading = false, trailing = true, maxWait } = options;
  const hasMaxWait = maxWait !== undefined;
  const maxWaitMs = hasMaxWait ? Math.max(maxWait, wait) : 0;

  let lastArgs: Parameters<F> | undefined;
  let lastThis: unknown;
  let result: ReturnType<F> | undefined;
  let timerId: ReturnType<typeof setTimeout> | undefined;
  let lastCallTime: number | undefined;
  let lastInvokeTime = 0;

  function invoke(time: number) {
    const args = lastArgs as Parameters<F>;
    const thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args) as ReturnType<F>;
    return result;
  }

  function shouldInvoke(time: number) {
    const sinceLastCall = time - (lastCallTime ?? 0);
    const sinceLastInvoke = time - lastInvokeTime;
    return (
      lastCallTime === undefined ||
      sinceLastCall >= wait ||
      sinceLastCall < 0 ||
      (hasMaxWait && sinceLastInvoke >= maxWaitMs)
    );
  }

  function remainingWait(time: number) {
    const sinceLastCall = time - (lastCallTime ?? 0);
    const sinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - sinceLastCall;
    return hasMaxWait
      ? Math.min(timeWaiting, maxWaitMs - sinceLastInvoke)
      : timeWaiting;
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) return trailingEdge(time);
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time: number) {
    timerId = undefined;
    if (trailing && lastArgs) return invoke(time);
    lastArgs = lastThis = undefined;
    return result;
  }

  function leadingEdge(time: number) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invoke(time) : result;
  }

  function cancel() {
    if (timerId !== undefined) clearTimeout(timerId);
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function pending() {
    return timerId !== undefined;
  }

  function debounced(this: unknown, ...args: Parameters<F>) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    // Captured for the deferred invocation, not a misused `this` reference.
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) return leadingEdge(time);
      if (hasMaxWait) {
        timerId = setTimeout(timerExpired, wait);
        return invoke(time);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;

  return debounced as ControllableFunction<F>;
}

export interface ThrottleOptions {
  /** Invoke on the leading edge of the wait window. Default: true. */
  leading?: boolean;
  /** Invoke on the trailing edge of the wait window. Default: true. */
  trailing?: boolean;
}

/**
 * Invokes `func` at most once per `wait` ms, guaranteeing a steady cadence
 * even under continuous calls. Useful for scroll/resize/mousemove handlers.
 *
 * @example
 * const onScroll = throttle(() => updateScrollProgress(), 100);
 * window.addEventListener("scroll", onScroll);
 */
export function throttle<F extends AnyFunction>(
  func: F,
  wait = 0,
  options: ThrottleOptions = {}
): ControllableFunction<F> {
  const { leading = true, trailing = true } = options;
  return debounce(func, wait, { leading, trailing, maxWait: wait });
}
