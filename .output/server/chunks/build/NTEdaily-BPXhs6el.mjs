import { computed, ref, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, TransitionGroup, toRef, createElementVNode, normalizeStyle, normalizeClass, withDirectives, vShow, shallowRef, watch, nextTick, provide, inject, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, x as useDisplay, g as genericComponent, c as useProxiedModel, r as provideDefaults, q as convertToUnit, b as useLocale, e as useTheme, i as pickWithRest, j as provideTheme, l as useRtl, t as isObject, p as propsFactory, v as pick, o as omit, I as IconValue, m as makeThemeProps, k as keys, s as standardEasing } from './server.mjs';
import { V as VCard, M as MaybeTransition, m as makeTransitionProps } from './VCard-BqUhiF6T.mjs';
import { a as VProgressLinear, V as VIcon, u as useDensity, b as useBackgroundColor, c as useTextColor, d as useRounded, e as useLocation, m as makeDensityProps, f as makeRoundedProps, g as makeLocationProps } from './index-DVrSdyte.mjs';
import { V as VRow, a as VCol } from './VRow-BBOgihbN.mjs';
import { V as VBtn, u as useGroup, b as useGroupItem, m as makeVBtnProps, c as makeGroupItemProps } from './VBtn-CygXX-_7.mjs';
import { f as forwardRefs, a as animate } from './forwardRefs-CJyhXHYH.mjs';
import { u as useRender, a as useDimension, m as makeTagProps, b as makeDimensionProps, c as makeComponentProps } from './dimensions-B7KURZuc.mjs';
import { u as useLazy, m as makeLazyProps } from './lazy-DuD9WWOI.mjs';
import { u as useSsrBoot } from './ssrBoot-ZQn7gOuX.mjs';
import { V as VSlideGroup, m as makeVSlideGroupProps } from './VSlideGroup-BHQ8mgNE.mjs';
import { u as useScopeId } from './scopeId-BdYz0dQ0.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import 'axios';
import './index-Cr-Vuh5O.mjs';

