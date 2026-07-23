import { _ as __nuxt_component_0 } from './nuxt-link-C11NfZU7.mjs';
import { defineComponent, ref, computed, watch, withCtx, unref, createTextVNode, createVNode, openBlock, createBlock, createCommentVNode, Fragment, toDisplayString, renderList, mergeProps, renderSlot, toRef, watchEffect, shallowRef, nextTick, readonly, onScopeDispose, normalizeStyle, normalizeClass, createElementVNode, Transition, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc, a as useUser, x as useDisplay, n as navigateTo, g as genericComponent, c as useProxiedModel, O as useToggleScope, l as useRtl, j as provideTheme, r as provideDefaults, C as clamp, p as propsFactory, o as omit, q as convertToUnit, m as makeThemeProps, J as makeDisplayProps } from './server.mjs';
import { V as VApp } from './VApp-TyFvARlZ.mjs';
import { u as useRender, m as makeTagProps, c as makeComponentProps } from './dimensions-B7KURZuc.mjs';
import { V as VExpandTransition } from './index-Cr-Vuh5O.mjs';
import { V as VIcon, w as useBorder, b as useBackgroundColor, r as useElevation, d as useRounded, B as useRouter, K as toPhysical, f as makeRoundedProps, n as makeElevationProps, o as makeBorderProps, g as makeLocationProps, e as useLocation, p as VDefaultsProvider } from './index-DVrSdyte.mjs';
import { V as VCard, e as VImg } from './VCard-BqUhiF6T.mjs';
import { a as useLayoutItem, m as makeLayoutItemProps } from './layout-BYmWGd6C.mjs';
import { u as useSsrBoot } from './ssrBoot-ZQn7gOuX.mjs';
import { V as VBtn, m as makeVBtnProps } from './VBtn-CygXX-_7.mjs';
import { V as VSpacer } from './VSpacer-C9EBCiip.mjs';
import { u as useFocusTrap, m as makeFocusTrapProps, b as makeDelayProps, a as useDelay } from './focusTrap-hyPXUrgo.mjs';
import { u as useScopeId } from './scopeId-BdYz0dQ0.mjs';
import { V as VList, b as VListGroup } from './VList-7bIncbX4.mjs';
import { V as VListItem } from './VListItem-BmLTdZa_.mjs';
import { V as VMain } from './VMain-IjnDn4rS.mjs';
import { V as VContainer } from './VContainer-BWwOr7CB.mjs';
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
import './VDivider-BEUbRpXn.mjs';

