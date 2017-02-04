const callbacks = new Map<Function, number>();

export function debounce(callback: Function, delay: number): Function {
  let timer: number;
  function doDebounce() {
    if (timer != null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = undefined;
      callback();
    }, delay);
  }
  return doDebounce;
}