const makeVBadgeProps = propsFactory({
  bordered: Boolean,
  color: String,
  content: [Number, String],
  dot: Boolean,
  floating: Boolean,
  icon: IconValue,
  inline: Boolean,
  label: {
    type: String,
    default: "$vuetify.badge"
  },
  max: [Number, String],
  modelValue: {
    type: Boolean,
    default: true
  },
  offsetX: [Number, String],
  offsetY: [Number, String],
  textColor: String,
  ...makeComponentProps(),
  ...makeLocationProps({
    location: "top end"
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeTransitionProps({
    transition: "scale-rotate-transition"
  }),
  ...makeDimensionProps()
}, "VBadge");
const VBadge = genericComponent()({
  name: "VBadge",
  inheritAttrs: false,
  props: makeVBadgeProps(),
  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      t
    } = useLocale();
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => props.textColor);
    const {
      themeClasses
    } = useTheme();
    const {
      locationStyles
    } = useLocation(props, true, (side) => {
      const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
      return base + (["top", "bottom"].includes(side) ? Number(props.offsetY ?? 0) : ["left", "right"].includes(side) ? Number(props.offsetX ?? 0) : 0);
    });
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => {
      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= Number(props.max) ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pickWithRest(ctx.attrs, ["aria-atomic", "aria-label", "aria-live", "role", "title"]);
      return createVNode(props.tag, mergeProps({
        "class": ["v-badge", {
          "v-badge--bordered": props.bordered,
          "v-badge--dot": props.dot,
          "v-badge--floating": props.floating,
          "v-badge--inline": props.inline
        }, props.class]
      }, attrs, {
        "style": props.style
      }), {
        default: () => [createElementVNode("div", {
          "class": "v-badge__wrapper"
        }, [ctx.slots.default?.(), createVNode(MaybeTransition, {
          "transition": props.transition
        }, {
          default: () => [withDirectives(createElementVNode("span", mergeProps({
            "class": ["v-badge__badge", themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
            "style": [backgroundColorStyles.value, textColorStyles.value, dimensionStyles.value, props.inline ? {} : locationStyles.value],
            "aria-atomic": "true",
            "aria-label": t(props.label, value),
            "aria-live": "polite",
            "role": "status"
          }, badgeAttrs), [props.dot ? void 0 : ctx.slots.badge ? ctx.slots.badge?.() : props.icon ? createVNode(VIcon, {
            "icon": props.icon
          }, null) : content]), [[vShow, props.modelValue]])]
        })])]
      });
    });
    return {};
  }
});
const VTabsSymbol = /* @__PURE__ */ Symbol.for("vuetify:v-tabs");
const makeVTabProps = propsFactory({
  fixed: Boolean,
  sliderColor: String,
  sliderTransition: String,
  sliderTransitionDuration: [String, Number],
  hideSlider: Boolean,
  inset: Boolean,
  direction: {
    type: String,
    default: "horizontal"
  },
  ...omit(makeVBtnProps({
    selectedClass: "v-tab--selected",
    variant: "text"
  }), ["active", "block", "flat", "location", "position", "symbol"])
}, "VTab");
const VTab = genericComponent()({
  name: "VTab",
  props: makeVTabProps(),
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      textColorClasses: sliderColorClasses,
      textColorStyles: sliderColorStyles
    } = useTextColor(() => props.sliderColor);
    const {
      backgroundColorClasses: insetColorClasses,
      backgroundColorStyles: insetColorStyles
    } = useBackgroundColor(() => props.sliderColor);
    const rootEl = ref();
    const sliderEl = ref();
    const isHorizontal = computed(() => props.direction === "horizontal");
    const isSelected = computed(() => rootEl.value?.group?.isSelected.value ?? false);
    function fade(nextEl, prevEl) {
      return {
        opacity: [0, 1]
      };
    }
    function grow(nextEl, prevEl) {
      return props.direction === "vertical" ? {
        transform: ["scaleY(0)", "scaleY(1)"]
      } : {
        transform: ["scaleX(0)", "scaleX(1)"]
      };
    }
    function shift(nextEl, prevEl) {
      const prevBox = prevEl.getBoundingClientRect();
      const nextBox = nextEl.getBoundingClientRect();
      const xy = isHorizontal.value ? "x" : "y";
      const XY = isHorizontal.value ? "X" : "Y";
      const rightBottom = isHorizontal.value ? "right" : "bottom";
      const widthHeight = isHorizontal.value ? "width" : "height";
      const prevPos = prevBox[xy];
      const nextPos = nextBox[xy];
      const delta = prevPos > nextPos ? prevBox[rightBottom] - nextBox[rightBottom] : prevBox[xy] - nextBox[xy];
      const origin = Math.sign(delta) > 0 ? isHorizontal.value ? "right" : "bottom" : Math.sign(delta) < 0 ? isHorizontal.value ? "left" : "top" : "center";
      const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prevBox[widthHeight] : nextBox[widthHeight]);
      const scale = size / Math.max(prevBox[widthHeight], nextBox[widthHeight]) || 0;
      const initialScale = prevBox[widthHeight] / nextBox[widthHeight] || 0;
      const sigma = 1.5;
      return {
        transform: [`translate${XY}(${delta}px) scale${XY}(${initialScale})`, `translate${XY}(${delta / sigma}px) scale${XY}(${(scale - 1) / sigma + 1})`, "none"],
        transformOrigin: Array(3).fill(origin)
      };
    }
    function updateSlider(_ref2) {
      let {
        value
      } = _ref2;
      if (value) {
        const prevEl = rootEl.value?.$el.parentElement?.querySelector(".v-tab--selected .v-tab__slider");
        const nextEl = sliderEl.value;
        if (!prevEl || !nextEl) return;
        const color = getComputedStyle(prevEl).backgroundColor;
        const keyframes = {
          fade,
          grow,
          shift
        }[props.sliderTransition ?? "shift"] ?? shift;
        const duration = Number(props.sliderTransitionDuration) || ({
          fade: 400,
          grow: 350,
          shift: 225
        }[props.sliderTransition ?? "shift"] ?? 225);
        animate(nextEl, {
          backgroundColor: [color, color],
          ...keyframes(nextEl, prevEl)
        }, {
          duration,
          easing: standardEasing
        });
      }
    }
    useRender(() => {
      const btnProps = VBtn.filterProps(props);
      return createVNode(VBtn, mergeProps({
        "symbol": VTabsSymbol,
        "ref": rootEl,
        "class": ["v-tab", props.class, isSelected.value && props.inset ? insetColorClasses.value : []],
        "style": [props.style, isSelected.value && props.inset ? insetColorStyles.value : [], {
          backgroundColor: isSelected.value && props.inset ? "transparent !important" : void 0
        }],
        "tabindex": isSelected.value ? 0 : -1,
        "role": "tab",
        "aria-selected": String(isSelected.value),
        "active": false
      }, btnProps, attrs, {
        "block": props.fixed,
        "maxWidth": props.fixed ? 300 : void 0,
        "onGroup:selected": updateSlider
      }), {
        ...slots,
        default: () => createElementVNode(Fragment, null, [slots.default?.() ?? props.text, !props.hideSlider && createElementVNode("div", {
          "ref": sliderEl,
          "class": normalizeClass(["v-tab__slider", props.inset ? insetColorClasses.value : sliderColorClasses.value]),
          "style": normalizeStyle([sliderColorStyles.value, props.inset ? insetColorStyles.value : sliderColorClasses.value])
        }, null)])
      });
    });
    return forwardRefs({}, rootEl);
  }
});
const handleGesture = (wrapper) => {
  const {
    touchstartX,
    touchendX,
    touchstartY,
    touchendY
  } = wrapper;
  const dirRatio = 0.5;
  const minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;
  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }
  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};
