import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce, throttle } from "./throttle-debounce";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("debounce", () => {
  it("waits for the delay before invoking, using the latest arguments", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced("a");
    debounced("b");
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("b");
  });

  it("restarts the wait on every call", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    vi.advanceTimersByTime(80);
    debounced();
    vi.advanceTimersByTime(80);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(20);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("defaults to a zero wait", () => {
    const fn = vi.fn();
    debounce(fn)();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("can invoke on the leading edge", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100, { leading: true });

    debounced("first");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("first");

    debounced("second");
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith("second");
  });

  it("invokes only once on the leading edge when trailing is disabled", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100, { leading: true, trailing: false });

    debounced("first");
    debounced("second");
    vi.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("first");
  });

  it("forces an invocation once maxWait is reached", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100, { maxWait: 150 });

    debounced("a");
    vi.advanceTimersByTime(80);
    debounced("b");
    vi.advanceTimersByTime(69);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("b");
  });

  it("never waits less than the debounce delay when maxWait is smaller", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100, { maxWait: 10 });

    debounced();
    vi.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("preserves the `this` context of the call", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 50);
    const context = { name: "ctx" };

    debounced.call(context);
    vi.advanceTimersByTime(50);

    expect(fn.mock.contexts[0]).toBe(context);
  });

  it("reports whether a call is pending", () => {
    const debounced = debounce(vi.fn(), 100);
    expect(debounced.pending()).toBe(false);

    debounced();
    expect(debounced.pending()).toBe(true);

    vi.advanceTimersByTime(100);
    expect(debounced.pending()).toBe(false);
  });

  it("cancels a pending invocation", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced("a");
    debounced.cancel();
    vi.advanceTimersByTime(500);

    expect(fn).not.toHaveBeenCalled();
    expect(debounced.pending()).toBe(false);
  });

  it("cancel is safe when nothing is pending", () => {
    const debounced = debounce(vi.fn(), 100);
    expect(() => debounced.cancel()).not.toThrow();
  });

  it("flush invokes a pending call immediately and returns its result", () => {
    const fn = vi.fn((value: string) => value.toUpperCase());
    const debounced = debounce(fn, 100);

    debounced("abc");
    expect(debounced.flush()).toBe("ABC");
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(500);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("flush returns the last result when nothing is pending", () => {
    const fn = vi.fn((value: string) => value.toUpperCase());
    const debounced = debounce(fn, 100);

    expect(debounced.flush()).toBeUndefined();

    debounced("abc");
    vi.advanceTimersByTime(100);
    expect(debounced.flush()).toBe("ABC");
  });

  it("can be used again after being cancelled", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced("a");
    debounced.cancel();
    debounced("b");
    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("b");
  });

  it("copes with the system clock moving backwards", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced("a");
    vi.setSystemTime(Date.now() - 5_000);
    debounced("b");
    vi.advanceTimersByTime(1_000);

    expect(fn).toHaveBeenCalled();
  });
});

describe("throttle", () => {
  it("invokes immediately, then at most once per window with the latest args", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled("a");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith("a");

    throttled("b");
    throttled("c");
    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith("c");
  });

  it("keeps firing on a steady cadence under continuous calls", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    for (let elapsed = 0; elapsed < 500; elapsed += 10) {
      throttled();
      vi.advanceTimersByTime(10);
    }

    expect(fn.mock.calls.length).toBeGreaterThanOrEqual(4);
  });

  it("can skip the leading call", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100, { leading: false });

    throttled("a");
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("can skip the trailing call", () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100, { trailing: false });

    throttled("a");
    throttled("b");
    vi.advanceTimersByTime(200);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("a");
  });

  it("exposes cancel, flush and pending", () => {
    const throttled = throttle(vi.fn(), 100);

    throttled();
    throttled();
    expect(throttled.pending()).toBe(true);

    throttled.cancel();
    expect(throttled.pending()).toBe(false);
  });
});