const useMenu = () => {
  const menu = [
    {
      title: "首頁",
      icon: "mdi-home",
      path: "/welcome",
      roles: ["admin", "curri", "user", "guest"]
    },
    {
      title: "資訊速查",
      icon: "mdi-information-outline",
      path: "/Info/Info",
      roles: ["admin", "curri", "user", "guest"]
    },
    {
      title: "資料庫維護",
      icon: "mdi-database",
      group: true,
      roles: ["admin", "curri"],
      children: [
        {
          title: "帳號維護",
          icon: "mdi-account",
          path: "/DB/Members",
          roles: ["admin"]
        },
        {
          title: "課務承辦",
          icon: "mdi-account-tie",
          path: "/DB/CurriAgent",
          roles: ["admin"]
        },
        {
          title: "系所表維護",
          icon: "mdi-table",
          path: "/DB/DBmaintain",
          roles: ["admin", "curri"]
        },
        {
          title: "班級對應",
          icon: "mdi-compare-horizontal",
          path: "/DB/ClassDeptshort",
          roles: ["admin", "curri"]
        }
      ]
    },
    {
      title: "課務工具",
      icon: "mdi-tools",
      group: true,
      roles: ["admin", "curri", "user"],
      children: [
        {
          title: "班級轉換",
          icon: "mdi-file-swap",
          path: "/Converters/ClassToOthers",
          roles: ["admin", "curri", "user"]
        },
        {
          title: "學制轉換",
          icon: "mdi-school",
          path: "/Converters/SIDtoSYS",
          roles: ["admin", "curri", "user"]
        },
        {
          title: "生日轉民國年",
          icon: "mdi-file-swap",
          path: "/Converters/Bdate",
          roles: ["admin", "curri"]
        },
        {
          title: "Email複製",
          icon: "mdi-email-multiple-outline",
          path: "/Converters/CopyDeptsDetails",
          roles: ["admin", "curri"]
        }
      ]
    }
    // {
    //   title: "蛇窩",
    //   icon: "mdi-tools",
    //   group: true,
    //   roles: ["admin"],
    //   children: [
    //     {
    //       title: "異環每日",
    //       path: "/Sixer/NTEdaily",
    //       roles: ["admin", "guest"],
    //     },
    //   ],
    // },
    // {
    //   title: "工具",
    //   icon: "mdi-tools",
    //   group: true,
    //   roles: ["admin"],
    //   children: [
    //     {
    //       title: "梗圖搜尋",
    //       path: "/Tools/Meme",
    //       roles: ["admin", "curri", "user", "guest"],
    //     },
    //     {
    //       title: "YT下載",
    //       path: "/Tools/YTconverter",
    //       roles: ["admin", "curri", "user", "guest"],
    //     },
    //   ],
    // },
  ];
  return { menu };
};
const makeVToolbarTitleProps = propsFactory({
  text: String,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VToolbarTitle");
const VToolbarTitle = genericComponent()({
  name: "VToolbarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => {
      const hasText = !!(slots.default || slots.text || props.text);
      return createVNode(props.tag, {
        "class": normalizeClass(["v-toolbar-title", props.class]),
        "style": normalizeStyle(props.style)
      }, {
        default: () => [hasText && createElementVNode("div", {
          "class": "v-toolbar-title__placeholder"
        }, [slots.text ? slots.text() : props.text, slots.default?.()])]
      });
    });
    return {};
  }
});
const allowedDensities = [null, "prominent", "default", "comfortable", "compact"];
const makeVToolbarProps = propsFactory({
  absolute: Boolean,
  collapse: Boolean,
  collapsePosition: {
    type: String,
    default: "start"
  },
  color: String,
  density: {
    type: String,
    default: "default",
    validator: (v) => allowedDensities.includes(v)
  },
  extended: {
    type: Boolean,
    default: null
  },
  extensionHeight: {
    type: [Number, String],
    default: 48
  },
  flat: Boolean,
  floating: Boolean,
  height: {
    type: [Number, String],
    default: 64
  },
  image: String,
  title: String,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeElevationProps(),
  ...makeLocationProps(),
  ...makeRoundedProps(),
  ...makeTagProps({
    tag: "header"
  }),
  ...makeThemeProps()
}, "VToolbar");
const VToolbar = genericComponent()({
  name: "VToolbar",
  props: makeVToolbarProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      borderClasses
    } = useBorder(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      locationStyles
    } = useLocation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const {
      themeClasses
    } = provideTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const isExtended = shallowRef(props.extended === null ? !!slots.extension?.() : props.extended);
    const contentHeight = computed(() => parseInt(Number(props.height) + (props.density === "prominent" ? Number(props.height) : 0) - (props.density === "comfortable" ? 8 : 0) - (props.density === "compact" ? 16 : 0), 10));
    const extensionHeight = computed(() => isExtended.value ? parseInt(Number(props.extensionHeight) + (props.density === "prominent" ? Number(props.extensionHeight) : 0) - (props.density === "comfortable" ? 4 : 0) - (props.density === "compact" ? 8 : 0), 10) : 0);
    provideDefaults({
      VBtn: {
        variant: "text"
      }
    });
    useRender(() => {
      const hasTitle = !!(props.title || slots.title);
      const hasImage = !!(slots.image || props.image);
      const extension = slots.extension?.();
      isExtended.value = props.extended === null ? !!extension : props.extended;
      return createVNode(props.tag, {
        "class": normalizeClass(["v-toolbar", `v-toolbar--collapse-${props.collapsePosition}`, {
          "v-toolbar--absolute": props.absolute,
          "v-toolbar--collapse": props.collapse,
          "v-toolbar--flat": props.flat,
          "v-toolbar--floating": props.floating,
          [`v-toolbar--density-${props.density}`]: true
        }, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value, themeClasses.value, rtlClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, locationStyles.value, props.style])
      }, {
        default: () => [hasImage && createElementVNode("div", {
          "key": "image",
          "class": "v-toolbar__image"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "cover": true,
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              cover: true,
              src: props.image
            }
          }
        }, slots.image)]), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(contentHeight.value)
            }
          }
        }, {
          default: () => [createElementVNode("div", {
            "class": "v-toolbar__content",
            "style": {
              height: convertToUnit(contentHeight.value)
            }
          }, [slots.prepend && createElementVNode("div", {
            "class": "v-toolbar__prepend"
          }, [slots.prepend?.()]), hasTitle && createVNode(VToolbarTitle, {
            "key": "title",
            "text": props.title
          }, {
            text: slots.title
          }), slots.default?.(), slots.append && createElementVNode("div", {
            "class": "v-toolbar__append"
          }, [slots.append?.()])])]
        }), createVNode(VDefaultsProvider, {
          "defaults": {
            VTabs: {
              height: convertToUnit(extensionHeight.value)
            }
          }
        }, {
          default: () => [createVNode(VExpandTransition, null, {
            default: () => [isExtended.value && createElementVNode("div", {
              "class": "v-toolbar__extension",
              "style": {
                height: convertToUnit(extensionHeight.value)
              }
            }, [extension])]
          })]
        })]
      });
    });
    return {
      contentHeight,
      extensionHeight
    };
  }
});
const makeScrollProps = propsFactory({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number],
    default: 300
  }
}, "scroll");
function useScroll(props) {
  let args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    canScroll,
    layoutSize
  } = args;
  let previousScroll = 0;
  let previousScrollHeight = 0;
  const target = ref(null);
  const currentScroll = shallowRef(0);
  const savedScroll = shallowRef(0);
  const currentThreshold = shallowRef(0);
  const isScrollActive = shallowRef(false);
  const isScrollingUp = shallowRef(false);
  const isAtBottom = shallowRef(false);
  const reachedBottomWhileScrollingDown = shallowRef(false);
  const hasEnoughScrollableSpace = shallowRef(true);
  const scrollThreshold = computed(() => {
    return Number(props.scrollThreshold);
  });
  const scrollRatio = computed(() => {
    return clamp((scrollThreshold.value - currentScroll.value) / scrollThreshold.value || 0);
  });
  function getScrollMetrics(targetEl) {
    const clientHeight = "window" in targetEl ? (void 0).innerHeight : targetEl.clientHeight;
    const scrollHeight = "window" in targetEl ? (void 0).documentElement.scrollHeight : targetEl.scrollHeight;
    return {
      clientHeight,
      scrollHeight
    };
  }
  function checkScrollableSpace() {
    const targetEl = target.value;
    if (!targetEl) return;
    const {
      clientHeight,
      scrollHeight
    } = getScrollMetrics(targetEl);
    const maxScrollableDistance = scrollHeight - clientHeight;
    const elementHeight = layoutSize?.value || 0;
    const minRequiredDistance = scrollThreshold.value + elementHeight;
    hasEnoughScrollableSpace.value = maxScrollableDistance > minRequiredDistance;
  }
  function onScroll() {
    const targetEl = target.value;
    if (!targetEl || canScroll && !canScroll.value) return;
    previousScroll = currentScroll.value;
    currentScroll.value = "window" in targetEl ? targetEl.pageYOffset : targetEl.scrollTop;
    const currentScrollHeight = targetEl instanceof Window ? (void 0).documentElement.scrollHeight : targetEl.scrollHeight;
    if (previousScrollHeight !== currentScrollHeight) {
      if (currentScrollHeight > previousScrollHeight) {
        checkScrollableSpace();
      }
      previousScrollHeight = currentScrollHeight;
    }
    isScrollingUp.value = currentScroll.value < previousScroll;
    currentThreshold.value = Math.abs(currentScroll.value - scrollThreshold.value);
    const {
      clientHeight,
      scrollHeight
    } = getScrollMetrics(targetEl);
    const atBottom = currentScroll.value + clientHeight >= scrollHeight - 5;
    if (!isScrollingUp.value && atBottom && currentScroll.value >= scrollThreshold.value && hasEnoughScrollableSpace.value) {
      reachedBottomWhileScrollingDown.value = true;
    }
    const scrollJumped = Math.abs(currentScroll.value - previousScroll) > 100;
    const atTop = currentScroll.value <= 5;
    const scrolledUpSignificantly = isScrollingUp.value && previousScroll - currentScroll.value > 1;
    if (scrolledUpSignificantly && !atBottom || scrollJumped && currentScroll.value < scrollThreshold.value || atTop) {
      reachedBottomWhileScrollingDown.value = false;
    }
    isAtBottom.value = atBottom;
  }
  watch(isScrollingUp, () => {
    savedScroll.value = savedScroll.value || currentScroll.value;
  });
  watch(isScrollActive, () => {
    savedScroll.value = 0;
  });
  canScroll && watch(canScroll, onScroll, {
    immediate: true
  });
  return {
    scrollThreshold,
    currentScroll,
    currentThreshold,
    isScrollActive,
    scrollRatio,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp,
    savedScroll,
    isAtBottom,
    reachedBottomWhileScrollingDown,
    hasEnoughScrollableSpace
  };
}
const makeVAppBarProps = propsFactory({
  scrollBehavior: String,
  modelValue: {
    type: Boolean,
    default: true
  },
  location: {
    type: String,
    default: "top",
    validator: (value) => ["top", "bottom"].includes(value)
  },
  ...omit(makeVToolbarProps(), ["location"]),
  ...makeLayoutItemProps(),
  ...makeScrollProps(),
  height: {
    type: [Number, String],
    default: 64
  }
}, "VAppBar");
const VAppBar = genericComponent()({
  name: "VAppBar",
  props: makeVAppBarProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const vToolbarRef = ref();
    const isActive = useProxiedModel(props, "modelValue");
    const scrollBehavior = computed(() => {
      const behavior = new Set(props.scrollBehavior?.split(" ") ?? []);
      return {
        hide: behavior.has("hide"),
        fullyHide: behavior.has("fully-hide"),
        inverted: behavior.has("inverted"),
        collapse: behavior.has("collapse"),
        elevate: behavior.has("elevate"),
        fadeImage: behavior.has("fade-image")
        // shrink: behavior.has('shrink'),
      };
    });
    const canScroll = computed(() => {
      const behavior = scrollBehavior.value;
      return behavior.hide || behavior.fullyHide || behavior.inverted || behavior.collapse || behavior.elevate || behavior.fadeImage || // behavior.shrink ||
      !isActive.value;
    });
    const appBarHeight = computed(() => {
      const height2 = vToolbarRef.value?.contentHeight ?? 0;
      const extensionHeight = vToolbarRef.value?.extensionHeight ?? 0;
      return height2 + extensionHeight;
    });
    const {
      currentScroll,
      scrollThreshold,
      isScrollingUp,
      scrollRatio,
      isAtBottom,
      reachedBottomWhileScrollingDown,
      hasEnoughScrollableSpace
    } = useScroll(props, {
      canScroll,
      layoutSize: appBarHeight
    });
    const canHide = toRef(() => scrollBehavior.value.hide || scrollBehavior.value.fullyHide);
    const isCollapsed = computed(() => props.collapse || scrollBehavior.value.collapse && (scrollBehavior.value.inverted ? scrollRatio.value > 0 : scrollRatio.value === 0));
    const isFlat = computed(() => props.flat || scrollBehavior.value.fullyHide && !isActive.value || scrollBehavior.value.elevate && (scrollBehavior.value.inverted ? currentScroll.value > 0 : currentScroll.value === 0));
    const opacity = computed(() => scrollBehavior.value.fadeImage ? scrollBehavior.value.inverted ? 1 - scrollRatio.value : scrollRatio.value : void 0);
    const height = computed(() => {
      if (scrollBehavior.value.hide && scrollBehavior.value.inverted) return 0;
      const height2 = vToolbarRef.value?.contentHeight ?? 0;
      const extensionHeight = vToolbarRef.value?.extensionHeight ?? 0;
      if (!canHide.value) return height2 + extensionHeight;
      return currentScroll.value < scrollThreshold.value || scrollBehavior.value.fullyHide ? height2 + extensionHeight : height2;
    });
    useToggleScope(() => !!props.scrollBehavior, () => {
      watchEffect(() => {
        if (!canHide.value) {
          isActive.value = true;
          return;
        }
        if (scrollBehavior.value.inverted) {
          isActive.value = currentScroll.value > scrollThreshold.value;
          return;
        }
        if (!hasEnoughScrollableSpace.value) {
          isActive.value = true;
          return;
        }
        if (reachedBottomWhileScrollingDown.value) {
          isActive.value = false;
          return;
        }
        isActive.value = isScrollingUp.value && !isAtBottom.value || currentScroll.value < scrollThreshold.value;
      });
    });
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      layoutItemStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: toRef(() => props.location),
      layoutSize: height,
      elementSize: shallowRef(void 0),
      active: isActive,
      absolute: toRef(() => props.absolute)
    });
    useRender(() => {
      const toolbarProps = omit(VToolbar.filterProps(props), ["location"]);
      return createVNode(VToolbar, mergeProps({
        "ref": vToolbarRef,
        "class": ["v-app-bar", {
          "v-app-bar--bottom": props.location === "bottom"
        }, props.class],
        "style": [{
          ...layoutItemStyles.value,
          "--v-toolbar-image-opacity": opacity.value,
          height: void 0,
          ...ssrBootStyles.value
        }, props.style]
      }, toolbarProps, {
        "collapse": isCollapsed.value,
        "flat": isFlat.value
      }), slots);
    });
    return {};
  }
});
const makeVAppBarNavIconProps = propsFactory({
  ...omit(makeVBtnProps({
    icon: "$menu",
    variant: "text"
  }), ["spaced"])
}, "VAppBarNavIcon");
const VAppBarNavIcon = genericComponent()({
  name: "VAppBarNavIcon",
  props: makeVAppBarNavIconProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VBtn, mergeProps(props, {
      "class": ["v-app-bar-nav-icon"]
    }), slots));
    return {};
  }
});
const VAppBarTitle = genericComponent()({
  name: "VAppBarTitle",
  props: makeVToolbarTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(VToolbarTitle, mergeProps(props, {
      "class": "v-app-bar-title"
    }), slots));
    return {};
  }
});
function useSticky(_ref) {
  let {
    isSticky,
    layoutItemStyles
  } = _ref;
  const isStuck = shallowRef(false);
  const stuckPosition = shallowRef(0);
  const stickyStyles = computed(() => {
    const side = typeof isStuck.value === "boolean" ? "top" : isStuck.value;
    return [isSticky.value ? {
      top: "auto",
      bottom: "auto",
      height: void 0
    } : void 0, isStuck.value ? {
      [side]: convertToUnit(stuckPosition.value)
    } : {
      top: layoutItemStyles.value.top
    }];
  });
  return {
    isStuck,
    stickyStyles
  };
}
function useTouch(_ref) {
  let {
    el,
    width,
    position
  } = _ref;
  computed(() => ["left", "right"].includes(position.value));
  const isDragging = shallowRef(false);
  const dragProgress = shallowRef(0);
  shallowRef(0);
  const dragStyles = computed(() => {
    return isDragging.value ? {
      transform: position.value === "left" ? `translateX(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "right" ? `translateX(calc(100% - ${dragProgress.value * width.value}px))` : position.value === "top" ? `translateY(calc(-100% + ${dragProgress.value * width.value}px))` : position.value === "bottom" ? `translateY(calc(100% - ${dragProgress.value * width.value}px))` : oops(),
      transition: "none"
    } : void 0;
  });
  useToggleScope(isDragging, () => {
    const transform = el.value?.style.transform ?? null;
    const transition = el.value?.style.transition ?? null;
    watchEffect(() => {
      el.value?.style.setProperty("transform", dragStyles.value?.transform || "none");
      el.value?.style.setProperty("transition", dragStyles.value?.transition || null);
    });
    onScopeDispose(() => {
      el.value?.style.setProperty("transform", transform);
      el.value?.style.setProperty("transition", transition);
    });
  });
  return {
    isDragging,
    dragProgress,
    dragStyles
  };
}
function oops() {
  throw new Error();
}
const locations = ["start", "end", "left", "right", "top", "bottom"];
const makeVNavigationDrawerProps = propsFactory({
  color: String,
  disableResizeWatcher: Boolean,
  disableRouteWatcher: Boolean,
  expandOnHover: Boolean,
  floating: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  },
  permanent: Boolean,
  rail: {
    type: Boolean,
    default: null
  },
  railWidth: {
    type: [Number, String],
    default: 56
  },
  scrim: {
    type: [Boolean, String],
    default: true
  },
  image: String,
  temporary: Boolean,
  persistent: Boolean,
  touchless: Boolean,
  width: {
    type: [Number, String],
    default: 256
  },
  location: {
    type: String,
    default: "start",
    validator: (value) => locations.includes(value)
  },
  sticky: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDelayProps(),
  ...makeDisplayProps({
    mobile: null
  }),
  ...makeElevationProps(),
  ...makeLayoutItemProps(),
  ...makeRoundedProps(),
  ...omit(makeFocusTrapProps(), ["disableInitialFocus"]),
  ...makeTagProps({
    tag: "nav"
  }),
  ...makeThemeProps()
}, "VNavigationDrawer");
const VNavigationDrawer = genericComponent()({
  name: "VNavigationDrawer",
  props: makeVNavigationDrawerProps(),
  emits: {
    "update:modelValue": (val) => true,
    "update:rail": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      borderClasses
    } = useBorder(props);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const {
      roundedClasses
    } = useRounded(props);
    const router = useRouter();
    const isActive = useProxiedModel(props, "modelValue", null, (v) => !!v);
    const {
      ssrBootStyles
    } = useSsrBoot();
    const {
      scopeId
    } = useScopeId();
    const rootEl = ref();
    const isHovering = shallowRef(false);
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, (value) => {
      isHovering.value = value;
    });
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? Number(props.width) : Number(props.rail ? props.railWidth : props.width);
    });
    const location = computed(() => {
      return toPhysical(props.location, isRtl.value);
    });
    const isPersistent = toRef(() => props.persistent);
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const isSticky = computed(() => props.sticky && !isTemporary.value && location.value !== "bottom");
    useFocusTrap(props, {
      isActive,
      localTop: isTemporary,
      contentEl: rootEl
    });
    useToggleScope(() => props.expandOnHover && props.rail != null, () => {
      watch(isHovering, (val) => emit("update:rail", !val));
    });
    useToggleScope(() => !props.disableResizeWatcher, () => {
      watch(isTemporary, (val) => !props.permanent && nextTick(() => isActive.value = !val));
    });
    useToggleScope(() => !props.disableRouteWatcher && !!router, () => {
      watch(router.currentRoute, () => isTemporary.value && (isActive.value = false));
    });
    watch(() => props.permanent, (val) => {
      if (val) isActive.value = true;
    });
    if (props.modelValue == null && !isTemporary.value) {
      isActive.value = props.permanent || !mobile.value;
    }
    const {
      isDragging,
      dragProgress
    } = useTouch({
      el: rootEl,
      width,
      touchless: toRef(() => props.touchless),
      position: location
    });
    const layoutSize = computed(() => {
      const size = isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value;
      return isDragging.value ? size * dragProgress.value : size;
    });
    const {
      layoutItemStyles,
      layoutItemScrimStyles
    } = useLayoutItem({
      id: props.name,
      order: computed(() => parseInt(props.order, 10)),
      position: location,
      layoutSize,
      elementSize: width,
      active: readonly(isActive),
      disableTransitions: toRef(() => isDragging.value),
      absolute: computed(() => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        props.absolute || isSticky.value && typeof isStuck.value !== "string"
      ))
    });
    const {
      isStuck,
      stickyStyles
    } = useSticky({
      isSticky,
      layoutItemStyles
    });
    const scrimColor = useBackgroundColor(() => {
      return typeof props.scrim === "string" ? props.scrim : null;
    });
    const scrimStyles = computed(() => ({
      ...isDragging.value ? {
        opacity: dragProgress.value * 0.2,
        transition: "none"
      } : void 0,
      ...layoutItemScrimStyles.value
    }));
    provideDefaults({
      VList: {
        bgColor: "transparent"
      }
    });
    useRender(() => {
      const hasImage = slots.image || props.image;
      return createElementVNode(Fragment, null, [createVNode(props.tag, mergeProps({
        "ref": rootEl,
        "onMouseenter": runOpenDelay,
        "onMouseleave": runCloseDelay,
        "class": ["v-navigation-drawer", `v-navigation-drawer--${location.value}`, {
          "v-navigation-drawer--expand-on-hover": props.expandOnHover,
          "v-navigation-drawer--floating": props.floating,
          "v-navigation-drawer--is-hovering": isHovering.value,
          "v-navigation-drawer--rail": props.rail,
          "v-navigation-drawer--temporary": isTemporary.value,
          "v-navigation-drawer--persistent": isPersistent.value,
          "v-navigation-drawer--active": isActive.value,
          "v-navigation-drawer--sticky": isSticky.value
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, displayClasses.value, elevationClasses.value, roundedClasses.value, props.class],
        "style": [backgroundColorStyles.value, layoutItemStyles.value, ssrBootStyles.value, stickyStyles.value, props.style],
        "inert": !isActive.value
      }, scopeId, attrs), {
        default: () => [hasImage && createElementVNode("div", {
          "key": "image",
          "class": "v-navigation-drawer__img"
        }, [!slots.image ? createVNode(VImg, {
          "key": "image-img",
          "alt": "",
          "cover": true,
          "height": "inherit",
          "src": props.image
        }, null) : createVNode(VDefaultsProvider, {
          "key": "image-defaults",
          "disabled": !props.image,
          "defaults": {
            VImg: {
              alt: "",
              cover: true,
              height: "inherit",
              src: props.image
            }
          }
        }, slots.image)]), slots.prepend && createElementVNode("div", {
          "class": "v-navigation-drawer__prepend"
        }, [slots.prepend?.()]), createElementVNode("div", {
          "class": "v-navigation-drawer__content"
        }, [slots.default?.()]), slots.append && createElementVNode("div", {
          "class": "v-navigation-drawer__append"
        }, [slots.append?.()])]
      }), createVNode(Transition, {
        "name": "fade-transition"
      }, {
        default: () => [isTemporary.value && (isDragging.value || isActive.value) && !!props.scrim && createElementVNode("div", mergeProps({
          "class": ["v-navigation-drawer__scrim", scrimColor.backgroundColorClasses.value],
          "style": [scrimStyles.value, scrimColor.backgroundColorStyles.value],
          "onClick": () => {
            if (isPersistent.value) return;
            isActive.value = false;
          }
        }, scopeId), null)]
      })]);
    });
    return {
      isStuck
    };
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "layout1",
  __ssrInlineRender: true,
  setup(__props) {
    const { user, clearUser } = useUser();
    const { menu } = useMenu();
    const ready = ref(false);
    const role = computed(() => user.value?.auth);
    const isLoggedIn = computed(() => !!user.value);
    const getChildren = (item) => {
      return item.children || [];
    };
    const hasRole = (item) => {
      return item.roles.includes(role.value || "");
    };
    const { mobile } = useDisplay();
    const drawer = ref(false);
    watch(
      mobile,
      (val) => {
        drawer.value = !val;
      },
      { immediate: true }
    );
    const handleNavClick = () => {
      if (mobile.value) drawer.value = false;
    };
    const logout = () => {
      clearUser();
      navigateTo("/login");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (ready.value) {
        _push(ssrRenderComponent(VApp, _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VAppBar, { app: "" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(mobile)) {
                      _push3(ssrRenderComponent(VAppBarNavIcon, {
                        onClick: ($event) => drawer.value = !drawer.value
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VAppBarTitle, { class: "pl-4" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`課務輔助工具`);
                              } else {
                                return [
                                  createTextVNode("課務輔助工具")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VAppBarTitle, { class: "pl-4" }, {
                              default: withCtx(() => [
                                createTextVNode("課務輔助工具")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
                    _push3(`<div class="d-flex align-center pr-4" data-v-84eabad6${_scopeId2}>`);
                    if (isLoggedIn.value) {
                      _push3(`<!--[--><span class="mr-3 text-subtitle-1 font-weight-bold" data-v-84eabad6${_scopeId2}> 歡迎，${ssrInterpolate(unref(user)?.name)} (${ssrInterpolate(unref(user)?.username)}) </span>`);
                      _push3(ssrRenderComponent(VBtn, {
                        "prepend-icon": "mdi-logout",
                        color: "error",
                        variant: "tonal",
                        onClick: logout
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` 登出 `);
                          } else {
                            return [
                              createTextVNode(" 登出 ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`<!--]-->`);
                    } else {
                      _push3(ssrRenderComponent(VBtn, {
                        "prepend-icon": "mdi-login",
                        color: "primary",
                        onClick: ($event) => unref(navigateTo)("/login")
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` 登入系統 `);
                          } else {
                            return [
                              createTextVNode(" 登入系統 ")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    }
                    _push3(`</div>`);
                  } else {
                    return [
                      unref(mobile) ? (openBlock(), createBlock(VAppBarNavIcon, {
                        key: 0,
                        onClick: ($event) => drawer.value = !drawer.value
                      }, null, 8, ["onClick"])) : createCommentVNode("", true),
                      createVNode(_component_NuxtLink, { to: "/" }, {
                        default: withCtx(() => [
                          createVNode(VAppBarTitle, { class: "pl-4" }, {
                            default: withCtx(() => [
                              createTextVNode("課務輔助工具")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VSpacer),
                      createVNode("div", { class: "d-flex align-center pr-4" }, [
                        isLoggedIn.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createVNode("span", { class: "mr-3 text-subtitle-1 font-weight-bold" }, " 歡迎，" + toDisplayString(unref(user)?.name) + " (" + toDisplayString(unref(user)?.username) + ") ", 1),
                          createVNode(VBtn, {
                            "prepend-icon": "mdi-logout",
                            color: "error",
                            variant: "tonal",
                            onClick: logout
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 登出 ")
                            ]),
                            _: 1
                          })
                        ], 64)) : (openBlock(), createBlock(VBtn, {
                          key: 1,
                          "prepend-icon": "mdi-login",
                          color: "primary",
                          onClick: ($event) => unref(navigateTo)("/login")
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 登入系統 ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (isLoggedIn.value) {
                _push2(ssrRenderComponent(VNavigationDrawer, {
                  modelValue: drawer.value,
                  "onUpdate:modelValue": ($event) => drawer.value = $event,
                  app: "",
                  permanent: !unref(mobile),
                  temporary: unref(mobile)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(VList, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<!--[-->`);
                            ssrRenderList(unref(menu), (item) => {
                              _push4(`<!--[-->`);
                              if (!item.group && hasRole(item)) {
                                _push4(ssrRenderComponent(VListItem, {
                                  to: item.path,
                                  title: item.title,
                                  "prepend-icon": item.icon,
                                  onClick: handleNavClick
                                }, null, _parent4, _scopeId3));
                              } else if (item.group && hasRole(item)) {
                                _push4(ssrRenderComponent(VListGroup, {
                                  value: item.title
                                }, {
                                  activator: withCtx(({ props }, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(ssrRenderComponent(VListItem, mergeProps({ ref_for: true }, props, {
                                        title: item.title,
                                        "prepend-icon": item.icon
                                      }), null, _parent5, _scopeId4));
                                    } else {
                                      return [
                                        createVNode(VListItem, mergeProps({ ref_for: true }, props, {
                                          title: item.title,
                                          "prepend-icon": item.icon
                                        }), null, 16, ["title", "prepend-icon"])
                                      ];
                                    }
                                  }),
                                  default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                    if (_push5) {
                                      _push5(`<!--[-->`);
                                      ssrRenderList(getChildren(item), (child) => {
                                        _push5(`<!--[-->`);
                                        if (hasRole(child)) {
                                          _push5(ssrRenderComponent(VListItem, {
                                            to: child.path,
                                            title: child.title,
                                            "prepend-icon": child.icon || "mdi-chevron-right",
                                            onClick: handleNavClick
                                          }, null, _parent5, _scopeId4));
                                        } else {
                                          _push5(`<!---->`);
                                        }
                                        _push5(`<!--]-->`);
                                      });
                                      _push5(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(getChildren(item), (child) => {
                                          return openBlock(), createBlock(Fragment, {
                                            key: child.title
                                          }, [
                                            hasRole(child) ? (openBlock(), createBlock(VListItem, {
                                              key: 0,
                                              to: child.path,
                                              title: child.title,
                                              "prepend-icon": child.icon || "mdi-chevron-right",
                                              onClick: handleNavClick
                                            }, null, 8, ["to", "title", "prepend-icon"])) : createCommentVNode("", true)
                                          ], 64);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent4, _scopeId3));
                              } else {
                                _push4(`<!---->`);
                              }
                              _push4(`<!--]-->`);
                            });
                            _push4(`<!--]-->`);
                          } else {
                            return [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(menu), (item) => {
                                return openBlock(), createBlock(Fragment, {
                                  key: item.title
                                }, [
                                  !item.group && hasRole(item) ? (openBlock(), createBlock(VListItem, {
                                    key: 0,
                                    to: item.path,
                                    title: item.title,
                                    "prepend-icon": item.icon,
                                    onClick: handleNavClick
                                  }, null, 8, ["to", "title", "prepend-icon"])) : item.group && hasRole(item) ? (openBlock(), createBlock(VListGroup, {
                                    key: 1,
                                    value: item.title
                                  }, {
                                    activator: withCtx(({ props }) => [
                                      createVNode(VListItem, mergeProps({ ref_for: true }, props, {
                                        title: item.title,
                                        "prepend-icon": item.icon
                                      }), null, 16, ["title", "prepend-icon"])
                                    ]),
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(getChildren(item), (child) => {
                                        return openBlock(), createBlock(Fragment, {
                                          key: child.title
                                        }, [
                                          hasRole(child) ? (openBlock(), createBlock(VListItem, {
                                            key: 0,
                                            to: child.path,
                                            title: child.title,
                                            "prepend-icon": child.icon || "mdi-chevron-right",
                                            onClick: handleNavClick
                                          }, null, 8, ["to", "title", "prepend-icon"])) : createCommentVNode("", true)
                                        ], 64);
                                      }), 128))
                                    ]),
                                    _: 2
                                  }, 1032, ["value"])) : createCommentVNode("", true)
                                ], 64);
                              }), 128))
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(VList, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(menu), (item) => {
                              return openBlock(), createBlock(Fragment, {
                                key: item.title
                              }, [
                                !item.group && hasRole(item) ? (openBlock(), createBlock(VListItem, {
                                  key: 0,
                                  to: item.path,
                                  title: item.title,
                                  "prepend-icon": item.icon,
                                  onClick: handleNavClick
                                }, null, 8, ["to", "title", "prepend-icon"])) : item.group && hasRole(item) ? (openBlock(), createBlock(VListGroup, {
                                  key: 1,
                                  value: item.title
                                }, {
                                  activator: withCtx(({ props }) => [
                                    createVNode(VListItem, mergeProps({ ref_for: true }, props, {
                                      title: item.title,
                                      "prepend-icon": item.icon
                                    }), null, 16, ["title", "prepend-icon"])
                                  ]),
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(getChildren(item), (child) => {
                                      return openBlock(), createBlock(Fragment, {
                                        key: child.title
                                      }, [
                                        hasRole(child) ? (openBlock(), createBlock(VListItem, {
                                          key: 0,
                                          to: child.path,
                                          title: child.title,
                                          "prepend-icon": child.icon || "mdi-chevron-right",
                                          onClick: handleNavClick
                                        }, null, 8, ["to", "title", "prepend-icon"])) : createCommentVNode("", true)
                                      ], 64);
                                    }), 128))
                                  ]),
                                  _: 2
                                }, 1032, ["value"])) : createCommentVNode("", true)
                              ], 64);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (isLoggedIn.value) {
                _push2(ssrRenderComponent(VMain, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(VContainer, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                          } else {
                            return [
                              renderSlot(_ctx.$slots, "default", {}, void 0, true)
                            ];
                          }
                        }),
                        _: 3
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(VContainer, null, {
                          default: withCtx(() => [
                            renderSlot(_ctx.$slots, "default", {}, void 0, true)
                          ]),
                          _: 3
                        })
                      ];
                    }
                  }),
                  _: 3
                }, _parent2, _scopeId));
              } else {
                _push2(ssrRenderComponent(VMain, { class: "d-flex justify-center align-center" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(VCard, { class: "pa-6 text-center" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VIcon, { size: "50" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`mdi-lock`);
                                } else {
                                  return [
                                    createTextVNode("mdi-lock")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                            _push4(`<h3 data-v-84eabad6${_scopeId3}>需要登入</h3>`);
                            _push4(ssrRenderComponent(VBtn, {
                              class: "mt-4",
                              onClick: ($event) => unref(navigateTo)("/login")
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`登入`);
                                } else {
                                  return [
                                    createTextVNode("登入")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VIcon, { size: "50" }, {
                                default: withCtx(() => [
                                  createTextVNode("mdi-lock")
                                ]),
                                _: 1
                              }),
                              createVNode("h3", null, "需要登入"),
                              createVNode(VBtn, {
                                class: "mt-4",
                                onClick: ($event) => unref(navigateTo)("/login")
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("登入")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(VCard, { class: "pa-6 text-center" }, {
                          default: withCtx(() => [
                            createVNode(VIcon, { size: "50" }, {
                              default: withCtx(() => [
                                createTextVNode("mdi-lock")
                              ]),
                              _: 1
                            }),
                            createVNode("h3", null, "需要登入"),
                            createVNode(VBtn, {
                              class: "mt-4",
                              onClick: ($event) => unref(navigateTo)("/login")
                            }, {
                              default: withCtx(() => [
                                createTextVNode("登入")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              }
            } else {
              return [
                createVNode(VAppBar, { app: "" }, {
                  default: withCtx(() => [
                    unref(mobile) ? (openBlock(), createBlock(VAppBarNavIcon, {
                      key: 0,
                      onClick: ($event) => drawer.value = !drawer.value
                    }, null, 8, ["onClick"])) : createCommentVNode("", true),
                    createVNode(_component_NuxtLink, { to: "/" }, {
                      default: withCtx(() => [
                        createVNode(VAppBarTitle, { class: "pl-4" }, {
                          default: withCtx(() => [
                            createTextVNode("課務輔助工具")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VSpacer),
                    createVNode("div", { class: "d-flex align-center pr-4" }, [
                      isLoggedIn.value ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode("span", { class: "mr-3 text-subtitle-1 font-weight-bold" }, " 歡迎，" + toDisplayString(unref(user)?.name) + " (" + toDisplayString(unref(user)?.username) + ") ", 1),
                        createVNode(VBtn, {
                          "prepend-icon": "mdi-logout",
                          color: "error",
                          variant: "tonal",
                          onClick: logout
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 登出 ")
                          ]),
                          _: 1
                        })
                      ], 64)) : (openBlock(), createBlock(VBtn, {
                        key: 1,
                        "prepend-icon": "mdi-login",
                        color: "primary",
                        onClick: ($event) => unref(navigateTo)("/login")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 登入系統 ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]))
                    ])
                  ]),
                  _: 1
                }),
                isLoggedIn.value ? (openBlock(), createBlock(VNavigationDrawer, {
                  key: 0,
                  modelValue: drawer.value,
                  "onUpdate:modelValue": ($event) => drawer.value = $event,
                  app: "",
                  permanent: !unref(mobile),
                  temporary: unref(mobile)
                }, {
                  default: withCtx(() => [
                    createVNode(VList, null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(menu), (item) => {
                          return openBlock(), createBlock(Fragment, {
                            key: item.title
                          }, [
                            !item.group && hasRole(item) ? (openBlock(), createBlock(VListItem, {
                              key: 0,
                              to: item.path,
                              title: item.title,
                              "prepend-icon": item.icon,
                              onClick: handleNavClick
                            }, null, 8, ["to", "title", "prepend-icon"])) : item.group && hasRole(item) ? (openBlock(), createBlock(VListGroup, {
                              key: 1,
                              value: item.title
                            }, {
                              activator: withCtx(({ props }) => [
                                createVNode(VListItem, mergeProps({ ref_for: true }, props, {
                                  title: item.title,
                                  "prepend-icon": item.icon
                                }), null, 16, ["title", "prepend-icon"])
                              ]),
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(getChildren(item), (child) => {
                                  return openBlock(), createBlock(Fragment, {
                                    key: child.title
                                  }, [
                                    hasRole(child) ? (openBlock(), createBlock(VListItem, {
                                      key: 0,
                                      to: child.path,
                                      title: child.title,
                                      "prepend-icon": child.icon || "mdi-chevron-right",
                                      onClick: handleNavClick
                                    }, null, 8, ["to", "title", "prepend-icon"])) : createCommentVNode("", true)
                                  ], 64);
                                }), 128))
                              ]),
                              _: 2
                            }, 1032, ["value"])) : createCommentVNode("", true)
                          ], 64);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "permanent", "temporary"])) : createCommentVNode("", true),
                isLoggedIn.value ? (openBlock(), createBlock(VMain, { key: 1 }, {
                  default: withCtx(() => [
                    createVNode(VContainer, null, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default", {}, void 0, true)
                      ]),
                      _: 3
                    })
                  ]),
                  _: 3
                })) : (openBlock(), createBlock(VMain, {
                  key: 2,
                  class: "d-flex justify-center align-center"
                }, {
                  default: withCtx(() => [
                    createVNode(VCard, { class: "pa-6 text-center" }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { size: "50" }, {
                          default: withCtx(() => [
                            createTextVNode("mdi-lock")
                          ]),
                          _: 1
                        }),
                        createVNode("h3", null, "需要登入"),
                        createVNode(VBtn, {
                          class: "mt-4",
                          onClick: ($event) => unref(navigateTo)("/login")
                        }, {
                          default: withCtx(() => [
                            createTextVNode("登入")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }))
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/layout1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const layout1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-84eabad6"]]);

export { layout1 as default };
//# sourceMappingURL=layout1-CAZg5qWD.mjs.map
