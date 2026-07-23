import { ref, computed, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, toRefs, toRef, mergeProps, createElementVNode, normalizeStyle, normalizeClass, watchEffect, capitalize, provide, toValue, shallowRef, watch, toRaw, inject, nextTick, withModifiers, useSSRContext } from 'vue';
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, u as useNuxtApp, g as genericComponent, r as provideDefaults, o as omit, c as useProxiedModel, b as useLocale, w as wrapInArray, F as isPrimitive, B as getCurrentInstance, x as useDisplay, v as pick, j as provideTheme, q as convertToUnit, p as propsFactory, G as getObjectValueByPath, H as isEmpty, l as useRtl, z as createRange, I as IconValue, J as makeDisplayProps, y as isOn, d as callEvent, m as makeThemeProps, E as consoleError, L as getPropertyFromItem, t as isObject, A as keyValues, D as defineFunctionalComponent, K as EventProp, C as clamp } from './server.mjs';
import { V as VCard, a as VCardTitle, c as VCardText, d as VCardActions } from './VCard-BqUhiF6T.mjs';
import { V as VBtn } from './VBtn-CygXX-_7.mjs';
import { V as VTextField } from './VTextField-B7wWYftJ.mjs';
import { u as useRender, c as makeComponentProps, d as useResizeObserver, m as makeTagProps } from './dimensions-B7KURZuc.mjs';
import { V as VIcon, h as deepEqual, i as useLoader, b as useBackgroundColor, L as LoaderSlot, u as useDensity, j as makeLoaderProps, m as makeDensityProps, k as makeVariantProps, l as makeSizeProps, f as makeRoundedProps, n as makeElevationProps, o as makeBorderProps } from './index-DVrSdyte.mjs';
import { V as VSelect, u as useFilter, m as makeFilterProps, a as VCheckboxBtn } from './VSelect-Cq2H4SIe.mjs';
import { V as VChip } from './VChip-F7YMK5qF.mjs';
import { V as VDivider } from './VDivider-BEUbRpXn.mjs';
import { V as VDialog } from './VDialog-DhJf4vpZ.mjs';
import { V as VContainer } from './VContainer-BWwOr7CB.mjs';
import { d as createForm, e as makeFormProps } from './autofocus-DcW6hXk9.mjs';
import { f as forwardRefs } from './forwardRefs-CJyhXHYH.mjs';
import { V as VRow, a as VCol } from './VRow-BBOgihbN.mjs';
import { V as VSpacer } from './VSpacer-C9EBCiip.mjs';
import { V as VSnackbar } from './VSnackbar-XEOvONhh.mjs';

