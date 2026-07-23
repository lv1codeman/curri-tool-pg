import { P as focusableChildren, p as propsFactory, ac as defer } from './server.mjs';
import { toRef, onScopeDispose, nextTick, toValue } from 'vue';

const makeDelayProps = propsFactory({
  closeDelay: [Number, String],
  openDelay: [Number, String]
}, "delay");
function useDelay(props, cb) {
  let clearDelay = () => {
  };
  function runDelay(isOpening, options) {
    clearDelay?.();
    const delay = isOpening ? props.openDelay : props.closeDelay;
    const normalizedDelay = Math.max(options?.minDelay ?? 0, Number(delay ?? 0));
    return new Promise((resolve) => {
      clearDelay = defer(normalizedDelay, () => {
        cb?.(isOpening);
        resolve(isOpening);
      });
    });
  }
  function runOpenDelay() {
    return runDelay(true);
  }
  function runCloseDelay(options) {
    return runDelay(false, options);
  }
  return {
    clearDelay,
    runOpenDelay,
    runCloseDelay
  };
}
const makeFocusTrapProps = propsFactory({
  retainFocus: Boolean,
  captureFocus: Boolean,
  /** @deprecated */
  disableInitialFocus: Boolean
}, "focusTrap");
const registry = /* @__PURE__ */ new Map();
let subscribers = 0;
function onKeydown(e) {
  const activeElement = (void 0).activeElement;
  if (e.key !== "Tab" || !activeElement) return;
  const parentTraps = Array.from(registry.values()).filter((_ref) => {
    let {
      isActive,
      contentEl
    } = _ref;
    return isActive.value && contentEl.value?.contains(activeElement);
  }).map((x) => x.contentEl.value);
  let closestTrap;
  let currentParent = activeElement.parentElement;
  while (currentParent) {
    if (parentTraps.includes(currentParent)) {
      closestTrap = currentParent;
      break;
    }
    currentParent = currentParent.parentElement;
  }
  if (!closestTrap) return;
  const focusable = focusableChildren(closestTrap).filter((x) => x.tabIndex >= 0);
  if (!focusable.length) return;
  const active = (void 0).activeElement;
  if (focusable.length === 1 && focusable[0].classList.contains("v-list") && focusable[0].contains(active)) {
    e.preventDefault();
    return;
  }
  const firstElement = focusable[0];
  const lastElement = focusable[focusable.length - 1];
  if (e.shiftKey && (active === firstElement || firstElement.classList.contains("v-list") && firstElement.contains(active))) {
    e.preventDefault();
    lastElement.focus();
  }
  if (!e.shiftKey && (active === lastElement || lastElement.classList.contains("v-list") && lastElement.contains(active))) {
    e.preventDefault();
    firstElement.focus();
  }
}
function useFocusTrap(props, _ref2) {
  let {
    isActive,
    localTop,
    activatorEl,
    contentEl
  } = _ref2;
  const trapId = /* @__PURE__ */ Symbol("trap");
  let focusTrapSuppressed = false;
  let focusTrapSuppressionTimeout = -1;
  async function onPointerdown() {
    focusTrapSuppressed = true;
    focusTrapSuppressionTimeout = (void 0).setTimeout(() => {
      focusTrapSuppressed = false;
    }, 100);
  }
  async function captureOnFocus(e) {
    const before = e.relatedTarget;
    const after = e.target;
    (void 0).removeEventListener("pointerdown", onPointerdown);
    (void 0).removeEventListener("keydown", captureOnKeydown);
    await nextTick();
    if (isActive.value && !focusTrapSuppressed && before !== after && contentEl.value && // We're the menu without open submenus or overlays
    toValue(localTop) && // It isn't the document or the container body
    ![void 0, contentEl.value].includes(after) && // It isn't inside the container body
    !contentEl.value.contains(after)) {
      const focusable = focusableChildren(contentEl.value);
      focusable[0]?.focus();
    }
  }
  function captureOnKeydown(e) {
    if (e.key !== "Tab") return;
    (void 0).removeEventListener("keydown", captureOnKeydown);
    if (isActive.value && contentEl.value && e.target && !contentEl.value.contains(e.target)) {
      const allFocusableElements = focusableChildren((void 0).documentElement);
      if (e.shiftKey && e.target === allFocusableElements.at(0) || !e.shiftKey && e.target === allFocusableElements.at(-1)) {
        const focusable = focusableChildren(contentEl.value);
        if (focusable.length > 0) {
          e.preventDefault();
          focusable[0].focus();
        }
      }
    }
  }
  toRef(() => isActive.value && props.captureFocus && !props.disableInitialFocus);
  onScopeDispose(() => {
    registry.delete(trapId);
    clearTimeout(focusTrapSuppressionTimeout);
    (void 0).removeEventListener("pointerdown", onPointerdown);
    (void 0).removeEventListener("focusin", captureOnFocus);
    (void 0).removeEventListener("keydown", captureOnKeydown);
    if (--subscribers < 1) {
      (void 0).removeEventListener("keydown", onKeydown);
    }
  });
}

export { useDelay as a, makeDelayProps as b, makeFocusTrapProps as m, useFocusTrap as u };
//# sourceMappingURL=focusTrap-hyPXUrgo.mjs.map