function touchstart(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;
  wrapper.start?.({
    originalEvent: event,
    ...wrapper
  });
}
function touchend(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;
  wrapper.end?.({
    originalEvent: event,
    ...wrapper
  });
  handleGesture(wrapper);
}
function touchmove(event, wrapper) {
  const touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;
  wrapper.move?.({
    originalEvent: event,
    ...wrapper
  });
}
function createHandlers() {
  let value = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  const wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };
  return {
    touchstart: (e) => touchstart(e, wrapper),
    touchend: (e) => touchend(e, wrapper),
    touchmove: (e) => touchmove(e, wrapper)
  };
}
function mounted(el, binding) {
  const value = binding.value;
  const target = value?.parent ? el.parentElement : el;
  const options = value?.options ?? {
    passive: true
  };
  const uid = binding.instance?.$.uid;
  if (!target || uid === void 0) return;
  const handlers = createHandlers(binding.value);
  target._touchHandlers = target._touchHandlers ?? /* @__PURE__ */ Object.create(null);
  target._touchHandlers[uid] = handlers;
  keys(handlers).forEach((eventName) => {
    target.addEventListener(eventName, handlers[eventName], options);
  });
}
function unmounted(el, binding) {
  const target = binding.value?.parent ? el.parentElement : el;
  const uid = binding.instance?.$.uid;
  if (!target?._touchHandlers || uid === void 0) return;
  const handlers = target._touchHandlers[uid];
  keys(handlers).forEach((eventName) => {
    target.removeEventListener(eventName, handlers[eventName]);
  });
  delete target._touchHandlers[uid];
}
const Touch = {
  mounted,
  unmounted
};
const VWindowSymbol = /* @__PURE__ */ Symbol.for("vuetify:v-window");
const VWindowGroupSymbol = /* @__PURE__ */ Symbol.for("vuetify:v-window-group");
const makeVWindowProps = propsFactory({
  continuous: Boolean,
  nextIcon: {
    type: [Boolean, String, Function, Object],
    default: "$next"
  },
  prevIcon: {
    type: [Boolean, String, Function, Object],
    default: "$prev"
  },
  reverse: Boolean,
  showArrows: {
    type: [Boolean, String],
    validator: (v) => typeof v === "boolean" || v === "hover"
  },
  verticalArrows: [Boolean, String],
  touch: {
    type: [Object, Boolean],
    default: void 0
  },
  direction: {
    type: String,
    default: "horizontal"
  },
  modelValue: null,
  disabled: Boolean,
  selectedClass: {
    type: String,
    default: "v-window-item--active"
  },
  // TODO: mandatory should probably not be exposed but do this for now
  mandatory: {
    type: [Boolean, String],
    default: "force"
  },
  crossfade: Boolean,
  transitionDuration: Number,
  ...makeComponentProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VWindow");
const VWindow = genericComponent()({
  name: "VWindow",
  directives: {
    vTouch: Touch
  },
  props: makeVWindowProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      isRtl
    } = useRtl();
    const {
      t
    } = useLocale();
    const group = useGroup(props, VWindowGroupSymbol);
    const rootRef = ref();
    const isRtlReverse = computed(() => isRtl.value ? !props.reverse : props.reverse);
    const isReversed = shallowRef(false);
    const transition = computed(() => {
      if (props.crossfade) {
        return "v-window-crossfade-transition";
      }
      const axis = props.direction === "vertical" ? "y" : "x";
      const reverse = isRtlReverse.value ? !isReversed.value : isReversed.value;
      const direction = reverse ? "-reverse" : "";
      return `v-window-${axis}${direction}-transition`;
    });
    const transitionCount = shallowRef(0);
    const transitionHeight = ref(void 0);
    const activeIndex = computed(() => {
      return group.items.value.findIndex((item) => group.selected.value.includes(item.id));
    });
    watch(activeIndex, (newVal, oldVal) => {
      const itemsLength = group.items.value.length;
      const lastIndex = itemsLength - 1;
      if (itemsLength <= 2) {
        isReversed.value = newVal < oldVal;
      } else if (newVal === lastIndex && oldVal === 0) {
        isReversed.value = false;
      } else if (newVal === 0 && oldVal === lastIndex) {
        isReversed.value = true;
      } else {
        isReversed.value = newVal < oldVal;
      }
      nextTick(() => {
        return;
      });
    }, {
      flush: "sync"
    });
    provide(VWindowSymbol, {
      transition,
      isReversed,
      transitionCount,
      transitionHeight,
      rootRef
    });
    const canMoveBack = toRef(() => props.continuous || activeIndex.value !== 0);
    const canMoveForward = toRef(() => props.continuous || activeIndex.value !== group.items.value.length - 1);
    function prev() {
      canMoveBack.value && group.prev();
    }
    function next() {
      canMoveForward.value && group.next();
    }
    const arrows = computed(() => {
      const arrows2 = [];
      const prevProps = {
        icon: isRtl.value ? props.nextIcon : props.prevIcon,
        class: `v-window__${isRtlReverse.value ? "right" : "left"}`,
        onClick: group.prev,
        "aria-label": t("$vuetify.carousel.prev")
      };
      arrows2.push(canMoveBack.value ? slots.prev ? slots.prev({
        props: prevProps
      }) : createVNode(VBtn, prevProps, null) : createElementVNode("div", null, null));
      const nextProps = {
        icon: isRtl.value ? props.prevIcon : props.nextIcon,
        class: `v-window__${isRtlReverse.value ? "left" : "right"}`,
        onClick: group.next,
        "aria-label": t("$vuetify.carousel.next")
      };
      arrows2.push(canMoveForward.value ? slots.next ? slots.next({
        props: nextProps
      }) : createVNode(VBtn, nextProps, null) : createElementVNode("div", null, null));
      return arrows2;
    });
    const touchOptions = computed(() => {
      if (props.touch === false) return props.touch;
      const options = {
        left: () => {
          isRtlReverse.value ? prev() : next();
        },
        right: () => {
          isRtlReverse.value ? next() : prev();
        },
        start: (_ref2) => {
          let {
            originalEvent
          } = _ref2;
          originalEvent.stopPropagation();
        }
      };
      return {
        ...options,
        ...props.touch === true ? {} : props.touch
      };
    });
    function onKeyDown(e) {
      if (props.direction === "horizontal" && e.key === "ArrowLeft" || props.direction === "vertical" && e.key === "ArrowUp") {
        e.preventDefault();
        prev();
        nextTick(() => {
          canMoveBack.value ? focusArrow(0) : focusArrow(1);
        });
      }
      if (props.direction === "horizontal" && e.key === "ArrowRight" || props.direction === "vertical" && e.key === "ArrowDown") {
        e.preventDefault();
        next();
        nextTick(() => {
          canMoveForward.value ? focusArrow(1) : focusArrow(0);
        });
      }
    }
    function focusArrow(index) {
      const arrow = arrows.value[index];
      if (!arrow) return;
      const arrowEl = Array.isArray(arrow) ? arrow[0] : arrow;
      arrowEl.el?.focus();
    }
    useRender(() => withDirectives(createVNode(props.tag, {
      "ref": rootRef,
      "class": normalizeClass(["v-window", {
        "v-window--show-arrows-on-hover": props.showArrows === "hover",
        "v-window--vertical-arrows": !!props.verticalArrows,
        "v-window--crossfade": !!props.crossfade
      }, themeClasses.value, props.class]),
      "style": normalizeStyle([props.style, {
        "--v-window-transition-duration": convertToUnit(props.transitionDuration, "ms")
      }])
    }, {
      default: () => [createElementVNode("div", {
        "class": "v-window__container",
        "style": {
          height: transitionHeight.value
        }
      }, [slots.default?.({
        group
      }), props.showArrows !== false && createElementVNode("div", {
        "class": normalizeClass(["v-window__controls", {
          "v-window__controls--left": props.verticalArrows === "left" || props.verticalArrows === true
        }, {
          "v-window__controls--right": props.verticalArrows === "right"
        }]),
        "onKeydown": onKeyDown
      }, [arrows.value])]), slots.additional?.({
        group
      })]
    }), [[Touch, touchOptions.value]]));
    return {
      group
    };
  }
});
const makeVTabsWindowProps = propsFactory({
  ...omit(makeVWindowProps(), ["continuous", "nextIcon", "prevIcon", "showArrows", "touch", "mandatory"])
}, "VTabsWindow");
const VTabsWindow = genericComponent()({
  name: "VTabsWindow",
  props: makeVTabsWindowProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const group = inject(VTabsSymbol, null);
    const _model = useProxiedModel(props, "modelValue");
    const model = computed({
      get() {
        if (_model.value != null || !group) return _model.value;
        return group.items.value.find((item) => group.selected.value.includes(item.id))?.value;
      },
      set(val) {
        _model.value = val;
      }
    });
    useRender(() => {
      const windowProps = VWindow.filterProps(props);
      return createVNode(VWindow, mergeProps({
        "_as": "VTabsWindow"
      }, windowProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs-window", props.class],
        "style": props.style,
        "mandatory": false,
        "touch": false
      }), slots);
    });
    return {};
  }
});
const makeVWindowItemProps = propsFactory({
  reverseTransition: {
    type: [Boolean, String],
    default: void 0
  },
  transition: {
    type: [Boolean, String],
    default: void 0
  },
  ...makeComponentProps(),
  ...makeGroupItemProps(),
  ...makeLazyProps()
}, "VWindowItem");
const VWindowItem = genericComponent()({
  name: "VWindowItem",
  directives: {
    vTouch: Touch
  },
  props: makeVWindowItemProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const window = inject(VWindowSymbol);
    const groupItem = useGroupItem(props, VWindowGroupSymbol);
    const {
      isBooted
    } = useSsrBoot();
    if (!window || !groupItem) throw new Error("[Vuetify] VWindowItem must be used inside VWindow");
    const isTransitioning = shallowRef(false);
    const hasTransition = computed(() => isBooted.value && (window.isReversed.value ? props.reverseTransition !== false : props.transition !== false));
    function onAfterTransition() {
      if (!isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = false;
      if (window.transitionCount.value > 0) {
        window.transitionCount.value -= 1;
        if (window.transitionCount.value === 0) {
          window.transitionHeight.value = void 0;
        }
      }
    }
    function onBeforeTransition() {
      if (isTransitioning.value || !window) {
        return;
      }
      isTransitioning.value = true;
      if (window.transitionCount.value === 0) {
        window.transitionHeight.value = convertToUnit(window.rootRef.value?.clientHeight);
      }
      window.transitionCount.value += 1;
    }
    function onTransitionCancelled() {
      onAfterTransition();
    }
    function onEnterTransition(el) {
      if (!isTransitioning.value) {
        return;
      }
      nextTick(() => {
        if (!hasTransition.value || !isTransitioning.value || !window) {
          return;
        }
        window.transitionHeight.value = convertToUnit(el.clientHeight);
      });
    }
    const transition = computed(() => {
      const name = window.isReversed.value ? props.reverseTransition : props.transition;
      return !hasTransition.value ? false : {
        name: typeof name !== "string" ? window.transition.value : name,
        onBeforeEnter: onBeforeTransition,
        onAfterEnter: onAfterTransition,
        onEnterCancelled: onTransitionCancelled,
        onBeforeLeave: onBeforeTransition,
        onAfterLeave: onAfterTransition,
        onLeaveCancelled: onTransitionCancelled,
        onEnter: onEnterTransition
      };
    });
    const {
      hasContent
    } = useLazy(props, groupItem.isSelected);
    useRender(() => createVNode(MaybeTransition, {
      "transition": transition.value,
      "disabled": !isBooted.value
    }, {
      default: () => [withDirectives(createElementVNode("div", {
        "class": normalizeClass(["v-window-item", groupItem.selectedClass.value, props.class]),
        "style": normalizeStyle(props.style)
      }, [hasContent.value && slots.default?.()]), [[vShow, groupItem.isSelected.value]])]
    }));
    return {
      groupItem
    };
  }
});
const makeVTabsWindowItemProps = propsFactory({
  ...makeVWindowItemProps()
}, "VTabsWindowItem");
const VTabsWindowItem = genericComponent()({
  name: "VTabsWindowItem",
  props: makeVTabsWindowItemProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const windowItemProps = VWindowItem.filterProps(props);
      return createVNode(VWindowItem, mergeProps({
        "_as": "VTabsWindowItem"
      }, windowItemProps, {
        "class": ["v-tabs-window-item", props.class],
        "style": props.style
      }), slots);
    });
    return {};
  }
});
function parseItems(items) {
  if (!items) return [];
  return items.map((item) => {
    if (!isObject(item)) return {
      text: item,
      value: item
    };
    return item;
  });
}
const makeVTabsProps = propsFactory({
  alignTabs: {
    type: String,
    default: "start"
  },
  color: String,
  fixedTabs: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  stacked: Boolean,
  bgColor: String,
  grow: Boolean,
  height: {
    type: [Number, String],
    default: void 0
  },
  hideSlider: Boolean,
  inset: Boolean,
  insetPadding: [String, Number],
  insetRadius: [String, Number],
  sliderColor: String,
  ...pick(makeVTabProps(), ["spaced", "sliderTransition", "sliderTransitionDuration"]),
  ...makeVSlideGroupProps({
    mandatory: "force",
    selectedClass: "v-tab-item--selected"
  }),
  ...makeDensityProps(),
  ...makeTagProps()
}, "VTabs");
const VTabs = genericComponent()({
  name: "VTabs",
  props: makeVTabsProps(),
  emits: {
    "update:modelValue": (v) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const items = computed(() => parseItems(props.items));
    const {
      densityClasses
    } = useDensity(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      scopeId
    } = useScopeId();
    provideDefaults({
      VTab: {
        color: toRef(props, "color"),
        direction: toRef(props, "direction"),
        stacked: toRef(props, "stacked"),
        fixed: toRef(props, "fixedTabs"),
        inset: toRef(props, "inset"),
        sliderColor: toRef(props, "sliderColor"),
        sliderTransition: toRef(props, "sliderTransition"),
        sliderTransitionDuration: toRef(props, "sliderTransitionDuration"),
        hideSlider: toRef(props, "hideSlider")
      }
    });
    useRender(() => {
      const slideGroupProps = VSlideGroup.filterProps(props);
      const hasWindow = !!(slots.window || props.items.length > 0);
      return createElementVNode(Fragment, null, [createVNode(VSlideGroup, mergeProps(slideGroupProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-tabs", `v-tabs--${props.direction}`, `v-tabs--align-tabs-${props.alignTabs}`, {
          "v-tabs--fixed-tabs": props.fixedTabs,
          "v-tabs--grow": props.grow,
          "v-tabs--inset": props.inset,
          "v-tabs--stacked": props.stacked
        }, densityClasses.value, backgroundColorClasses.value, props.class],
        "style": [{
          "--v-tabs-height": convertToUnit(props.height),
          "--v-tabs-inset-padding": props.inset ? convertToUnit(props.insetPadding) : void 0,
          "--v-tabs-inset-radius": props.inset ? convertToUnit(props.insetRadius) : void 0
        }, backgroundColorStyles.value, props.style],
        "role": "tablist",
        "symbol": VTabsSymbol
      }, scopeId, attrs), {
        default: slots.default ?? (() => items.value.map((item) => slots.tab?.({
          item
        }) ?? createVNode(VTab, mergeProps(item, {
          "key": item.text,
          "value": item.value,
          "spaced": props.spaced
        }), {
          default: slots[`tab.${item.value}`] ? () => slots[`tab.${item.value}`]?.({
            item
          }) : void 0
        }))),
        prev: slots.prev,
        next: slots.next
      }), hasWindow && createVNode(VTabsWindow, mergeProps({
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "key": "tabs-window"
      }, scopeId), {
        default: () => [items.value.map((item) => slots.item?.({
          item
        }) ?? createVNode(VTabsWindowItem, {
          "value": item.value
        }, {
          default: () => slots[`item.${item.value}`]?.({
            item
          })
        })), slots.window?.()]
      })]);
    });
    return {};
  }
});
const _sfc_main = {
  __name: "NTEdaily",
  __ssrInlineRender: true,
  setup(__props) {
    const { mobile } = useDisplay();
    const isMobile = computed(() => mobile.value);
    const categories = ["地圖資源", "好感度", "都市大亨", "自宅", "體力副本"];
    const tab = ref("地圖資源");
    const tasks = ref([
      {
        type: "地圖資源",
        freq: "日",
        name: "魔女之家",
        desc: "諭石位置、逸聞位置、傷害buff"
      },
      {
        type: "地圖資源",
        freq: "日",
        name: "搶路人(4公事包)",
        desc: "機率出車鑰匙、錢包=1000方斯or脆薯餅一個(500甲蟲幣)"
      },
      {
        type: "地圖資源",
        freq: "日",
        name: "許願池(S武器)",
        desc: "驅動塊代幣、S級武器"
      },
      {
        type: "地圖資源",
        freq: "日",
        name: "小吱",
        desc: "40000方斯，重擊怪物，甲蟲副本選第一關慢慢丟"
      },
      {
        type: "地圖資源",
        freq: "日",
        name: "小混混",
        desc: "善良脆薯餅(警局換甲蟲幣1:500)，警局用地圖右上傳點最近"
      },
      { type: "地圖資源", freq: "週", name: "拍賣會", desc: "瑪門升級材料" },
      { type: "地圖資源", freq: "週", name: "保險箱", desc: "13750方斯" },
      {
        type: "好感度",
        freq: "日",
        name: "送禮",
        desc: "角色好感度(潯、小吱、娜娜莉、九原)"
      },
      {
        type: "好感度",
        freq: "日",
        name: "看電影",
        desc: "傳斑蝶、買票、電影可ALT+左上跳過"
      },
      { type: "都市大亨", freq: "雙週", name: "粉爪大劫案", desc: "方斯、粉爪幣" },
      { type: "都市大亨", freq: "日", name: "一咖舍領收益", desc: "方斯" },
      { type: "都市大亨", freq: "日", name: "同城派送", desc: "方斯" },
      { type: "自宅", freq: "日", name: "木箱領甲蟲幣", desc: "甲蟲幣" },
      { type: "自宅", freq: "日", name: "哈索爾領驅動塊", desc: "需要140W房子" },
      { type: "自宅", freq: "日", name: "領雲朵(好感度)", desc: "雲朵" },
      { type: "自宅", freq: "週", name: "貓咪瑪門", desc: "方斯" },
      { type: "體力副本", freq: "週", name: "週本", desc: "F1第3頁第5項" },
      { type: "體力副本", freq: "日", name: "各式材料", desc: "F1第三頁" }
    ]);
    tasks.value.forEach((t) => {
      t.done = false;
      t.date = null;
    });
    const filteredTasks = (type) => {
      return tasks.value.filter((t) => t.type === type).sort((a, b) => a.done - b.done);
    };
    const progress = computed(() => {
      const done = tasks.value.filter((t) => t.done).length;
      return Math.round(done / tasks.value.length * 100);
    });
    const toggleDone = (item) => {
      item.done = !item.done;
      item.date = item.done ? (/* @__PURE__ */ new Date()).toISOString() : null;
    };
    const completeAll = () => {
      tasks.value.forEach((t) => {
        if (t.type === tab.value) {
          t.done = true;
          t.date = (/* @__PURE__ */ new Date()).toISOString();
        }
      });
    };
    const resetAll = () => {
      tasks.value.forEach((t) => {
        if (t.type === tab.value) {
          t.done = false;
          t.date = null;
        }
      });
    };
    const getUnfinishedCount = (type) => {
      return tasks.value.filter((t) => t.type === type && !t.done).length;
    };
    const getColor = (type) => ({
      地圖資源: "bg-map",
      好感度: "bg-love",
      都市大亨: "bg-city",
      自宅: "bg-home",
      體力副本: "bg-dungeon"
    })[type];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page" }, _attrs))} data-v-8fbb8775><div class="container" data-v-8fbb8775><div class="text-h6 text-center" data-v-8fbb8775>異環每日/每週</div>`);
      _push(ssrRenderComponent(VCard, { class: "mb-3 pa-3 rounded-xl py-5" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="d-flex justify-space-between" data-v-8fbb8775${_scopeId}><span style="${ssrRenderStyle({ "font-size": "18px" })}" data-v-8fbb8775${_scopeId}>今日完成度</span><span data-v-8fbb8775${_scopeId}>${ssrInterpolate(progress.value)}%</span></div>`);
            _push2(ssrRenderComponent(VProgressLinear, {
              "model-value": progress.value,
              height: "15",
              color: "deep-purple"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "d-flex justify-space-between" }, [
                createVNode("span", { style: { "font-size": "18px" } }, "今日完成度"),
                createVNode("span", null, toDisplayString(progress.value) + "%", 1)
              ]),
              createVNode(VProgressLinear, {
                "model-value": progress.value,
                height: "15",
                color: "deep-purple"
              }, null, 8, ["model-value"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VRow, { class: "mb-3" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    block: "",
                    color: "success",
                    onClick: completeAll
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 全部完成 `);
                      } else {
                        return [
                          createTextVNode(" 全部完成 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      block: "",
                      color: "success",
                      onClick: completeAll
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 全部完成 ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    block: "",
                    color: "grey",
                    onClick: resetAll
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` 全部未完成 `);
                      } else {
                        return [
                          createTextVNode(" 全部未完成 ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      block: "",
                      color: "grey",
                      onClick: resetAll
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" 全部未完成 ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, { cols: "6" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    block: "",
                    color: "success",
                    onClick: completeAll
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 全部完成 ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "6" }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    block: "",
                    color: "grey",
                    onClick: resetAll
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" 全部未完成 ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VTabs, {
        modelValue: tab.value,
        "onUpdate:modelValue": ($event) => tab.value = $event,
        grow: "",
        "show-arrows": ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(categories, (c) => {
              _push2(ssrRenderComponent(VTab, {
                key: c,
                value: c,
                class: "tab-wrapper"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span data-v-8fbb8775${_scopeId2}>${ssrInterpolate(c)}</span>`);
                    if (getUnfinishedCount(c) > 0) {
                      _push3(ssrRenderComponent(VBadge, {
                        content: getUnfinishedCount(c),
                        color: "red",
                        location: "top end",
                        "offset-x": isMobile.value ? -12 : -15,
                        "offset-y": isMobile.value ? -5 : -2
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode("span", null, toDisplayString(c), 1),
                      getUnfinishedCount(c) > 0 ? (openBlock(), createBlock(VBadge, {
                        key: 0,
                        content: getUnfinishedCount(c),
                        color: "red",
                        location: "top end",
                        "offset-x": isMobile.value ? -12 : -15,
                        "offset-y": isMobile.value ? -5 : -2
                      }, null, 8, ["content", "offset-x", "offset-y"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(categories, (c) => {
                return createVNode(VTab, {
                  key: c,
                  value: c,
                  class: "tab-wrapper"
                }, {
                  default: withCtx(() => [
                    createVNode("span", null, toDisplayString(c), 1),
                    getUnfinishedCount(c) > 0 ? (openBlock(), createBlock(VBadge, {
                      key: 0,
                      content: getUnfinishedCount(c),
                      color: "red",
                      location: "top end",
                      "offset-x": isMobile.value ? -12 : -15,
                      "offset-y": isMobile.value ? -5 : -2
                    }, null, 8, ["content", "offset-x", "offset-y"])) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1032, ["value"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VWindow, {
        modelValue: tab.value,
        "onUpdate:modelValue": ($event) => tab.value = $event,
        touch: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(categories, (c) => {
              _push2(ssrRenderComponent(VWindowItem, {
                key: c,
                value: c
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VRow, { class: "mt-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div${ssrRenderAttrs({
                            class: "task-list w-100",
                            name: "move"
                          })} data-v-8fbb8775>`);
                          ssrRenderList(filteredTasks(c), (item) => {
                            _push4(ssrRenderComponent(VCol, {
                              key: item.name,
                              cols: "12"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(VCard, {
                                    class: ["task-card", [getColor(item.type), { done: item.done }]],
                                    onClick: ($event) => toggleDone(item)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div class="left" data-v-8fbb8775${_scopeId5}>${ssrInterpolate(item.name)}</div><div class="middle" data-v-8fbb8775${_scopeId5}><div class="pill" data-v-8fbb8775${_scopeId5}>${ssrInterpolate(item.freq)}</div></div><div class="right" data-v-8fbb8775${_scopeId5}>${ssrInterpolate(item.desc)}</div>`);
                                        _push6(ssrRenderComponent(VIcon, { class: "status-icon" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(item.done ? "mdi-check-circle" : "mdi-circle-outline")}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(item.done ? "mdi-check-circle" : "mdi-circle-outline"), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode("div", { class: "left" }, toDisplayString(item.name), 1),
                                          createVNode("div", { class: "middle" }, [
                                            createVNode("div", { class: "pill" }, toDisplayString(item.freq), 1)
                                          ]),
                                          createVNode("div", { class: "right" }, toDisplayString(item.desc), 1),
                                          createVNode(VIcon, { class: "status-icon" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.done ? "mdi-check-circle" : "mdi-circle-outline"), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(VCard, {
                                      class: ["task-card", [getColor(item.type), { done: item.done }]],
                                      onClick: ($event) => toggleDone(item)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "left" }, toDisplayString(item.name), 1),
                                        createVNode("div", { class: "middle" }, [
                                          createVNode("div", { class: "pill" }, toDisplayString(item.freq), 1)
                                        ]),
                                        createVNode("div", { class: "right" }, toDisplayString(item.desc), 1),
                                        createVNode(VIcon, { class: "status-icon" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.done ? "mdi-check-circle" : "mdi-circle-outline"), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1032, ["class", "onClick"])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode(TransitionGroup, {
                              tag: "div",
                              class: "task-list w-100",
                              name: "move"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(filteredTasks(c), (item) => {
                                  return openBlock(), createBlock(VCol, {
                                    key: item.name,
                                    cols: "12"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VCard, {
                                        class: ["task-card", [getColor(item.type), { done: item.done }]],
                                        onClick: ($event) => toggleDone(item)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "left" }, toDisplayString(item.name), 1),
                                          createVNode("div", { class: "middle" }, [
                                            createVNode("div", { class: "pill" }, toDisplayString(item.freq), 1)
                                          ]),
                                          createVNode("div", { class: "right" }, toDisplayString(item.desc), 1),
                                          createVNode(VIcon, { class: "status-icon" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(item.done ? "mdi-check-circle" : "mdi-circle-outline"), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["class", "onClick"])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VRow, { class: "mt-2" }, {
                        default: withCtx(() => [
                          createVNode(TransitionGroup, {
                            tag: "div",
                            class: "task-list w-100",
                            name: "move"
                          }, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(filteredTasks(c), (item) => {
                                return openBlock(), createBlock(VCol, {
                                  key: item.name,
                                  cols: "12"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCard, {
                                      class: ["task-card", [getColor(item.type), { done: item.done }]],
                                      onClick: ($event) => toggleDone(item)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "left" }, toDisplayString(item.name), 1),
                                        createVNode("div", { class: "middle" }, [
                                          createVNode("div", { class: "pill" }, toDisplayString(item.freq), 1)
                                        ]),
                                        createVNode("div", { class: "right" }, toDisplayString(item.desc), 1),
                                        createVNode(VIcon, { class: "status-icon" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(item.done ? "mdi-check-circle" : "mdi-circle-outline"), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1032, ["class", "onClick"])
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(categories, (c) => {
                return createVNode(VWindowItem, {
                  key: c,
                  value: c
                }, {
                  default: withCtx(() => [
                    createVNode(VRow, { class: "mt-2" }, {
                      default: withCtx(() => [
                        createVNode(TransitionGroup, {
                          tag: "div",
                          class: "task-list w-100",
                          name: "move"
                        }, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(filteredTasks(c), (item) => {
                              return openBlock(), createBlock(VCol, {
                                key: item.name,
                                cols: "12"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCard, {
                                    class: ["task-card", [getColor(item.type), { done: item.done }]],
                                    onClick: ($event) => toggleDone(item)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "left" }, toDisplayString(item.name), 1),
                                      createVNode("div", { class: "middle" }, [
                                        createVNode("div", { class: "pill" }, toDisplayString(item.freq), 1)
                                      ]),
                                      createVNode("div", { class: "right" }, toDisplayString(item.desc), 1),
                                      createVNode(VIcon, { class: "status-icon" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(item.done ? "mdi-check-circle" : "mdi-circle-outline"), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1032, ["class", "onClick"])
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["value"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Sixer/NTEdaily.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const NTEdaily = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8fbb8775"]]);

export { NTEdaily as default };
//# sourceMappingURL=NTEdaily-BPXhs6el.mjs.map