function getPrefixedEventHandlers(attrs, suffix, getData) {
  return Object.keys(attrs).filter((key) => isOn(key) && key.endsWith(suffix)).reduce((acc, key) => {
    acc[key.slice(0, -suffix.length)] = (event) => callEvent(attrs[key], event, getData(event));
    return acc;
  }, {});
}
function useRefs() {
  const refs = ref([]);
  function updateRef(e, i) {
    refs.value[i] = e;
  }
  return {
    refs,
    updateRef
  };
}
const makeVPaginationProps = propsFactory({
  activeColor: String,
  start: {
    type: [Number, String],
    default: 1
  },
  modelValue: {
    type: Number,
    default: (props) => props.start
  },
  disabled: Boolean,
  length: {
    type: [Number, String],
    default: 1,
    validator: (val) => val % 1 === 0
  },
  totalVisible: [Number, String],
  firstIcon: {
    type: IconValue,
    default: "$first"
  },
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  lastIcon: {
    type: IconValue,
    default: "$last"
  },
  ariaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.root"
  },
  pageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.page"
  },
  currentPageAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.currentPage"
  },
  firstAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.first"
  },
  previousAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.previous"
  },
  nextAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.next"
  },
  lastAriaLabel: {
    type: String,
    default: "$vuetify.pagination.ariaLabel.last"
  },
  ellipsis: {
    type: String,
    default: "..."
  },
  showFirstLastPage: Boolean,
  ...makeBorderProps(),
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeElevationProps(),
  ...makeRoundedProps(),
  ...makeSizeProps(),
  ...makeTagProps({
    tag: "nav"
  }),
  ...makeThemeProps(),
  ...makeVariantProps({
    variant: "text"
  })
}, "VPagination");
const VPagination = genericComponent()({
  name: "VPagination",
  props: makeVPaginationProps(),
  emits: {
    "update:modelValue": (value) => true,
    first: (value) => true,
    prev: (value) => true,
    next: (value) => true,
    last: (value) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const page = useProxiedModel(props, "modelValue");
    const {
      t,
      n
    } = useLocale();
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = provideTheme(props);
    const {
      width
    } = useDisplay();
    const maxButtons = shallowRef(-1);
    provideDefaults(void 0, {
      scoped: true
    });
    const {
      resizeRef
    } = useResizeObserver();
    const length = computed(() => parseInt(props.length, 10));
    const start = computed(() => parseInt(props.start, 10));
    const totalVisible = computed(() => {
      if (props.totalVisible != null) return parseInt(props.totalVisible, 10);
      else if (maxButtons.value >= 0) return maxButtons.value;
      return getMax(width.value, 58);
    });
    function getMax(totalWidth, itemWidth) {
      const minButtons = props.showFirstLastPage ? 5 : 3;
      return Math.max(0, Math.floor(
        // Round to two decimal places to avoid floating point errors
        Number(((totalWidth - itemWidth * minButtons) / itemWidth).toFixed(2))
      ));
    }
    const range = computed(() => {
      if (length.value <= 0 || isNaN(length.value) || length.value > Number.MAX_SAFE_INTEGER) return [];
      if (totalVisible.value <= 0) return [];
      else if (totalVisible.value === 1) return [page.value];
      if (length.value <= totalVisible.value) {
        return createRange(length.value, start.value);
      }
      const even = totalVisible.value % 2 === 0;
      const middle = even ? totalVisible.value / 2 : Math.floor(totalVisible.value / 2);
      const left = even ? middle : middle + 1;
      const right = length.value - middle;
      if (left - page.value >= 0) {
        return [...createRange(Math.max(1, totalVisible.value - 1), start.value), props.ellipsis, length.value];
      } else if (page.value - right >= (even ? 1 : 0)) {
        const rangeLength = totalVisible.value - 1;
        const rangeStart = length.value - rangeLength + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 2);
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
      }
    });
    function setValue(e, value, event) {
      e.preventDefault();
      page.value = value;
      event && emit(event, value);
    }
    const {
      refs,
      updateRef
    } = useRefs();
    provideDefaults({
      VPaginationBtn: {
        color: toRef(() => props.color),
        border: toRef(() => props.border),
        density: toRef(() => props.density),
        size: toRef(() => props.size),
        variant: toRef(() => props.variant),
        rounded: toRef(() => props.rounded),
        elevation: toRef(() => props.elevation)
      }
    });
    const items = computed(() => {
      return range.value.map((item, index) => {
        const ref2 = (e) => updateRef(e, index);
        if (typeof item === "string") {
          return {
            isActive: false,
            key: `ellipsis-${index}`,
            page: item,
            props: {
              ref: ref2,
              ellipsis: true,
              icon: true,
              disabled: true
            }
          };
        } else {
          const isActive = item === page.value;
          return {
            isActive,
            key: item,
            page: n(item),
            props: {
              ref: ref2,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || Number(props.length) < 2,
              color: isActive ? props.activeColor : props.color,
              "aria-current": isActive,
              "aria-label": t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, item),
              onClick: (e) => setValue(e, item)
            }
          };
        }
      });
    });
    const controls = computed(() => {
      const prevDisabled = !!props.disabled || page.value <= start.value;
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
      return {
        first: props.showFirstLastPage ? {
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: (e) => setValue(e, start.value, "first"),
          disabled: prevDisabled,
          "aria-label": t(props.firstAriaLabel),
          "aria-disabled": prevDisabled
        } : void 0,
        prev: {
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: (e) => setValue(e, page.value - 1, "prev"),
          disabled: prevDisabled,
          "aria-label": t(props.previousAriaLabel),
          "aria-disabled": prevDisabled
        },
        next: {
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: (e) => setValue(e, page.value + 1, "next"),
          disabled: nextDisabled,
          "aria-label": t(props.nextAriaLabel),
          "aria-disabled": nextDisabled
        },
        last: props.showFirstLastPage ? {
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: (e) => setValue(e, start.value + length.value - 1, "last"),
          disabled: nextDisabled,
          "aria-label": t(props.lastAriaLabel),
          "aria-disabled": nextDisabled
        } : void 0
      };
    });
    function updateFocus() {
      const currentIndex = page.value - start.value;
      refs.value[currentIndex]?.$el.focus();
    }
    function onKeydown(e) {
      if (e.key === keyValues.left && !props.disabled && page.value > Number(props.start)) {
        page.value = page.value - 1;
        nextTick(updateFocus);
      } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1;
        nextTick(updateFocus);
      }
    }
    useRender(() => createVNode(props.tag, {
      "ref": resizeRef,
      "class": normalizeClass(["v-pagination", themeClasses.value, props.class]),
      "style": normalizeStyle(props.style),
      "role": "navigation",
      "aria-label": t(props.ariaLabel),
      "onKeydown": onKeydown,
      "data-test": "v-pagination-root"
    }, {
      default: () => [createElementVNode("ul", {
        "class": "v-pagination__list"
      }, [props.showFirstLastPage && createElementVNode("li", {
        "key": "first",
        "class": "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [slots.first ? slots.first(controls.value.first) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.first), null)]), createElementVNode("li", {
        "key": "prev",
        "class": "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [slots.prev ? slots.prev(controls.value.prev) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.prev), null)]), items.value.map((item, index) => createElementVNode("li", {
        "key": item.key,
        "class": normalizeClass(["v-pagination__item", {
          "v-pagination__item--is-active": item.isActive
        }]),
        "data-test": "v-pagination-item"
      }, [slots.item ? slots.item(item) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, item.props), {
        default: () => [item.page]
      })])), createElementVNode("li", {
        "key": "next",
        "class": "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [slots.next ? slots.next(controls.value.next) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.next), null)]), props.showFirstLastPage && createElementVNode("li", {
        "key": "last",
        "class": "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [slots.last ? slots.last(controls.value.last) : createVNode(VBtn, mergeProps({
        "_as": "VPaginationBtn"
      }, controls.value.last), null)])])]
    }));
    return {};
  }
});
const makeDataTablePaginateProps = propsFactory({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  },
  pageBy: {
    type: String,
    default: "any"
  }
}, "DataTable-paginate");
const VDataTablePaginationSymbol = /* @__PURE__ */ Symbol.for("vuetify:data-table-pagination");
function createPagination(props) {
  const page = useProxiedModel(props, "page", void 0, (value) => Number(value ?? 1));
  const itemsPerPage = useProxiedModel(props, "itemsPerPage", void 0, (value) => Number(value ?? 10));
  return {
    page,
    itemsPerPage
  };
}
function providePagination(options) {
  const {
    page,
    itemsPerPage,
    itemsLength
  } = options;
  const startIndex = computed(() => {
    if (itemsPerPage.value === -1) return 0;
    return itemsPerPage.value * (page.value - 1);
  });
  const stopIndex = computed(() => {
    if (itemsPerPage.value === -1) return itemsLength.value;
    return Math.min(itemsLength.value, startIndex.value + itemsPerPage.value);
  });
  const pageCount = computed(() => {
    if (itemsPerPage.value === -1 || itemsLength.value === 0) return 1;
    return Math.ceil(itemsLength.value / itemsPerPage.value);
  });
  watch([page, pageCount], () => {
    if (page.value > pageCount.value) {
      page.value = pageCount.value;
    }
  });
  function setItemsPerPage(value) {
    itemsPerPage.value = value;
    page.value = 1;
  }
  function nextPage() {
    page.value = clamp(page.value + 1, 1, pageCount.value);
  }
  function prevPage() {
    page.value = clamp(page.value - 1, 1, pageCount.value);
  }
  function setPage(value) {
    page.value = clamp(value, 1, pageCount.value);
  }
  const data = {
    page,
    itemsPerPage,
    startIndex,
    stopIndex,
    pageCount,
    itemsLength,
    nextPage,
    prevPage,
    setPage,
    setItemsPerPage
  };
  provide(VDataTablePaginationSymbol, data);
  return data;
}
function usePagination() {
  const data = inject(VDataTablePaginationSymbol);
  if (!data) throw new Error("Missing pagination!");
  return data;
}
function usePaginatedItems(options) {
  const vm = getCurrentInstance("usePaginatedItems");
  const {
    items,
    startIndex,
    stopIndex,
    itemsPerPage
  } = options;
  const paginatedItems = computed(() => {
    if (itemsPerPage.value <= 0) return toValue(items);
    return toValue(items).slice(startIndex.value, stopIndex.value);
  });
  watch(paginatedItems, (val) => {
    vm.emit("update:currentItems", val);
  }, {
    immediate: true
  });
  return {
    paginatedItems
  };
}
function usePaginatedGroups(options) {
  const {
    sortedItems,
    paginate,
    group
  } = options;
  const pageBy = toValue(options.pageBy);
  if (pageBy === "item") {
    const {
      paginatedItems,
      pageCount,
      setItemsPerPage
    } = paginate(sortedItems);
    const {
      flatItems: paginatedItemsWithGroups
    } = group(paginatedItems);
    return {
      pageCount,
      setItemsPerPage,
      paginatedItems: paginatedItemsWithGroups
    };
  }
  if (pageBy === "group") {
    const {
      flatItems,
      groups
    } = group(sortedItems);
    const {
      paginatedItems: paginatedGroups,
      pageCount,
      setItemsPerPage
    } = paginate(groups);
    const paginatedItemsWithGroups = computed(() => {
      if (!paginatedGroups.value.length) return [];
      const firstGroupId = paginatedGroups.value.at(0).id;
      const lastGroupId = paginatedGroups.value.at(-1).id;
      const start = flatItems.value.findIndex((item) => item.type === "group" && item.id === firstGroupId);
      const lastGroupIndex = flatItems.value.findIndex((item) => item.type === "group" && item.id === lastGroupId);
      const stop = flatItems.value.findIndex((item, i) => i > lastGroupIndex && item.type === "group" && item.depth === 0);
      return flatItems.value.slice(start, stop === -1 ? void 0 : stop);
    });
    return {
      pageCount,
      setItemsPerPage,
      paginatedItems: paginatedItemsWithGroups
    };
  }
  if (pageBy === "any") {
    const {
      flatItems
    } = group(sortedItems);
    const {
      paginatedItems: paginatedItemsWithGroups,
      pageCount,
      setItemsPerPage
    } = paginate(flatItems);
    return {
      pageCount,
      setItemsPerPage,
      paginatedItems: paginatedItemsWithGroups
    };
  }
  throw new Error(`Unrecognized pagination target ${pageBy}`);
}
const makeVDataTableFooterProps = propsFactory({
  color: String,
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  firstIcon: {
    type: IconValue,
    default: "$first"
  },
  lastIcon: {
    type: IconValue,
    default: "$last"
  },
  itemsPerPageText: {
    type: String,
    default: "$vuetify.dataFooter.itemsPerPageText"
  },
  pageText: {
    type: String,
    default: "$vuetify.dataFooter.pageText"
  },
  firstPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.firstPage"
  },
  prevPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.prevPage"
  },
  nextPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.nextPage"
  },
  lastPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.lastPage"
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [{
      value: 10,
      title: "10"
    }, {
      value: 25,
      title: "25"
    }, {
      value: 50,
      title: "50"
    }, {
      value: 100,
      title: "100"
    }, {
      value: -1,
      title: "$vuetify.dataFooter.itemsPerPageAll"
    }]
  },
  showCurrentPage: Boolean
}, "VDataTableFooter");
const VDataTableFooter = genericComponent()({
  name: "VDataTableFooter",
  props: makeVDataTableFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      page,
      pageCount,
      startIndex,
      stopIndex,
      itemsLength,
      itemsPerPage,
      setItemsPerPage
    } = usePagination();
    const itemsPerPageOptions = computed(() => props.itemsPerPageOptions.map((option) => {
      if (typeof option === "number") {
        return {
          value: option,
          title: option === -1 ? t("$vuetify.dataFooter.itemsPerPageAll") : String(option)
        };
      }
      return {
        ...option,
        title: !isNaN(Number(option.title)) ? option.title : t(option.title)
      };
    }));
    useRender(() => {
      const paginationProps = VPagination.filterProps(props);
      return createElementVNode("div", {
        "class": "v-data-table-footer"
      }, [slots.prepend?.(), createElementVNode("div", {
        "class": "v-data-table-footer__items-per-page"
      }, [createElementVNode("span", null, [t(props.itemsPerPageText)]), createVNode(VSelect, {
        "items": itemsPerPageOptions.value,
        "itemColor": props.color,
        "modelValue": itemsPerPage.value,
        "onUpdate:modelValue": (v) => setItemsPerPage(Number(v)),
        "density": "compact",
        "variant": "outlined",
        "aria-label": t(props.itemsPerPageText),
        "hideDetails": true
      }, null)]), createElementVNode("div", {
        "class": "v-data-table-footer__info"
      }, [createElementVNode("div", null, [t(props.pageText, !itemsLength.value ? 0 : startIndex.value + 1, stopIndex.value, itemsLength.value)])]), createElementVNode("div", {
        "class": "v-data-table-footer__pagination"
      }, [createVNode(VPagination, mergeProps({
        "modelValue": page.value,
        "onUpdate:modelValue": ($event) => page.value = $event,
        "density": "comfortable",
        "firstAriaLabel": props.firstPageLabel,
        "lastAriaLabel": props.lastPageLabel,
        "length": pageCount.value,
        "nextAriaLabel": props.nextPageLabel,
        "previousAriaLabel": props.prevPageLabel,
        "rounded": true,
        "showFirstLastPage": true,
        "totalVisible": props.showCurrentPage ? 1 : 0,
        "variant": "plain"
      }, omit(paginationProps, ["color"])), null)])]);
    });
    return {};
  }
});
const VDataTableColumn = defineFunctionalComponent({
  align: {
    type: String,
    default: "start"
  },
  fixed: {
    type: [Boolean, String],
    default: false
  },
  fixedOffset: [Number, String],
  fixedEndOffset: [Number, String],
  height: [Number, String],
  lastFixed: Boolean,
  firstFixedEnd: Boolean,
  noPadding: Boolean,
  indent: [Number, String],
  empty: Boolean,
  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean
}, (props, _ref) => {
  let {
    slots
  } = _ref;
  const Tag = props.tag ?? "td";
  const fixedSide = typeof props.fixed === "string" ? props.fixed : props.fixed ? "start" : "none";
  return createVNode(Tag, {
    "class": normalizeClass(["v-data-table__td", {
      "v-data-table-column--fixed": fixedSide === "start",
      "v-data-table-column--fixed-end": fixedSide === "end",
      "v-data-table-column--last-fixed": props.lastFixed,
      "v-data-table-column--first-fixed-end": props.firstFixedEnd,
      "v-data-table-column--no-padding": props.noPadding,
      "v-data-table-column--nowrap": props.nowrap,
      "v-data-table-column--empty": props.empty
    }, `v-data-table-column--align-${props.align}`]),
    "style": {
      height: convertToUnit(props.height),
      width: convertToUnit(props.width),
      maxWidth: convertToUnit(props.maxWidth),
      left: fixedSide === "start" ? convertToUnit(props.fixedOffset || null) : void 0,
      right: fixedSide === "end" ? convertToUnit(props.fixedEndOffset || null) : void 0,
      paddingInlineStart: props.indent ? convertToUnit(props.indent) : void 0
    }
  }, {
    default: () => [slots.default?.()]
  });
});
const makeDataTableHeaderProps = propsFactory({
  headers: Array
}, "DataTable-header");
const VDataTableHeadersSymbol = /* @__PURE__ */ Symbol.for("vuetify:data-table-headers");
const defaultHeader = {
  title: "",
  sortable: false
};
const defaultActionHeader = {
  ...defaultHeader,
  width: 48
};
function priorityQueue() {
  let arr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  const queue = arr.map((element) => ({
    element,
    priority: 0
  }));
  return {
    enqueue: (element, priority) => {
      let added = false;
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        if (item.priority > priority) {
          queue.splice(i, 0, {
            element,
            priority
          });
          added = true;
          break;
        }
      }
      if (!added) queue.push({
        element,
        priority
      });
    },
    size: () => queue.length,
    count: () => {
      let count = 0;
      if (!queue.length) return 0;
      const whole = Math.floor(queue[0].priority);
      for (let i = 0; i < queue.length; i++) {
        if (Math.floor(queue[i].priority) === whole) count += 1;
      }
      return count;
    },
    dequeue: () => {
      return queue.shift();
    }
  };
}
function extractLeaves(item) {
  let columns = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!item.children) {
    columns.push(item);
  } else {
    for (const child of item.children) {
      extractLeaves(child, columns);
    }
  }
  return columns;
}
function extractKeys(headers) {
  let keys = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const item of headers) {
    if (item.key) keys.add(item.key);
    if (item.children) {
      extractKeys(item.children, keys);
    }
  }
  return keys;
}
function getDefaultItem(item) {
  if (!item.key) return void 0;
  if (item.key === "data-table-group") return defaultHeader;
  if (["data-table-expand", "data-table-select"].includes(item.key)) return defaultActionHeader;
  return void 0;
}
function getDepth(item) {
  let depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!item.children) return depth;
  return Math.max(depth, ...item.children.map((child) => getDepth(child, depth + 1)));
}
function parseFixedColumns(items) {
  let seenFixed = false;
  function setFixed(item, side) {
    let parentFixedSide = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : "none";
    if (!item) return;
    if (parentFixedSide !== "none") {
      item.fixed = parentFixedSide;
    }
    if (item.fixed === true) {
      item.fixed = "start";
    }
    if (item.fixed === side) {
      if (item.children) {
        if (side === "start") {
          for (let i = item.children.length - 1; i >= 0; i--) {
            setFixed(item.children[i], side, side);
          }
        } else {
          for (let i = 0; i < item.children.length; i++) {
            setFixed(item.children[i], side, side);
          }
        }
      } else {
        if (!seenFixed && side === "start") {
          item.lastFixed = true;
        } else if (!seenFixed && side === "end") {
          item.firstFixedEnd = true;
        } else if (isNaN(Number(item.width))) {
          consoleError(`Multiple fixed columns should have a static width (key: ${item.key})`);
        } else {
          item.minWidth = Math.max(Number(item.width) || 0, Number(item.minWidth) || 0);
        }
        seenFixed = true;
      }
    } else {
      if (item.children) {
        if (side === "start") {
          for (let i = item.children.length - 1; i >= 0; i--) {
            setFixed(item.children[i], side);
          }
        } else {
          for (let i = 0; i < item.children.length; i++) {
            setFixed(item.children[i], side);
          }
        }
      } else {
        seenFixed = false;
      }
    }
  }
  for (let i = items.length - 1; i >= 0; i--) {
    setFixed(items[i], "start");
  }
  for (let i = 0; i < items.length; i++) {
    setFixed(items[i], "end");
  }
  let fixedOffset = 0;
  for (let i = 0; i < items.length; i++) {
    fixedOffset = setFixedOffset(items[i], fixedOffset);
  }
  let fixedEndOffset = 0;
  for (let i = items.length - 1; i >= 0; i--) {
    fixedEndOffset = setFixedEndOffset(items[i], fixedEndOffset);
  }
}
function setFixedOffset(item) {
  let offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!item) return offset;
  if (item.children) {
    item.fixedOffset = offset;
    for (const child of item.children) {
      offset = setFixedOffset(child, offset);
    }
  } else if (item.fixed && item.fixed !== "end") {
    item.fixedOffset = offset;
    offset += parseFloat(item.width || "0") || 0;
  }
  return offset;
}
function setFixedEndOffset(item) {
  let offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!item) return offset;
  if (item.children) {
    item.fixedEndOffset = offset;
    for (const child of item.children) {
      offset = setFixedEndOffset(child, offset);
    }
  } else if (item.fixed === "end") {
    item.fixedEndOffset = offset;
    offset += parseFloat(item.width || "0") || 0;
  }
  return offset;
}
function parse(items, maxDepth) {
  const headers = [];
  let currentDepth = 0;
  const queue = priorityQueue(items);
  while (queue.size() > 0) {
    let rowSize = queue.count();
    const row = [];
    let fraction = 1;
    while (rowSize > 0) {
      const {
        element: item,
        priority
      } = queue.dequeue();
      const diff = maxDepth - currentDepth - getDepth(item);
      row.push({
        ...item,
        rowspan: diff ?? 1,
        colspan: item.children ? extractLeaves(item).length : 1
      });
      if (item.children) {
        for (const child of item.children) {
          const sort = priority % 1 + fraction / Math.pow(10, currentDepth + 2);
          queue.enqueue(child, currentDepth + diff + sort);
        }
      }
      fraction += 1;
      rowSize -= 1;
    }
    currentDepth += 1;
    headers.push(row);
  }
  const columns = items.map((item) => extractLeaves(item)).flat();
  return {
    columns,
    headers
  };
}
function convertToInternalHeaders(items) {
  const internalHeaders = [];
  for (const item of items) {
    const defaultItem = {
      ...getDefaultItem(item),
      ...item
    };
    const key = defaultItem.key ?? (typeof defaultItem.value === "string" ? defaultItem.value : null);
    const value = defaultItem.value ?? key ?? null;
    const internalItem = {
      ...defaultItem,
      key,
      value,
      sortable: defaultItem.sortable ?? (defaultItem.key != null || !!defaultItem.sort),
      children: defaultItem.children ? convertToInternalHeaders(defaultItem.children) : void 0
    };
    internalHeaders.push(internalItem);
  }
  return internalHeaders;
}
function createHeaders(props, options) {
  const headers = ref([]);
  const columns = ref([]);
  const sortFunctions = ref({});
  const sortRawFunctions = ref({});
  const filterFunctions = ref({});
  watchEffect(() => {
    const _headers = props.headers || Object.keys(props.items[0] ?? {}).map((key) => ({
      key,
      title: capitalize(key)
    }));
    const items = _headers.slice();
    const keys = extractKeys(items);
    if (options?.groupBy?.value.length && !keys.has("data-table-group")) {
      items.unshift({
        key: "data-table-group",
        title: "Group"
      });
    }
    if (options?.showSelect?.value && !keys.has("data-table-select")) {
      items.unshift({
        key: "data-table-select"
      });
    }
    if (options?.showExpand?.value && !keys.has("data-table-expand")) {
      items.push({
        key: "data-table-expand"
      });
    }
    const internalHeaders = convertToInternalHeaders(items);
    parseFixedColumns(internalHeaders);
    const maxDepth = Math.max(...internalHeaders.map((item) => getDepth(item))) + 1;
    const parsed = parse(internalHeaders, maxDepth);
    headers.value = parsed.headers;
    columns.value = parsed.columns;
    const flatHeaders = parsed.headers.flat(1);
    for (const header of flatHeaders) {
      if (!header.key) continue;
      if (header.sortable) {
        if (header.sort) {
          sortFunctions.value[header.key] = header.sort;
        }
        if (header.sortRaw) {
          sortRawFunctions.value[header.key] = header.sortRaw;
        }
      }
      if (header.filter) {
        filterFunctions.value[header.key] = header.filter;
      }
    }
  });
  const data = {
    headers,
    columns,
    sortFunctions,
    sortRawFunctions,
    filterFunctions
  };
  provide(VDataTableHeadersSymbol, data);
  return data;
}
function useHeaders() {
  const data = inject(VDataTableHeadersSymbol);
  if (!data) throw new Error("Missing headers!");
  return data;
}
const singleSelectStrategy = {
  showSelectAll: false,
  allSelected: () => [],
  select: (_ref) => {
    let {
      items,
      value
    } = _ref;
    return new Set(value ? [items[0]?.value] : []);
  },
  selectAll: (_ref2) => {
    let {
      selected
    } = _ref2;
    return selected;
  }
};
const pageSelectStrategy = {
  showSelectAll: true,
  allSelected: (_ref3) => {
    let {
      currentPage
    } = _ref3;
    return currentPage;
  },
  select: (_ref4) => {
    let {
      items,
      value,
      selected
    } = _ref4;
    for (const item of items) {
      if (value) selected.add(item.value);
      else selected.delete(item.value);
    }
    return selected;
  },
  selectAll: (_ref5) => {
    let {
      value,
      currentPage,
      selected
    } = _ref5;
    return pageSelectStrategy.select({
      items: currentPage,
      value,
      selected
    });
  }
};
const allSelectStrategy = {
  showSelectAll: true,
  allSelected: (_ref6) => {
    let {
      allItems
    } = _ref6;
    return allItems;
  },
  select: (_ref7) => {
    let {
      items,
      value,
      selected
    } = _ref7;
    for (const item of items) {
      if (value) selected.add(item.value);
      else selected.delete(item.value);
    }
    return selected;
  },
  selectAll: (_ref8) => {
    let {
      value,
      allItems
    } = _ref8;
    return new Set(value ? allItems.map((item) => item.value) : []);
  }
};
const makeDataTableSelectProps = propsFactory({
  showSelect: Boolean,
  selectStrategy: {
    type: [String, Object],
    default: "page"
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  valueComparator: Function
}, "DataTable-select");
const VDataTableSelectionSymbol = /* @__PURE__ */ Symbol.for("vuetify:data-table-selection");
function provideSelection(props, _ref9) {
  let {
    allItems,
    currentPage
  } = _ref9;
  const selected = useProxiedModel(props, "modelValue", props.modelValue, (v) => {
    const customComparator = props.valueComparator;
    if (customComparator) {
      return new Set(wrapInArray(v).map((v2) => {
        return allItems.value.find((item) => customComparator(v2, item.value))?.value ?? v2;
      }));
    }
    return new Set(wrapInArray(v).map((v2) => {
      return isPrimitive(v2) ? allItems.value.find((item) => v2 === item.value)?.value ?? v2 : allItems.value.find((item) => deepEqual(v2, item.value))?.value ?? v2;
    }));
  }, (v) => {
    return [...v.values()];
  });
  const allSelectable = computed(() => allItems.value.filter((item) => item.selectable));
  const currentPageSelectable = computed(() => toValue(currentPage).filter((item) => item.selectable));
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === "object") return props.selectStrategy;
    switch (props.selectStrategy) {
      case "single":
        return singleSelectStrategy;
      case "all":
        return allSelectStrategy;
      case "page":
      default:
        return pageSelectStrategy;
    }
  });
  const lastSelectedIndex = shallowRef(null);
  function isSelected(items) {
    return wrapInArray(items).every((item) => selected.value.has(item.value));
  }
  function isSomeSelected(items) {
    return wrapInArray(items).some((item) => selected.value.has(item.value));
  }
  function select(items, value) {
    const newSelected = selectStrategy.value.select({
      items,
      value,
      selected: new Set(selected.value)
    });
    selected.value = newSelected;
  }
  function toggleSelect(item, index, event) {
    const items = [];
    const pageItems = toValue(currentPage);
    index = index ?? pageItems.findIndex((i) => i.value === item.value);
    if (props.selectStrategy !== "single" && event?.shiftKey && lastSelectedIndex.value !== null) {
      const [start, end] = [lastSelectedIndex.value, index].sort((a, b) => a - b);
      items.push(...pageItems.slice(start, end + 1).filter((item2) => item2.selectable));
    } else {
      items.push(item);
      lastSelectedIndex.value = index;
    }
    select(items, !isSelected([item]));
  }
  function selectAll(value) {
    const newSelected = selectStrategy.value.selectAll({
      value,
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value,
      selected: new Set(selected.value)
    });
    selected.value = newSelected;
  }
  const someSelected = computed(() => selected.value.size > 0);
  const allSelected = computed(() => {
    const items = selectStrategy.value.allSelected({
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value
    });
    return !!items.length && isSelected(items);
  });
  const showSelectAll = toRef(() => selectStrategy.value.showSelectAll);
  const data = {
    toggleSelect,
    select,
    selectAll,
    isSelected,
    isSomeSelected,
    someSelected,
    allSelected,
    showSelectAll,
    lastSelectedIndex,
    selectStrategy
  };
  provide(VDataTableSelectionSymbol, data);
  return data;
}
function useSelection() {
  const data = inject(VDataTableSelectionSymbol);
  if (!data) throw new Error("Missing selection!");
  return data;
}
const makeDataTableSortProps = propsFactory({
  initialSortOrder: {
    type: String,
    default: "asc",
    validator: (v) => !v || ["asc", "desc"].includes(v)
  },
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: {
    type: [Boolean, Object],
    default: false
  },
  mustSort: Boolean
}, "DataTable-sort");
const VDataTableSortSymbol = /* @__PURE__ */ Symbol.for("vuetify:data-table-sort");
function createSort(props) {
  const initialSortOrder = toRef(() => props.initialSortOrder);
  const sortBy = useProxiedModel(props, "sortBy");
  const mustSort = toRef(() => props.mustSort);
  const multiSort = toRef(() => props.multiSort);
  return {
    initialSortOrder,
    sortBy,
    multiSort,
    mustSort
  };
}
function resolveMultiSort(multiSort, event) {
  if (!isObject(multiSort)) {
    return {
      active: !!multiSort
    };
  }
  const {
    key,
    mode,
    modifier
  } = multiSort;
  const reverseMode = modifier === "alt" && event?.altKey || modifier === "shift" && event?.shiftKey;
  return {
    active: !key || event?.ctrlKey || event?.metaKey || false,
    mode: reverseMode ? mode === "append" ? "prepend" : "append" : mode
  };
}
function provideSort(options) {
  const {
    initialSortOrder,
    sortBy,
    mustSort,
    multiSort,
    page
  } = options;
  const toggleSort = function(column, event) {
    let mandatory = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    if (column.key == null) return;
    let newSortBy = sortBy.value.map((x) => ({
      ...x
    })) ?? [];
    const item = newSortBy.find((x) => x.key === column.key);
    const initialOrder = initialSortOrder.value;
    const secondaryOrder = initialSortOrder.value === "desc" ? "asc" : "desc";
    if (!item) {
      const {
        active,
        mode
      } = resolveMultiSort(multiSort.value, event);
      if (active) {
        if (mode === "prepend") {
          newSortBy.unshift({
            key: column.key,
            order: initialOrder
          });
        } else {
          newSortBy.push({
            key: column.key,
            order: initialOrder
          });
        }
      } else {
        newSortBy = [{
          key: column.key,
          order: initialOrder
        }];
      }
    } else if (item.order === secondaryOrder) {
      if (mandatory || mustSort.value && newSortBy.length === 1) {
        item.order = initialSortOrder.value;
      } else {
        newSortBy = newSortBy.filter((x) => x.key !== column.key);
      }
    } else {
      item.order = secondaryOrder;
    }
    sortBy.value = newSortBy;
    if (page) page.value = 1;
  };
  function isSorted(column) {
    return !!sortBy.value.find((item) => item.key === column.key);
  }
  const data = {
    sortBy,
    toggleSort,
    isSorted
  };
  provide(VDataTableSortSymbol, data);
  return data;
}
function useSort() {
  const data = inject(VDataTableSortSymbol);
  if (!data) throw new Error("Missing sort!");
  return data;
}
function useSortedItems(props, items, sortBy, options) {
  const locale = useLocale();
  const sortedItems = computed(() => {
    if (!sortBy.value.length) return items.value;
    return sortItems(items.value, sortBy.value, locale.current.value, {
      transform: options?.transform,
      sortFunctions: {
        ...props.customKeySort,
        ...options?.sortFunctions?.value
      },
      sortRawFunctions: options?.sortRawFunctions?.value
    });
  });
  return {
    sortedItems
  };
}
function sortItems(items, sortByItems, locale, options) {
  const stringCollator = new Intl.Collator(locale, {
    sensitivity: "accent",
    usage: "sort"
  });
  const transformedItems = items.map((item) => [item, options?.transform ? options.transform(item) : item]);
  return transformedItems.sort((a, b) => {
    for (let i = 0; i < sortByItems.length; i++) {
      let hasCustomResult = false;
      const sortKey = sortByItems[i].key;
      const sortOrder = sortByItems[i].order ?? "asc";
      if (sortOrder === false) continue;
      let sortA = getObjectValueByPath(a[1], sortKey);
      let sortB = getObjectValueByPath(b[1], sortKey);
      let sortARaw = a[0].raw;
      let sortBRaw = b[0].raw;
      if (sortOrder === "desc") {
        [sortA, sortB] = [sortB, sortA];
        [sortARaw, sortBRaw] = [sortBRaw, sortARaw];
      }
      if (options?.sortRawFunctions?.[sortKey]) {
        const customResult = options.sortRawFunctions[sortKey](sortARaw, sortBRaw);
        if (customResult == null) continue;
        hasCustomResult = true;
        if (customResult) return customResult;
      }
      if (options?.sortFunctions?.[sortKey]) {
        const customResult = options.sortFunctions[sortKey](sortA, sortB);
        if (customResult == null) continue;
        hasCustomResult = true;
        if (customResult) return customResult;
      }
      if (hasCustomResult) continue;
      if (sortA instanceof Date && sortB instanceof Date) {
        sortA = sortA.getTime();
        sortB = sortB.getTime();
      }
      [sortA, sortB] = [sortA, sortB].map((s) => s != null ? s.toString().toLocaleLowerCase() : s);
      if (sortA !== sortB) {
        if (isEmpty(sortA) && isEmpty(sortB)) return 0;
        if (isEmpty(sortA)) return -1;
        if (isEmpty(sortB)) return 1;
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB);
        return stringCollator.compare(sortA, sortB);
      }
    }
    return 0;
  }).map((_ref) => {
    let [item] = _ref;
    return item;
  });
}
const makeVDataTableHeadersProps = propsFactory({
  color: String,
  disableSort: Boolean,
  fixedHeader: Boolean,
  multiSort: Boolean,
  initialSortOrder: String,
  sortIcon: {
    type: IconValue
    // default: '$sort', // maybe in v4
  },
  sortAscIcon: {
    type: IconValue,
    default: "$sortAsc"
  },
  sortDescIcon: {
    type: IconValue,
    default: "$sortDesc"
  },
  headerProps: {
    type: Object
  },
  /** @deprecated */
  sticky: Boolean,
  ...makeDensityProps(),
  ...makeDisplayProps(),
  ...makeLoaderProps()
}, "VDataTableHeaders");
const VDataTableHeaders = genericComponent()({
  name: "VDataTableHeaders",
  props: makeVDataTableHeadersProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      toggleSort,
      sortBy,
      isSorted
    } = useSort();
    const {
      someSelected,
      allSelected,
      selectAll,
      showSelectAll
    } = useSelection();
    const {
      columns,
      headers
    } = useHeaders();
    const {
      loaderClasses
    } = useLoader(props);
    function getFixedStyles(column, y) {
      if (!(props.sticky || props.fixedHeader) && !column.fixed) return void 0;
      const fixedSide = typeof column.fixed === "string" ? column.fixed : column.fixed ? "start" : "none";
      return {
        position: "sticky",
        left: fixedSide === "start" ? convertToUnit(column.fixedOffset) : void 0,
        right: fixedSide === "end" ? convertToUnit(column.fixedEndOffset) : void 0,
        top: props.sticky || props.fixedHeader ? `calc(var(--v-table-header-height) * ${y})` : void 0
      };
    }
    function handleEnterKeyPress(event, column) {
      if (event.key === "Enter" && !props.disableSort) {
        toggleSort(column, event);
      }
    }
    function getSortIcon(column) {
      const item = sortBy.value.find((item2) => item2.key === column.key);
      switch (item?.order) {
        case "asc":
          return props.sortAscIcon;
        case "desc":
          return props.sortDescIcon;
        default:
          return props.sortIcon || (props.initialSortOrder === "asc" ? props.sortAscIcon : props.sortDescIcon);
      }
    }
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const slotProps = computed(() => ({
      headers: headers.value,
      columns: columns.value,
      toggleSort,
      isSorted,
      sortBy: sortBy.value,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      selectAll,
      getSortIcon
    }));
    const headerCellClasses = computed(() => ["v-data-table__th", {
      "v-data-table__th--sticky": props.sticky || props.fixedHeader
    }, displayClasses.value, loaderClasses.value]);
    const VDataTableHeaderCell = (_ref2) => {
      let {
        column,
        x,
        y
      } = _ref2;
      const noPadding = column.key === "data-table-select" || column.key === "data-table-expand";
      const isEmpty2 = column.key === "data-table-group" && column.width === 0 && !column.title;
      const headerProps = mergeProps(props.headerProps ?? {}, column.headerProps ?? {});
      return createVNode(VDataTableColumn, mergeProps({
        "tag": "th",
        "align": column.align,
        "class": [{
          "v-data-table__th--sortable": column.sortable && !props.disableSort,
          "v-data-table__th--sorted": isSorted(column),
          "v-data-table__th--fixed": column.fixed
        }, ...headerCellClasses.value],
        "style": {
          width: convertToUnit(column.width),
          minWidth: convertToUnit(column.minWidth),
          maxWidth: convertToUnit(column.maxWidth),
          ...getFixedStyles(column, y)
        },
        "colspan": column.colspan,
        "rowspan": column.rowspan,
        "fixed": column.fixed,
        "nowrap": column.nowrap,
        "lastFixed": column.lastFixed,
        "firstFixedEnd": column.firstFixedEnd,
        "noPadding": noPadding,
        "empty": isEmpty2,
        "tabindex": column.sortable ? 0 : void 0,
        "onClick": column.sortable ? (event) => toggleSort(column, event) : void 0,
        "onKeydown": column.sortable ? (event) => handleEnterKeyPress(event, column) : void 0
      }, headerProps), {
        default: () => {
          const columnSlotName = `header.${column.key}`;
          const columnSlotProps = {
            column,
            selectAll,
            isSorted,
            toggleSort,
            sortBy: sortBy.value,
            someSelected: someSelected.value,
            allSelected: allSelected.value,
            getSortIcon
          };
          if (slots[columnSlotName]) return slots[columnSlotName](columnSlotProps);
          if (isEmpty2) return "";
          if (column.key === "data-table-select") {
            return slots["header.data-table-select"]?.(columnSlotProps) ?? (showSelectAll.value && createVNode(VCheckboxBtn, {
              "color": props.color,
              "density": props.density,
              "modelValue": allSelected.value,
              "indeterminate": someSelected.value && !allSelected.value,
              "onUpdate:modelValue": selectAll
            }, null));
          }
          return createElementVNode("div", {
            "class": "v-data-table-header__content"
          }, [createElementVNode("span", null, [column.title]), column.sortable && !props.disableSort && createVNode(VIcon, {
            "key": "icon",
            "class": "v-data-table-header__sort-icon",
            "icon": getSortIcon(column)
          }, null), props.multiSort && isSorted(column) && createElementVNode("div", {
            "key": "badge",
            "class": normalizeClass(["v-data-table-header__sort-badge", ...backgroundColorClasses.value]),
            "style": normalizeStyle(backgroundColorStyles.value)
          }, [sortBy.value.findIndex((x2) => x2.key === column.key) + 1])]);
        }
      });
    };
    const VDataTableMobileHeaderCell = () => {
      const sortableColumns = computed(() => {
        return columns.value.filter((column) => column?.sortable && !props.disableSort);
      });
      const showSelectColumn = columns.value.find((column) => column.key === "data-table-select");
      const sortingChips = computed({
        get: () => sortableColumns.value.filter((_ref3) => {
          let {
            key
          } = _ref3;
          return sortBy.value.some((v) => v.key === key);
        }),
        set: (val) => {
          const sortedColumns = wrapInArray(val);
          const activeSortKeys = sortBy.value.map((v) => v.key);
          const newColumnsToSort = sortedColumns.filter((_ref4) => {
            let {
              key
            } = _ref4;
            return !activeSortKeys.includes(key);
          });
          newColumnsToSort.forEach((column) => toggleSort(column));
          nextTick(() => sortBy.value = sortBy.value.filter((_ref5) => {
            let {
              key
            } = _ref5;
            return sortedColumns.some((c) => c.key === key);
          }));
        }
      });
      return createVNode(VDataTableColumn, mergeProps({
        "tag": "th",
        "class": [...headerCellClasses.value],
        "colspan": headers.value.length + 1
      }, props.headerProps), {
        default: () => [createElementVNode("div", {
          "class": "v-data-table-header__content"
        }, [createVNode(VSelect, {
          "modelValue": sortingChips.value,
          "onUpdate:modelValue": ($event) => sortingChips.value = $event,
          "chips": true,
          "color": props.color,
          "class": "v-data-table__td-sort-select",
          "clearable": true,
          "density": "default",
          "items": sortableColumns.value,
          "label": t("$vuetify.dataTable.sortBy"),
          "multiple": props.multiSort,
          "variant": "underlined",
          "returnObject": true,
          "onClick:clear": () => sortBy.value = []
        }, {
          append: showSelectColumn ? () => createVNode(VCheckboxBtn, {
            "color": props.color,
            "density": "compact",
            "modelValue": allSelected.value,
            "indeterminate": someSelected.value && !allSelected.value,
            "onUpdate:modelValue": () => selectAll(!allSelected.value)
          }, null) : void 0,
          chip: (_ref6) => {
            let {
              item
            } = _ref6;
            return createVNode(VChip, {
              "onClick": item.raw.sortable ? () => toggleSort(item.raw, void 0, true) : void 0,
              "onMousedown": (e) => {
                e.preventDefault();
                e.stopPropagation();
              }
            }, {
              default: () => [item.title, createVNode(VIcon, {
                "class": normalizeClass(["v-data-table__td-sort-icon", isSorted(item.raw) && "v-data-table__td-sort-icon-active"]),
                "icon": getSortIcon(item.raw),
                "size": "small"
              }, null)]
            });
          }
        })])]
      });
    };
    useRender(() => {
      return mobile.value ? createElementVNode("tr", null, [createVNode(VDataTableMobileHeaderCell, null, null)]) : createElementVNode(Fragment, null, [slots.headers ? slots.headers(slotProps.value) : headers.value.map((row, y) => createElementVNode("tr", null, [row.map((column, x) => createVNode(VDataTableHeaderCell, {
        "column": column,
        "x": x,
        "y": y
      }, null))])), props.loading && createElementVNode("tr", {
        "class": "v-data-table-progress"
      }, [createElementVNode("th", {
        "colspan": columns.value.length
      }, [createVNode(LoaderSlot, {
        "name": "v-data-table-progress",
        "absolute": true,
        "active": true,
        "color": typeof props.loading === "boolean" || props.loading === "true" ? props.color : props.loading,
        "indeterminate": true
      }, {
        default: slots.loader
      })])])]);
    });
  }
});
const makeDataTableGroupProps = propsFactory({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group");
const VDataTableGroupSymbol = /* @__PURE__ */ Symbol.for("vuetify:data-table-group");
function createGroupBy(props) {
  const groupBy = useProxiedModel(props, "groupBy");
  return {
    groupBy
  };
}
function provideGroupBy(options) {
  const {
    disableSort,
    groupBy,
    sortBy
  } = options;
  const opened = ref(/* @__PURE__ */ new Set());
  const sortByWithGroups = computed(() => {
    return groupBy.value.map((val) => ({
      ...val,
      order: val.order ?? false
    })).concat(disableSort?.value ? [] : sortBy.value);
  });
  function isGroupOpen(group) {
    return opened.value.has(group.id);
  }
  function toggleGroup(group) {
    const newOpened = new Set(opened.value);
    if (!isGroupOpen(group)) newOpened.add(group.id);
    else newOpened.delete(group.id);
    opened.value = newOpened;
  }
  function extractRows(items) {
    function dive(group) {
      const arr = [];
      for (const item of group.items) {
        if ("type" in item && item.type === "group") {
          arr.push(...dive(item));
        } else {
          arr.push(item);
        }
      }
      return [...new Set(arr)];
    }
    return dive({
      items
    });
  }
  const data = {
    sortByWithGroups,
    toggleGroup,
    opened,
    groupBy,
    extractRows,
    isGroupOpen
  };
  provide(VDataTableGroupSymbol, data);
  return data;
}
function useGroupBy() {
  const data = inject(VDataTableGroupSymbol);
  if (!data) throw new Error("Missing group!");
  return data;
}
function groupItemsByProperty(items, groupBy) {
  if (!items.length) return [];
  const groups = /* @__PURE__ */ new Map();
  for (const item of items) {
    const value = getObjectValueByPath(item.raw, groupBy);
    if (!groups.has(value)) {
      groups.set(value, []);
    }
    groups.get(value).push(item);
  }
  return groups;
}
function groupItems(items, groupBy) {
  let depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  let prefix = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!groupBy.length) return [];
  const groupedItems = groupItemsByProperty(items, groupBy[0]);
  const groups = [];
  const rest = groupBy.slice(1);
  groupedItems.forEach((items2, value) => {
    const key = groupBy[0];
    const id = `${prefix}_${key}_${value}`;
    groups.push({
      depth,
      id,
      key,
      value,
      items: rest.length ? groupItems(items2, rest, depth + 1, id) : items2,
      type: "group"
    });
  });
  return groups;
}
function flattenItems(items, opened, hasSummary) {
  const flatItems = [];
  for (const item of items) {
    if ("type" in item && item.type === "group") {
      if (item.value != null) {
        flatItems.push(item);
      }
      if (opened.has(item.id) || item.value == null) {
        flatItems.push(...flattenItems(item.items, opened, hasSummary));
        if (hasSummary) {
          flatItems.push({
            ...item,
            type: "group-summary"
          });
        }
      }
    } else {
      flatItems.push(item);
    }
  }
  return flatItems;
}
function useGroupedItems(items, groupBy, opened, hasSummary) {
  const groups = computed(() => {
    if (!groupBy.value.length) return [];
    return groupItems(toValue(items), groupBy.value.map((item) => item.key));
  });
  const flatItems = computed(() => {
    if (!groupBy.value.length) return toValue(items);
    return flattenItems(groups.value, opened.value, toValue(hasSummary));
  });
  return {
    groups,
    flatItems
  };
}
const makeVDataTableGroupHeaderRowProps = propsFactory({
  item: {
    type: Object,
    required: true
  },
  groupCollapseIcon: {
    type: IconValue,
    default: "$tableGroupCollapse"
  },
  groupExpandIcon: {
    type: IconValue,
    default: "$tableGroupExpand"
  },
  ...makeDensityProps()
}, "VDataTableGroupHeaderRow");
const VDataTableGroupHeaderRow = genericComponent()({
  name: "VDataTableGroupHeaderRow",
  props: makeVDataTableGroupHeaderRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isGroupOpen,
      toggleGroup,
      extractRows
    } = useGroupBy();
    const {
      isSelected,
      isSomeSelected,
      select
    } = useSelection();
    const {
      columns
    } = useHeaders();
    const rows = computed(() => {
      return extractRows([props.item]);
    });
    const colspan = toRef(() => columns.value.length - (columns.value.some((c) => c.key === "data-table-select") ? 1 : 0));
    return () => createElementVNode("tr", {
      "class": "v-data-table-group-header-row",
      "style": {
        "--v-data-table-group-header-row-depth": props.item.depth
      }
    }, [columns.value.map((column) => {
      if (column.key === "data-table-group") {
        const icon = isGroupOpen(props.item) ? props.groupCollapseIcon : props.groupExpandIcon;
        const onClick = () => toggleGroup(props.item);
        return slots["data-table-group"]?.({
          item: props.item,
          count: rows.value.length,
          props: {
            icon,
            onClick
          }
        }) ?? createVNode(VDataTableColumn, {
          "class": "v-data-table-group-header-row__column",
          "colspan": colspan.value
        }, {
          default: () => [createVNode(VBtn, {
            "size": "small",
            "variant": "text",
            "icon": icon,
            "onClick": onClick
          }, null), createElementVNode("span", null, [props.item.value]), createElementVNode("span", null, [createTextVNode("("), rows.value.length, createTextVNode(")")])]
        });
      } else if (column.key === "data-table-select") {
        const selectableRows = rows.value.filter((x) => x.selectable);
        const modelValue = selectableRows.length > 0 && isSelected(selectableRows);
        const indeterminate = isSomeSelected(selectableRows) && !modelValue;
        const selectGroup = (v) => select(selectableRows, v);
        return slots["data-table-select"]?.({
          props: {
            modelValue,
            indeterminate,
            "onUpdate:modelValue": selectGroup
          }
        }) ?? createVNode(VDataTableColumn, {
          "class": "v-data-table__td--select-row",
          "noPadding": true
        }, {
          default: () => [createVNode(VCheckboxBtn, {
            "density": props.density,
            "disabled": selectableRows.length === 0,
            "modelValue": modelValue,
            "indeterminate": indeterminate,
            "onUpdate:modelValue": selectGroup
          }, null)]
        });
      }
      return "";
    })]);
  }
});
const makeDataTableExpandProps = propsFactory({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand");
const VDataTableExpandedKey = /* @__PURE__ */ Symbol.for("vuetify:datatable:expanded");
function provideExpanded(props) {
  const expandOnClick = toRef(() => props.expandOnClick);
  const expanded = useProxiedModel(props, "expanded", props.expanded, (v) => {
    return new Set(v);
  }, (v) => {
    return [...v.values()];
  });
  function expand(item, value) {
    const newExpanded = new Set(expanded.value);
    const rawValue = toRaw(item.value);
    if (!value) {
      const item2 = [...expanded.value].find((x) => toRaw(x) === rawValue);
      newExpanded.delete(item2);
    } else {
      newExpanded.add(rawValue);
    }
    expanded.value = newExpanded;
  }
  function isExpanded(item) {
    const rawValue = toRaw(item.value);
    return [...expanded.value].some((x) => toRaw(x) === rawValue);
  }
  function toggleExpand(item) {
    expand(item, !isExpanded(item));
  }
  const data = {
    expand,
    expanded,
    expandOnClick,
    isExpanded,
    toggleExpand
  };
  provide(VDataTableExpandedKey, data);
  return data;
}
function useExpanded() {
  const data = inject(VDataTableExpandedKey);
  if (!data) throw new Error("foo");
  return data;
}
const makeVDataTableRowProps = propsFactory({
  color: String,
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  onClick: EventProp(),
  onContextmenu: EventProp(),
  onDblclick: EventProp(),
  ...makeDensityProps(),
  ...makeDisplayProps()
}, "VDataTableRow");
const VDataTableRow = genericComponent()({
  name: "VDataTableRow",
  props: makeVDataTableRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      displayClasses,
      mobile
    } = useDisplay(props, "v-data-table__tr");
    const {
      isSelected,
      toggleSelect,
      someSelected,
      allSelected,
      selectAll
    } = useSelection();
    const {
      isExpanded,
      toggleExpand
    } = useExpanded();
    const {
      toggleSort,
      sortBy,
      isSorted
    } = useSort();
    const {
      columns
    } = useHeaders();
    useRender(() => createElementVNode("tr", {
      "class": normalizeClass(["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(props.onClick || props.onContextmenu || props.onDblclick)
      }, displayClasses.value]),
      "onClick": props.onClick,
      "onContextmenu": props.onContextmenu,
      "onDblclick": props.onDblclick
    }, [props.item && columns.value.map((column, i) => {
      const item = props.item;
      const slotName = `item.${column.key}`;
      const headerSlotName = `header.${column.key}`;
      const slotProps = {
        index: props.index,
        item: item.raw,
        internalItem: item,
        value: getObjectValueByPath(item.columns, column.key),
        column,
        isSelected,
        toggleSelect,
        isExpanded,
        toggleExpand
      };
      const columnSlotProps = {
        column,
        selectAll,
        isSorted,
        toggleSort,
        sortBy: sortBy.value,
        someSelected: someSelected.value,
        allSelected: allSelected.value,
        getSortIcon: () => ""
      };
      const cellProps = typeof props.cellProps === "function" ? props.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value,
        column
      }) : props.cellProps;
      const columnCellProps = typeof column.cellProps === "function" ? column.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value
      }) : column.cellProps;
      const noPadding = column.key === "data-table-select" || column.key === "data-table-expand";
      const isEmpty2 = column.key === "data-table-group" && column.width === 0 && !column.title;
      return createVNode(VDataTableColumn, mergeProps({
        "align": column.align,
        "indent": column.indent,
        "class": {
          "v-data-table__td--expanded-row": column.key === "data-table-expand",
          "v-data-table__td--select-row": column.key === "data-table-select"
        },
        "fixed": column.fixed,
        "fixedOffset": column.fixedOffset,
        "fixedEndOffset": column.fixedEndOffset,
        "lastFixed": column.lastFixed,
        "firstFixedEnd": column.firstFixedEnd,
        "maxWidth": !mobile.value ? column.maxWidth : void 0,
        "noPadding": noPadding,
        "empty": isEmpty2,
        "nowrap": column.nowrap,
        "width": !mobile.value ? column.width : void 0
      }, cellProps, columnCellProps), {
        default: () => {
          if (column.key === "data-table-select") {
            return slots["item.data-table-select"]?.({
              ...slotProps,
              props: {
                color: props.color,
                disabled: !item.selectable,
                modelValue: isSelected([item]),
                onClick: withModifiers(() => toggleSelect(item), ["stop"])
              }
            }) ?? createVNode(VCheckboxBtn, {
              "color": props.color,
              "disabled": !item.selectable,
              "density": props.density,
              "modelValue": isSelected([item]),
              "onClick": withModifiers((event) => toggleSelect(item, props.index, event), ["stop"])
            }, null);
          }
          if (column.key === "data-table-expand") {
            return slots["item.data-table-expand"]?.({
              ...slotProps,
              props: {
                icon: isExpanded(item) ? props.collapseIcon : props.expandIcon,
                size: "small",
                variant: "text",
                onClick: withModifiers(() => toggleExpand(item), ["stop"])
              }
            }) ?? createVNode(VBtn, {
              "icon": isExpanded(item) ? props.collapseIcon : props.expandIcon,
              "size": "small",
              "variant": "text",
              "onClick": withModifiers(() => toggleExpand(item), ["stop"])
            }, null);
          }
          if (slots[slotName] && !mobile.value) return slots[slotName](slotProps);
          const displayValue = toDisplayString(slotProps.value);
          return !mobile.value ? displayValue : createElementVNode(Fragment, null, [createElementVNode("div", {
            "class": "v-data-table__td-title"
          }, [slots[headerSlotName]?.(columnSlotProps) ?? column.title]), createElementVNode("div", {
            "class": "v-data-table__td-value"
          }, [slots[slotName]?.(slotProps) ?? displayValue])]);
        }
      });
    })]));
  }
});
const makeVDataTableRowsProps = propsFactory({
  color: String,
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: "$vuetify.dataIterator.loadingText"
  },
  hideNoData: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  ...pick(makeVDataTableRowProps(), ["collapseIcon", "expandIcon", "density"]),
  ...pick(makeVDataTableGroupHeaderRowProps(), ["groupCollapseIcon", "groupExpandIcon", "density"]),
  ...makeDisplayProps()
}, "VDataTableRows");
const VDataTableRows = genericComponent()({
  name: "VDataTableRows",
  inheritAttrs: false,
  props: makeVDataTableRowsProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      columns
    } = useHeaders();
    const {
      expandOnClick,
      toggleExpand,
      isExpanded
    } = useExpanded();
    const {
      isSelected,
      toggleSelect
    } = useSelection();
    const {
      toggleGroup,
      isGroupOpen
    } = useGroupBy();
    const {
      t
    } = useLocale();
    const {
      mobile
    } = useDisplay(props);
    useRender(() => {
      const groupHeaderRowProps = pick(props, ["groupCollapseIcon", "groupExpandIcon", "density"]);
      if (props.loading && (!props.items.length || slots.loading)) {
        return createElementVNode("tr", {
          "class": "v-data-table-rows-loading",
          "key": "loading"
        }, [createElementVNode("td", {
          "colspan": columns.value.length
        }, [slots.loading?.() ?? t(props.loadingText)])]);
      }
      if (!props.loading && !props.items.length && !props.hideNoData) {
        return createElementVNode("tr", {
          "class": "v-data-table-rows-no-data",
          "key": "no-data"
        }, [createElementVNode("td", {
          "colspan": columns.value.length
        }, [slots["no-data"]?.() ?? t(props.noDataText)])]);
      }
      return createElementVNode(Fragment, null, [props.items.map((item, index) => {
        if (item.type === "group") {
          const slotProps2 = {
            index,
            item,
            columns: columns.value,
            isExpanded,
            toggleExpand,
            isSelected,
            toggleSelect,
            toggleGroup,
            isGroupOpen
          };
          return slots["group-header"] ? slots["group-header"](slotProps2) : createVNode(VDataTableGroupHeaderRow, mergeProps({
            "key": `group-header_${item.id}`,
            "item": item
          }, getPrefixedEventHandlers(attrs, ":groupHeader", () => slotProps2), groupHeaderRowProps), slots);
        }
        if (item.type === "group-summary") {
          const slotProps2 = {
            index,
            item,
            columns: columns.value,
            toggleGroup
          };
          return slots["group-summary"]?.(slotProps2) ?? "";
        }
        const slotProps = {
          index: item.virtualIndex ?? index,
          item: item.raw,
          internalItem: item,
          columns: columns.value,
          isExpanded,
          toggleExpand,
          isSelected,
          toggleSelect
        };
        const itemSlotProps = {
          ...slotProps,
          props: mergeProps({
            key: `item_${item.key ?? item.index}`,
            onClick: expandOnClick.value ? () => {
              toggleExpand(item);
            } : void 0,
            index,
            item,
            color: props.color,
            cellProps: props.cellProps,
            collapseIcon: props.collapseIcon,
            expandIcon: props.expandIcon,
            density: props.density,
            mobile: mobile.value
          }, getPrefixedEventHandlers(attrs, ":row", () => slotProps), typeof props.rowProps === "function" ? props.rowProps({
            item: slotProps.item,
            index: slotProps.index,
            internalItem: slotProps.internalItem
          }) : props.rowProps)
        };
        return createElementVNode(Fragment, {
          "key": itemSlotProps.props.key
        }, [slots.item ? slots.item(itemSlotProps) : createVNode(VDataTableRow, itemSlotProps.props, slots), isExpanded(item) && slots["expanded-row"]?.(slotProps)]);
      })]);
    });
    return {};
  }
});
const makeVTableProps = propsFactory({
  fixedHeader: Boolean,
  fixedFooter: Boolean,
  height: [Number, String],
  hover: Boolean,
  striped: {
    type: String,
    default: null,
    validator: (v) => ["even", "odd"].includes(v)
  },
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VTable");
const VTable = genericComponent()({
  name: "VTable",
  props: makeVTableProps(),
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const {
      themeClasses
    } = provideTheme(props);
    const {
      densityClasses
    } = useDensity(props);
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-table", {
        "v-table--fixed-height": !!props.height,
        "v-table--fixed-header": props.fixedHeader,
        "v-table--fixed-footer": props.fixedFooter,
        "v-table--has-top": !!slots.top,
        "v-table--has-bottom": !!slots.bottom,
        "v-table--hover": props.hover,
        "v-table--striped-even": props.striped === "even",
        "v-table--striped-odd": props.striped === "odd"
      }, themeClasses.value, densityClasses.value, props.class]),
      "style": normalizeStyle(props.style)
    }, {
      default: () => [slots.top?.(), slots.default ? createElementVNode("div", {
        "class": "v-table__wrapper",
        "style": {
          height: convertToUnit(props.height)
        }
      }, [createElementVNode("table", null, [slots.default()])]) : slots.wrapper?.(), slots.bottom?.()]
    }));
    return {};
  }
});
const makeDataTableItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: [String, Array, Function],
    default: "id"
  },
  itemSelectable: {
    type: [String, Array, Function],
    default: null
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  returnObject: Boolean
}, "DataTable-items");
function transformItem(props, item, index, columns) {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue);
  const selectable = getPropertyFromItem(item, props.itemSelectable, true);
  const itemColumns = columns.reduce((obj, column) => {
    if (column.key != null) obj[column.key] = getPropertyFromItem(item, column.value);
    return obj;
  }, {});
  return {
    type: "item",
    key: props.returnObject ? getPropertyFromItem(item, props.itemValue) : value,
    index,
    value,
    selectable,
    columns: itemColumns,
    raw: item
  };
}
function transformItems(props, items, columns) {
  return items.map((item, index) => transformItem(props, item, index, columns));
}
function useDataTableItems(props, columns) {
  const items = computed(() => transformItems(props, props.items, columns.value));
  return {
    items
  };
}
function useOptions(_ref) {
  let {
    page,
    itemsPerPage,
    sortBy,
    groupBy,
    search
  } = _ref;
  const vm = getCurrentInstance("VDataTable");
  const options = () => ({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    sortBy: sortBy.value,
    groupBy: groupBy.value,
    search: search.value
  });
  let oldOptions = null;
  watch(options, (value) => {
    if (deepEqual(oldOptions, value)) return;
    if (oldOptions && oldOptions.search !== value.search) {
      page.value = 1;
    }
    vm.emit("update:options", value);
    oldOptions = value;
  }, {
    deep: true,
    immediate: true
  });
}
const makeDataTableProps = propsFactory({
  ...makeVDataTableRowsProps(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeDataTableHeaderProps(),
  ...makeDataTableItemsProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...omit(makeVDataTableHeadersProps(), ["multiSort", "initialSortOrder"]),
  ...makeVTableProps()
}, "DataTable");
const makeVDataTableProps = propsFactory({
  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeFilterProps(),
  ...makeVDataTableFooterProps()
}, "VDataTable");
const VDataTable = genericComponent()({
  name: "VDataTable",
  props: makeVDataTableProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:page": (value) => true,
    "update:itemsPerPage": (value) => true,
    "update:sortBy": (value) => true,
    "update:options": (value) => true,
    "update:groupBy": (value) => true,
    "update:expanded": (value) => true,
    "update:currentItems": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      groupBy
    } = createGroupBy(props);
    const {
      initialSortOrder,
      sortBy,
      multiSort,
      mustSort
    } = createSort(props);
    const {
      page,
      itemsPerPage
    } = createPagination(props);
    const {
      disableSort
    } = toRefs(props);
    const {
      columns,
      headers,
      sortFunctions,
      sortRawFunctions,
      filterFunctions
    } = createHeaders(props, {
      groupBy,
      showSelect: toRef(() => props.showSelect),
      showExpand: toRef(() => props.showExpand)
    });
    const {
      items
    } = useDataTableItems(props, columns);
    const search = toRef(() => props.search);
    const {
      filteredItems
    } = useFilter(props, items, search, {
      transform: (item) => item.columns,
      customKeyFilter: filterFunctions
    });
    const {
      toggleSort
    } = provideSort({
      initialSortOrder,
      sortBy,
      multiSort,
      mustSort,
      page
    });
    const {
      sortByWithGroups,
      opened,
      extractRows,
      isGroupOpen,
      toggleGroup
    } = provideGroupBy({
      groupBy,
      sortBy,
      disableSort
    });
    const {
      sortedItems
    } = useSortedItems(props, filteredItems, sortByWithGroups, {
      transform: (item) => ({
        ...item.raw,
        ...item.columns
      }),
      sortFunctions,
      sortRawFunctions
    });
    const pageBy = computed(() => {
      if (props.pageBy === "auto") {
        return props.groupBy.length ? "group" : "item";
      }
      return props.pageBy;
    });
    const {
      pageCount,
      setItemsPerPage,
      paginatedItems
    } = usePaginatedGroups({
      pageBy,
      sortedItems,
      paginate: (items2) => {
        const itemsLength = computed(() => toValue(items2).length);
        const {
          startIndex,
          stopIndex,
          pageCount: pageCount2,
          setItemsPerPage: setItemsPerPage2
        } = providePagination({
          page,
          itemsPerPage,
          itemsLength
        });
        const {
          paginatedItems: paginatedItems2
        } = usePaginatedItems({
          items: items2,
          startIndex,
          stopIndex,
          itemsPerPage
        });
        return {
          paginatedItems: paginatedItems2,
          pageCount: pageCount2,
          setItemsPerPage: setItemsPerPage2
        };
      },
      group: (items2) => useGroupedItems(items2, groupBy, opened, () => !!slots["group-summary"])
    });
    const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value));
    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
      someSelected,
      allSelected
    } = provideSelection(props, {
      allItems: items,
      currentPage: paginatedItemsWithoutGroups
    });
    const {
      isExpanded,
      toggleExpand
    } = provideExpanded(props);
    useOptions({
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search
    });
    provideDefaults({
      VDataTableRows: {
        hideNoData: toRef(() => props.hideNoData),
        noDataText: toRef(() => props.noDataText),
        loading: toRef(() => props.loading),
        loadingText: toRef(() => props.loadingText)
      }
    });
    const slotProps = computed(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      pageCount: pageCount.value,
      toggleSort,
      setItemsPerPage,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: paginatedItemsWithoutGroups.value.map((item) => item.raw),
      internalItems: paginatedItemsWithoutGroups.value,
      groupedItems: paginatedItems.value,
      columns: columns.value,
      headers: headers.value
    }));
    useRender(() => {
      const dataTableFooterProps = VDataTableFooter.filterProps(props);
      const dataTableHeadersProps = VDataTableHeaders.filterProps(omit(props, ["multiSort"]));
      const dataTableRowsProps = VDataTableRows.filterProps(props);
      const tableProps = VTable.filterProps(props);
      return createVNode(VTable, mergeProps({
        "class": ["v-data-table", {
          "v-data-table--show-select": props.showSelect,
          "v-data-table--loading": props.loading
        }, props.class],
        "style": props.style
      }, tableProps, {
        "fixedHeader": props.fixedHeader || props.sticky
      }), {
        top: () => slots.top?.(slotProps.value),
        default: () => slots.default ? slots.default(slotProps.value) : createElementVNode(Fragment, null, [slots.colgroup?.(slotProps.value), !props.hideDefaultHeader && createElementVNode("thead", {
          "key": "thead"
        }, [createVNode(VDataTableHeaders, mergeProps(dataTableHeadersProps, {
          "multiSort": !!props.multiSort
        }), slots)]), slots.thead?.(slotProps.value), !props.hideDefaultBody && createElementVNode("tbody", null, [slots["body.prepend"]?.(slotProps.value), slots.body ? slots.body(slotProps.value) : createVNode(VDataTableRows, mergeProps(attrs, dataTableRowsProps, {
          "items": paginatedItems.value
        }), slots), slots["body.append"]?.(slotProps.value)]), slots.tbody?.(slotProps.value), slots.tfoot?.(slotProps.value)]),
        bottom: () => slots.bottom ? slots.bottom(slotProps.value) : !props.hideDefaultFooter && createElementVNode(Fragment, null, [createVNode(VDivider, null, null), createVNode(VDataTableFooter, dataTableFooterProps, {
          prepend: slots["footer.prepend"]
        })])
      });
    });
    return {};
  }
});
const makeVFormProps = propsFactory({
  ...makeComponentProps(),
  ...makeFormProps()
}, "VForm");
const VForm = genericComponent()({
  name: "VForm",
  props: makeVFormProps(),
  emits: {
    "update:modelValue": (val) => true,
    submit: (e) => true
  },
  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const form = createForm(props);
    const formRef = ref();
    function onReset(e) {
      e.preventDefault();
      form.reset();
    }
    function onSubmit(_e) {
      const e = _e;
      const ready = form.validate();
      e.then = ready.then.bind(ready);
      e.catch = ready.catch.bind(ready);
      e.finally = ready.finally.bind(ready);
      emit("submit", e);
      if (!e.defaultPrevented) {
        ready.then((_ref2) => {
          let {
            valid
          } = _ref2;
          if (valid) {
            formRef.value?.submit();
          }
        });
      }
      e.preventDefault();
    }
    useRender(() => createElementVNode("form", {
      "ref": formRef,
      "class": normalizeClass(["v-form", props.class]),
      "style": normalizeStyle(props.style),
      "novalidate": true,
      "onReset": onReset,
      "onSubmit": onSubmit
    }, [slots.default?.(form)]));
    return forwardRefs(form, formRef);
  }
});
const text = `[error 409] 系所簡稱必須為唯一值，已有相同的系所簡稱。`;
const _sfc_main = {
  __name: "DataTableCRUD",
  __ssrInlineRender: true,
  props: {
    title: String,
    tableTitle: String,
    headers: Array,
    apiUrl: String,
    apiEndpoints: Object,
    formFields: Array,
    itemSingular: String
  },
  emits: ["field-updated", "on-edit"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const snackbar = ref(false);
    const props = __props;
    const items = ref([]);
    const search = ref("");
    const errorMessage = ref(null);
    const dialog = ref(false);
    const editedItem = ref({});
    const dialogType = ref("");
    const form = ref(null);
    const confirmDialog = ref(false);
    const confirmMessage = ref("");
    const itemToDelete = ref(null);
    __expose({ editedItem });
    const formTitle = computed(() => {
      return dialogType.value === "add" ? `新增${props.itemSingular}` : `編輯${props.itemSingular}`;
    });
    const filteredItems = computed(() => {
      if (!search.value) {
        return items.value;
      }
      const searchText = search.value.toLowerCase();
      return items.value.filter(
        (item) => Object.values(item).some(
          (value) => String(value).toLowerCase().includes(searchText)
        )
      );
    });
    const { $curridataAPI } = useNuxtApp();
    const fetchData = async () => {
      try {
        const response = await $curridataAPI.get(
          props.apiUrl + props.apiEndpoints.get
        );
        items.value = response.data;
      } catch (error) {
        console.error(error);
        errorMessage.value = "無法從 API 取得資料。";
      }
    };
    const openDialog = (type, item = {}) => {
      dialogType.value = type;
      editedItem.value = { ...item };
      if (type === "edit") {
        emit("on-edit", editedItem.value);
      }
      dialog.value = true;
    };
    const closeDialog = () => {
      dialog.value = false;
      editedItem.value = {};
      if (form.value) {
        form.value.resetValidation();
      }
    };
    const handleSelectUpdate = (key, value) => {
      emit("field-updated", { key, value });
    };
    const saveItem = async () => {
      const { valid } = await form.value.validate();
      if (!valid) {
        return;
      }
      const itemToSave = { ...editedItem.value };
      for (const field of props.formFields) {
        if (field.type === "select" && field["return-object"] && itemToSave[field.key] && typeof itemToSave[field.key] === "object") {
          itemToSave[field.key] = itemToSave[field.key][field["item-title"] || "NAME"];
        }
      }
      console.log("itemToSave", itemToSave);
      try {
        if (dialogType.value === "add") {
          console.log("create by itemToSave", itemToSave);
          await $curridataAPI.post(
            props.apiUrl + props.apiEndpoints.add,
            itemToSave
          );
        } else {
          const endpoint = props.apiEndpoints.update.replace("{id}", itemToSave.id);
          await $curridataAPI.put(props.apiUrl + endpoint, itemToSave);
        }
        closeDialog();
        await fetchData();
      } catch (error) {
        console.error(error);
        console.log(error.message);
        console.log(error.response.data.detail);
        snackbar.value = true;
        errorMessage.value = error.response?.data?.detail || "儲存資料失敗。";
      }
    };
    const deleteItem = (item) => {
      itemToDelete.value = item;
      confirmMessage.value = `確定要刪除${props.itemSingular} ${item[props.headers[1].value]} 嗎？`;
      confirmDialog.value = true;
    };
    const confirmDelete = async () => {
      const item = itemToDelete.value;
      if (!item || !item.id) {
        errorMessage.value = `刪除失敗：無效的${props.itemSingular} id。`;
        console.error("嘗試刪除一個沒有 id 的項目。");
        confirmDialog.value = false;
        return;
      }
      try {
        const endpoint = props.apiEndpoints.delete.replace("{id}", item.id);
        await $curridataAPI.delete(props.apiUrl + endpoint);
        await fetchData();
        confirmDialog.value = false;
      } catch (error) {
        console.error(error);
        errorMessage.value = error.response?.data?.detail || "刪除資料失敗。";
        confirmDialog.value = false;
      }
    };
    const cancelDelete = () => {
      confirmDialog.value = false;
      itemToDelete.value = null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div data-v-0bf153b1><h2 data-v-0bf153b1>${ssrInterpolate(__props.title)}</h2>`);
      if (errorMessage.value) {
        _push(`<div class="text-red-500" data-v-0bf153b1><p data-v-0bf153b1>${ssrInterpolate(errorMessage.value)}</p></div>`);
      } else {
        _push(ssrRenderComponent(VCard, { class: "mt-4" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VCardTitle, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="d-flex ga-4 justify-space-between align-center w-100" data-v-0bf153b1${_scopeId2}><span data-v-0bf153b1${_scopeId2}>${ssrInterpolate(__props.tableTitle)}</span><div class="d-flex ga-4 align-center" data-v-0bf153b1${_scopeId2}>`);
                    _push3(ssrRenderComponent(VBtn, {
                      color: "primary",
                      "prepend-icon": "mdi-plus-circle",
                      onClick: ($event) => openDialog("add"),
                      height: "40"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` 新增${ssrInterpolate(__props.itemSingular)}`);
                        } else {
                          return [
                            createTextVNode(" 新增" + toDisplayString(__props.itemSingular), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VTextField, {
                      modelValue: search.value,
                      "onUpdate:modelValue": ($event) => search.value = $event,
                      label: "輸入關鍵字查詢",
                      "prepend-inner-icon": "mdi-magnify",
                      variant: "outlined",
                      "hide-details": "",
                      "single-line": "",
                      class: "search-field"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "d-flex ga-4 justify-space-between align-center w-100" }, [
                        createVNode("span", null, toDisplayString(__props.tableTitle), 1),
                        createVNode("div", { class: "d-flex ga-4 align-center" }, [
                          createVNode(VBtn, {
                            color: "primary",
                            "prepend-icon": "mdi-plus-circle",
                            onClick: ($event) => openDialog("add"),
                            height: "40"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" 新增" + toDisplayString(__props.itemSingular), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VTextField, {
                            modelValue: search.value,
                            "onUpdate:modelValue": ($event) => search.value = $event,
                            label: "輸入關鍵字查詢",
                            "prepend-inner-icon": "mdi-magnify",
                            variant: "outlined",
                            "hide-details": "",
                            "single-line": "",
                            class: "search-field"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VDataTable, {
                headers: __props.headers,
                items: filteredItems.value,
                class: "elevation-10"
              }, {
                "item.actions": withCtx(({ item }, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VIcon, {
                      class: "me-2",
                      size: "small",
                      onClick: ($event) => openDialog("edit", item)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` mdi-pencil `);
                        } else {
                          return [
                            createTextVNode(" mdi-pencil ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VIcon, {
                      size: "small",
                      onClick: ($event) => deleteItem(item)
                    }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` mdi-delete `);
                        } else {
                          return [
                            createTextVNode(" mdi-delete ")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VIcon, {
                        class: "me-2",
                        size: "small",
                        onClick: ($event) => openDialog("edit", item)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" mdi-pencil ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VIcon, {
                        size: "small",
                        onClick: ($event) => deleteItem(item)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" mdi-delete ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VCardTitle, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "d-flex ga-4 justify-space-between align-center w-100" }, [
                      createVNode("span", null, toDisplayString(__props.tableTitle), 1),
                      createVNode("div", { class: "d-flex ga-4 align-center" }, [
                        createVNode(VBtn, {
                          color: "primary",
                          "prepend-icon": "mdi-plus-circle",
                          onClick: ($event) => openDialog("add"),
                          height: "40"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" 新增" + toDisplayString(__props.itemSingular), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VTextField, {
                          modelValue: search.value,
                          "onUpdate:modelValue": ($event) => search.value = $event,
                          label: "輸入關鍵字查詢",
                          "prepend-inner-icon": "mdi-magnify",
                          variant: "outlined",
                          "hide-details": "",
                          "single-line": "",
                          class: "search-field"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ])
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  headers: __props.headers,
                  items: filteredItems.value,
                  class: "elevation-10"
                }, {
                  "item.actions": withCtx(({ item }) => [
                    createVNode(VIcon, {
                      class: "me-2",
                      size: "small",
                      onClick: ($event) => openDialog("edit", item)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" mdi-pencil ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(VIcon, {
                      size: "small",
                      onClick: ($event) => deleteItem(item)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" mdi-delete ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["headers", "items"])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(ssrRenderComponent(VDialog, {
        modelValue: dialog.value,
        "onUpdate:modelValue": ($event) => dialog.value = $event,
        "max-width": "600px"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(formTitle.value)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(formTitle.value), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VContainer, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VForm, {
                                ref_key: "form",
                                ref: form
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VRow, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<!--[-->`);
                                          ssrRenderList(__props.formFields, (field) => {
                                            _push7(ssrRenderComponent(VCol, {
                                              key: field.key,
                                              cols: "12",
                                              sm: "6"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  if (field.type === "text") {
                                                    _push8(ssrRenderComponent(VTextField, {
                                                      modelValue: editedItem.value[field.key],
                                                      "onUpdate:modelValue": ($event) => editedItem.value[field.key] = $event,
                                                      label: field.label,
                                                      rules: field.rules,
                                                      readonly: field.readonly
                                                    }, null, _parent8, _scopeId7));
                                                  } else if (field.type === "select") {
                                                    _push8(ssrRenderComponent(VSelect, {
                                                      modelValue: editedItem.value[field.key],
                                                      "onUpdate:modelValue": [($event) => editedItem.value[field.key] = $event, ($event) => handleSelectUpdate(field.key, editedItem.value[field.key])],
                                                      items: field.items,
                                                      "item-title": field["item-title"],
                                                      "item-value": field["item-value"],
                                                      label: field.label,
                                                      rules: field.rules,
                                                      "return-object": field["return-object"]
                                                    }, null, _parent8, _scopeId7));
                                                  } else {
                                                    _push8(`<!---->`);
                                                  }
                                                } else {
                                                  return [
                                                    field.type === "text" ? (openBlock(), createBlock(VTextField, {
                                                      key: 0,
                                                      modelValue: editedItem.value[field.key],
                                                      "onUpdate:modelValue": ($event) => editedItem.value[field.key] = $event,
                                                      label: field.label,
                                                      rules: field.rules,
                                                      readonly: field.readonly
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules", "readonly"])) : field.type === "select" ? (openBlock(), createBlock(VSelect, {
                                                      key: 1,
                                                      modelValue: editedItem.value[field.key],
                                                      "onUpdate:modelValue": [($event) => editedItem.value[field.key] = $event, ($event) => handleSelectUpdate(field.key, editedItem.value[field.key])],
                                                      items: field.items,
                                                      "item-title": field["item-title"],
                                                      "item-value": field["item-value"],
                                                      label: field.label,
                                                      rules: field.rules,
                                                      "return-object": field["return-object"]
                                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "item-title", "item-value", "label", "rules", "return-object"])) : createCommentVNode("", true)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          });
                                          _push7(`<!--]-->`);
                                        } else {
                                          return [
                                            (openBlock(true), createBlock(Fragment, null, renderList(__props.formFields, (field) => {
                                              return openBlock(), createBlock(VCol, {
                                                key: field.key,
                                                cols: "12",
                                                sm: "6"
                                              }, {
                                                default: withCtx(() => [
                                                  field.type === "text" ? (openBlock(), createBlock(VTextField, {
                                                    key: 0,
                                                    modelValue: editedItem.value[field.key],
                                                    "onUpdate:modelValue": ($event) => editedItem.value[field.key] = $event,
                                                    label: field.label,
                                                    rules: field.rules,
                                                    readonly: field.readonly
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules", "readonly"])) : field.type === "select" ? (openBlock(), createBlock(VSelect, {
                                                    key: 1,
                                                    modelValue: editedItem.value[field.key],
                                                    "onUpdate:modelValue": [($event) => editedItem.value[field.key] = $event, ($event) => handleSelectUpdate(field.key, editedItem.value[field.key])],
                                                    items: field.items,
                                                    "item-title": field["item-title"],
                                                    "item-value": field["item-value"],
                                                    label: field.label,
                                                    rules: field.rules,
                                                    "return-object": field["return-object"]
                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "item-title", "item-value", "label", "rules", "return-object"])) : createCommentVNode("", true)
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VRow, null, {
                                        default: withCtx(() => [
                                          (openBlock(true), createBlock(Fragment, null, renderList(__props.formFields, (field) => {
                                            return openBlock(), createBlock(VCol, {
                                              key: field.key,
                                              cols: "12",
                                              sm: "6"
                                            }, {
                                              default: withCtx(() => [
                                                field.type === "text" ? (openBlock(), createBlock(VTextField, {
                                                  key: 0,
                                                  modelValue: editedItem.value[field.key],
                                                  "onUpdate:modelValue": ($event) => editedItem.value[field.key] = $event,
                                                  label: field.label,
                                                  rules: field.rules,
                                                  readonly: field.readonly
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules", "readonly"])) : field.type === "select" ? (openBlock(), createBlock(VSelect, {
                                                  key: 1,
                                                  modelValue: editedItem.value[field.key],
                                                  "onUpdate:modelValue": [($event) => editedItem.value[field.key] = $event, ($event) => handleSelectUpdate(field.key, editedItem.value[field.key])],
                                                  items: field.items,
                                                  "item-title": field["item-title"],
                                                  "item-value": field["item-value"],
                                                  label: field.label,
                                                  rules: field.rules,
                                                  "return-object": field["return-object"]
                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "item-title", "item-value", "label", "rules", "return-object"])) : createCommentVNode("", true)
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VForm, {
                                  ref_key: "form",
                                  ref: form
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VRow, null, {
                                      default: withCtx(() => [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.formFields, (field) => {
                                          return openBlock(), createBlock(VCol, {
                                            key: field.key,
                                            cols: "12",
                                            sm: "6"
                                          }, {
                                            default: withCtx(() => [
                                              field.type === "text" ? (openBlock(), createBlock(VTextField, {
                                                key: 0,
                                                modelValue: editedItem.value[field.key],
                                                "onUpdate:modelValue": ($event) => editedItem.value[field.key] = $event,
                                                label: field.label,
                                                rules: field.rules,
                                                readonly: field.readonly
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules", "readonly"])) : field.type === "select" ? (openBlock(), createBlock(VSelect, {
                                                key: 1,
                                                modelValue: editedItem.value[field.key],
                                                "onUpdate:modelValue": [($event) => editedItem.value[field.key] = $event, ($event) => handleSelectUpdate(field.key, editedItem.value[field.key])],
                                                items: field.items,
                                                "item-title": field["item-title"],
                                                "item-value": field["item-value"],
                                                label: field.label,
                                                rules: field.rules,
                                                "return-object": field["return-object"]
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "item-title", "item-value", "label", "rules", "return-object"])) : createCommentVNode("", true)
                                            ]),
                                            _: 2
                                          }, 1024);
                                        }), 128))
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 512)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VContainer, null, {
                            default: withCtx(() => [
                              createVNode(VForm, {
                                ref_key: "form",
                                ref: form
                              }, {
                                default: withCtx(() => [
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.formFields, (field) => {
                                        return openBlock(), createBlock(VCol, {
                                          key: field.key,
                                          cols: "12",
                                          sm: "6"
                                        }, {
                                          default: withCtx(() => [
                                            field.type === "text" ? (openBlock(), createBlock(VTextField, {
                                              key: 0,
                                              modelValue: editedItem.value[field.key],
                                              "onUpdate:modelValue": ($event) => editedItem.value[field.key] = $event,
                                              label: field.label,
                                              rules: field.rules,
                                              readonly: field.readonly
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules", "readonly"])) : field.type === "select" ? (openBlock(), createBlock(VSelect, {
                                              key: 1,
                                              modelValue: editedItem.value[field.key],
                                              "onUpdate:modelValue": [($event) => editedItem.value[field.key] = $event, ($event) => handleSelectUpdate(field.key, editedItem.value[field.key])],
                                              items: field.items,
                                              "item-title": field["item-title"],
                                              "item-value": field["item-value"],
                                              label: field.label,
                                              rules: field.rules,
                                              "return-object": field["return-object"]
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "item-title", "item-value", "label", "rules", "return-object"])) : createCommentVNode("", true)
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 512)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "blue-darken-1",
                          variant: "text",
                          onClick: closeDialog
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`取消`);
                            } else {
                              return [
                                createTextVNode("取消")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "blue-darken-1",
                          variant: "text",
                          onClick: saveItem
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`儲存`);
                            } else {
                              return [
                                createTextVNode("儲存")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            color: "blue-darken-1",
                            variant: "text",
                            onClick: closeDialog
                          }, {
                            default: withCtx(() => [
                              createTextVNode("取消")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            color: "blue-darken-1",
                            variant: "text",
                            onClick: saveItem
                          }, {
                            default: withCtx(() => [
                              createTextVNode("儲存")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(formTitle.value), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VContainer, null, {
                          default: withCtx(() => [
                            createVNode(VForm, {
                              ref_key: "form",
                              ref: form
                            }, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.formFields, (field) => {
                                      return openBlock(), createBlock(VCol, {
                                        key: field.key,
                                        cols: "12",
                                        sm: "6"
                                      }, {
                                        default: withCtx(() => [
                                          field.type === "text" ? (openBlock(), createBlock(VTextField, {
                                            key: 0,
                                            modelValue: editedItem.value[field.key],
                                            "onUpdate:modelValue": ($event) => editedItem.value[field.key] = $event,
                                            label: field.label,
                                            rules: field.rules,
                                            readonly: field.readonly
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules", "readonly"])) : field.type === "select" ? (openBlock(), createBlock(VSelect, {
                                            key: 1,
                                            modelValue: editedItem.value[field.key],
                                            "onUpdate:modelValue": [($event) => editedItem.value[field.key] = $event, ($event) => handleSelectUpdate(field.key, editedItem.value[field.key])],
                                            items: field.items,
                                            "item-title": field["item-title"],
                                            "item-value": field["item-value"],
                                            label: field.label,
                                            rules: field.rules,
                                            "return-object": field["return-object"]
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "item-title", "item-value", "label", "rules", "return-object"])) : createCommentVNode("", true)
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 512)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          color: "blue-darken-1",
                          variant: "text",
                          onClick: closeDialog
                        }, {
                          default: withCtx(() => [
                            createTextVNode("取消")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          color: "blue-darken-1",
                          variant: "text",
                          onClick: saveItem
                        }, {
                          default: withCtx(() => [
                            createTextVNode("儲存")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(formTitle.value), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VContainer, null, {
                        default: withCtx(() => [
                          createVNode(VForm, {
                            ref_key: "form",
                            ref: form
                          }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.formFields, (field) => {
                                    return openBlock(), createBlock(VCol, {
                                      key: field.key,
                                      cols: "12",
                                      sm: "6"
                                    }, {
                                      default: withCtx(() => [
                                        field.type === "text" ? (openBlock(), createBlock(VTextField, {
                                          key: 0,
                                          modelValue: editedItem.value[field.key],
                                          "onUpdate:modelValue": ($event) => editedItem.value[field.key] = $event,
                                          label: field.label,
                                          rules: field.rules,
                                          readonly: field.readonly
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "rules", "readonly"])) : field.type === "select" ? (openBlock(), createBlock(VSelect, {
                                          key: 1,
                                          modelValue: editedItem.value[field.key],
                                          "onUpdate:modelValue": [($event) => editedItem.value[field.key] = $event, ($event) => handleSelectUpdate(field.key, editedItem.value[field.key])],
                                          items: field.items,
                                          "item-title": field["item-title"],
                                          "item-value": field["item-value"],
                                          label: field.label,
                                          rules: field.rules,
                                          "return-object": field["return-object"]
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "item-title", "item-value", "label", "rules", "return-object"])) : createCommentVNode("", true)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 512)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        color: "blue-darken-1",
                        variant: "text",
                        onClick: closeDialog
                      }, {
                        default: withCtx(() => [
                          createTextVNode("取消")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        color: "blue-darken-1",
                        variant: "text",
                        onClick: saveItem
                      }, {
                        default: withCtx(() => [
                          createTextVNode("儲存")
                        ]),
                        _: 1
                      })
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
      _push(ssrRenderComponent(VDialog, {
        modelValue: confirmDialog.value,
        "onUpdate:modelValue": ($event) => confirmDialog.value = $event,
        "max-width": "400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "headline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`確認`);
                      } else {
                        return [
                          createTextVNode("確認")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(confirmMessage.value)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(confirmMessage.value), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "blue-darken-1",
                          variant: "text",
                          onClick: cancelDelete
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`取消`);
                            } else {
                              return [
                                createTextVNode("取消")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "blue-darken-1",
                          variant: "text",
                          onClick: confirmDelete
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`確定`);
                            } else {
                              return [
                                createTextVNode("確定")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            color: "blue-darken-1",
                            variant: "text",
                            onClick: cancelDelete
                          }, {
                            default: withCtx(() => [
                              createTextVNode("取消")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            color: "blue-darken-1",
                            variant: "text",
                            onClick: confirmDelete
                          }, {
                            default: withCtx(() => [
                              createTextVNode("確定")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "headline" }, {
                      default: withCtx(() => [
                        createTextVNode("確認")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(confirmMessage.value), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          color: "blue-darken-1",
                          variant: "text",
                          onClick: cancelDelete
                        }, {
                          default: withCtx(() => [
                            createTextVNode("取消")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          color: "blue-darken-1",
                          variant: "text",
                          onClick: confirmDelete
                        }, {
                          default: withCtx(() => [
                            createTextVNode("確定")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "headline" }, {
                    default: withCtx(() => [
                      createTextVNode("確認")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(confirmMessage.value), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        color: "blue-darken-1",
                        variant: "text",
                        onClick: cancelDelete
                      }, {
                        default: withCtx(() => [
                          createTextVNode("取消")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        color: "blue-darken-1",
                        variant: "text",
                        onClick: confirmDelete
                      }, {
                        default: withCtx(() => [
                          createTextVNode("確定")
                        ]),
                        _: 1
                      })
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
      _push(`</div>`);
      _push(ssrRenderComponent(VSnackbar, {
        modelValue: snackbar.value,
        "onUpdate:modelValue": ($event) => snackbar.value = $event,
        timeout: 2e3,
        color: "deep-orange-darken-1",
        location: "top center"
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              color: "pink",
              variant: "text",
              onClick: ($event) => snackbar.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Close `);
                } else {
                  return [
                    createTextVNode(" Close ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                color: "pink",
                variant: "text",
                onClick: ($event) => snackbar.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode(" Close ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(text)} `);
          } else {
            return [
              createTextVNode(toDisplayString(text) + " ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DataTableCRUD.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DataTableCRUD = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main, [["__scopeId", "data-v-0bf153b1"]]), { __name: "DataTableCRUD" });

export { DataTableCRUD as D };
//# sourceMappingURL=DataTableCRUD-2IFFTx0R.mjs.map
