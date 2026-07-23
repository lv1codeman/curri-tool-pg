import { ref, computed, watch, mergeProps, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, useId, toRef, normalizeStyle, normalizeClass, provide, createElementVNode, inject, withDirectives, vShow, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, u as useNuxtApp, g as genericComponent, c as useProxiedModel, f as filterInputAttrs, j as provideTheme, r as provideDefaults, p as propsFactory, o as omit, m as makeThemeProps, v as pick, I as IconValue } from './server.mjs';
import { V as VContainer } from './VContainer-BWwOr7CB.mjs';
import { V as VRow, a as VCol } from './VRow-BBOgihbN.mjs';
import { V as VCard } from './VCard-BqUhiF6T.mjs';
import { d as VBtnToggle, V as VBtn, u as useGroup, b as useGroupItem, e as makeGroupProps, c as makeGroupItemProps } from './VBtn-CygXX-_7.mjs';
import { V as VSelect, a as VCheckboxBtn, b as makeVCheckboxBtnProps } from './VSelect-Cq2H4SIe.mjs';
import { V as VTextField } from './VTextField-B7wWYftJ.mjs';
import { u as useFocus, V as VInput, c as makeVInputProps } from './autofocus-DcW6hXk9.mjs';
import { f as forwardRefs } from './forwardRefs-CJyhXHYH.mjs';
import { u as useRender, a as useDimension, m as makeTagProps, c as makeComponentProps, b as makeDimensionProps } from './dimensions-B7KURZuc.mjs';
import { V as VExpandTransition } from './index-Cr-Vuh5O.mjs';
import { u as useLazy, m as makeLazyProps } from './lazy-DuD9WWOI.mjs';
import { b as useBackgroundColor, r as useElevation, d as useRounded, p as VDefaultsProvider, R as Ripple, V as VIcon, f as makeRoundedProps, n as makeElevationProps } from './index-DVrSdyte.mjs';
import { V as VTextarea } from './VTextarea-Dd5Wf0dQ.mjs';
import { V as VSnackbar } from './VSnackbar-XEOvONhh.mjs';
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
import './VList-7bIncbX4.mjs';
import './VListItem-BmLTdZa_.mjs';
import './ssrBoot-ZQn7gOuX.mjs';
import './VDivider-BEUbRpXn.mjs';
import './VMenu-CPs0p4-G.mjs';
import './scopeId-BdYz0dQ0.mjs';
import './VSelectionControl-CKFGRvJp.mjs';
import './VChip-F7YMK5qF.mjs';
import './VSlideGroup-BHQ8mgNE.mjs';
import './focusTrap-hyPXUrgo.mjs';
import './layout-BYmWGd6C.mjs';

const makeVCheckboxProps = propsFactory({
  ...omit(makeVInputProps(), ["direction"]),
  ...omit(makeVCheckboxBtnProps(), ["inline"])
}, "VCheckbox");
const VCheckbox = genericComponent()({
  name: "VCheckbox",
  inheritAttrs: false,
  props: makeVCheckboxProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:focused": (focused) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const inputRef = ref();
    const uid = useId();
    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs);
      const inputProps = VInput.filterProps(props);
      const checkboxProps = VCheckboxBtn.filterProps(props);
      return createVNode(VInput, mergeProps({
        "ref": inputRef,
        "class": ["v-checkbox", props.class]
      }, rootAttrs, inputProps, {
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "id": props.id || `checkbox-${uid}`,
        "focused": isFocused.value,
        "style": props.style
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            messagesId,
            isDisabled,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VCheckboxBtn, mergeProps(checkboxProps, {
            "id": id.value,
            "aria-describedby": messagesId.value,
            "disabled": isDisabled.value,
            "readonly": isReadonly.value
          }, controlAttrs, {
            "error": isValid.value === false,
            "modelValue": model.value,
            "onUpdate:modelValue": ($event) => model.value = $event,
            "onFocus": focus,
            "onBlur": blur
          }), slots);
        }
      });
    });
    return forwardRefs({}, inputRef);
  }
});
const VExpansionPanelSymbol = /* @__PURE__ */ Symbol.for("vuetify:v-expansion-panel");
const makeVExpansionPanelTextProps = propsFactory({
  ...makeComponentProps(),
  ...makeLazyProps()
}, "VExpansionPanelText");
const VExpansionPanelText = genericComponent()({
  name: "VExpansionPanelText",
  props: makeVExpansionPanelTextProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject(VExpansionPanelSymbol);
    if (!expansionPanel) throw new Error("[Vuetify] v-expansion-panel-text needs to be placed inside v-expansion-panel");
    const {
      hasContent,
      onAfterLeave
    } = useLazy(props, expansionPanel.isSelected);
    useRender(() => createVNode(VExpandTransition, {
      "onAfterLeave": onAfterLeave
    }, {
      default: () => [withDirectives(createElementVNode("div", {
        "class": normalizeClass(["v-expansion-panel-text", props.class]),
        "style": normalizeStyle(props.style)
      }, [slots.default && hasContent.value && createElementVNode("div", {
        "class": "v-expansion-panel-text__wrapper"
      }, [slots.default?.()])]), [[vShow, expansionPanel.isSelected.value]])]
    }));
    return {};
  }
});
const makeVExpansionPanelTitleProps = propsFactory({
  color: String,
  expandIcon: {
    type: IconValue,
    default: "$expand"
  },
  collapseIcon: {
    type: IconValue,
    default: "$collapse"
  },
  hideActions: Boolean,
  focusable: Boolean,
  static: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: false
  },
  readonly: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps()
}, "VExpansionPanelTitle");
const VExpansionPanelTitle = genericComponent()({
  name: "VExpansionPanelTitle",
  directives: {
    vRipple: Ripple
  },
  props: makeVExpansionPanelTitleProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject(VExpansionPanelSymbol);
    if (!expansionPanel) throw new Error("[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel");
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.color);
    const {
      dimensionStyles
    } = useDimension(props);
    const slotProps = computed(() => ({
      collapseIcon: props.collapseIcon,
      disabled: expansionPanel.disabled.value,
      expanded: expansionPanel.isSelected.value,
      expandIcon: props.expandIcon,
      readonly: props.readonly
    }));
    const icon = toRef(() => expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon);
    useRender(() => withDirectives(createElementVNode("button", {
      "class": normalizeClass(["v-expansion-panel-title", {
        "v-expansion-panel-title--active": expansionPanel.isSelected.value,
        "v-expansion-panel-title--focusable": props.focusable,
        "v-expansion-panel-title--static": props.static
      }, backgroundColorClasses.value, props.class]),
      "style": normalizeStyle([backgroundColorStyles.value, dimensionStyles.value, props.style]),
      "type": "button",
      "tabindex": expansionPanel.disabled.value ? -1 : void 0,
      "disabled": expansionPanel.disabled.value,
      "aria-expanded": expansionPanel.isSelected.value,
      "onClick": !props.readonly ? expansionPanel.toggle : void 0
    }, [createElementVNode("span", {
      "class": "v-expansion-panel-title__overlay"
    }, null), slots.default?.(slotProps.value), !props.hideActions && createVNode(VDefaultsProvider, {
      "defaults": {
        VIcon: {
          icon: icon.value
        }
      }
    }, {
      default: () => [createElementVNode("span", {
        "class": "v-expansion-panel-title__icon"
      }, [slots.actions?.(slotProps.value) ?? createVNode(VIcon, null, null)])]
    })]), [[Ripple, props.ripple]]));
    return {};
  }
});
const makeVExpansionPanelProps = propsFactory({
  title: String,
  text: String,
  bgColor: String,
  ...makeElevationProps(),
  ...makeGroupItemProps(),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeVExpansionPanelTitleProps(),
  ...makeVExpansionPanelTextProps()
}, "VExpansionPanel");
const VExpansionPanel = genericComponent()({
  name: "VExpansionPanel",
  props: makeVExpansionPanelProps(),
  emits: {
    "group:selected": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const groupItem = useGroupItem(props, VExpansionPanelSymbol);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(() => props.bgColor);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props);
    const isDisabled = toRef(() => groupItem?.disabled.value || props.disabled);
    const selectedIndices = computed(() => groupItem.group.items.value.reduce((arr, item, index) => {
      if (groupItem.group.selected.value.includes(item.id)) arr.push(index);
      return arr;
    }, []));
    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === 1);
    });
    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.findIndex((item) => item.id === groupItem.id);
      return !groupItem.isSelected.value && selectedIndices.value.some((selectedIndex) => selectedIndex - index === -1);
    });
    provide(VExpansionPanelSymbol, groupItem);
    useRender(() => {
      const hasText = !!(slots.text || props.text);
      const hasTitle = !!(slots.title || props.title);
      const expansionPanelTitleProps = VExpansionPanelTitle.filterProps(props);
      const expansionPanelTextProps = VExpansionPanelText.filterProps(props);
      return createVNode(props.tag, {
        "class": normalizeClass(["v-expansion-panel", {
          "v-expansion-panel--active": groupItem.isSelected.value,
          "v-expansion-panel--before-active": isBeforeSelected.value,
          "v-expansion-panel--after-active": isAfterSelected.value,
          "v-expansion-panel--disabled": isDisabled.value
        }, roundedClasses.value, backgroundColorClasses.value, props.class]),
        "style": normalizeStyle([backgroundColorStyles.value, props.style])
      }, {
        default: () => [createElementVNode("div", {
          "class": normalizeClass(["v-expansion-panel__shadow", ...elevationClasses.value])
        }, null), createVNode(VDefaultsProvider, {
          "defaults": {
            VExpansionPanelTitle: {
              ...expansionPanelTitleProps
            },
            VExpansionPanelText: {
              ...expansionPanelTextProps
            }
          }
        }, {
          default: () => [hasTitle && createVNode(VExpansionPanelTitle, {
            "key": "title"
          }, {
            default: () => [slots.title ? slots.title() : props.title]
          }), hasText && createVNode(VExpansionPanelText, {
            "key": "text"
          }, {
            default: () => [slots.text ? slots.text() : props.text]
          }), slots.default?.()]
        })]
      });
    });
    return {
      groupItem
    };
  }
});
const allowedVariants = ["default", "accordion", "inset", "popout"];
const makeVExpansionPanelsProps = propsFactory({
  flat: Boolean,
  ...makeGroupProps(),
  ...pick(makeVExpansionPanelProps(), ["bgColor", "collapseIcon", "color", "eager", "elevation", "expandIcon", "focusable", "hideActions", "readonly", "ripple", "rounded", "tile", "static"]),
  ...makeThemeProps(),
  ...makeComponentProps(),
  ...makeTagProps(),
  variant: {
    type: String,
    default: "default",
    validator: (v) => allowedVariants.includes(v)
  }
}, "VExpansionPanels");
const VExpansionPanels = genericComponent()({
  name: "VExpansionPanels",
  props: makeVExpansionPanelsProps(),
  emits: {
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      next,
      prev
    } = useGroup(props, VExpansionPanelSymbol);
    const {
      themeClasses
    } = provideTheme(props);
    const variantClass = toRef(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
    provideDefaults({
      VExpansionPanel: {
        bgColor: toRef(() => props.bgColor),
        collapseIcon: toRef(() => props.collapseIcon),
        color: toRef(() => props.color),
        eager: toRef(() => props.eager),
        elevation: toRef(() => props.elevation),
        expandIcon: toRef(() => props.expandIcon),
        focusable: toRef(() => props.focusable),
        hideActions: toRef(() => props.hideActions),
        readonly: toRef(() => props.readonly),
        ripple: toRef(() => props.ripple),
        rounded: toRef(() => props.rounded),
        static: toRef(() => props.static)
      }
    });
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-expansion-panels", {
        "v-expansion-panels--flat": props.flat,
        "v-expansion-panels--tile": props.tile
      }, themeClasses.value, variantClass.value, props.class]),
      "style": normalizeStyle(props.style)
    }, {
      default: () => [slots.default?.({
        prev,
        next
      })]
    }));
    return {
      next,
      prev
    };
  }
});
const _sfc_main = {
  __name: "CopyDeptsDetails",
  __ssrInlineRender: true,
  setup(__props) {
    const { $curridataAPI } = useNuxtApp();
    const allDepts = ref([]);
    const selectedStype = ref("全部");
    const selectedColleges = ref([]);
    const selectedDeptIds = ref([]);
    const keyword = ref("");
    const mode = ref("email");
    const snackbar = ref(false);
    const stypeList = computed(() => {
      const base = [
        ...new Set(
          allDepts.value.map((d) => d.stype).filter((s) => s && s !== "未知")
        )
      ];
      return ["全部", ...base, "學士班+研究所", "學院+學士班+研究所"];
    });
    const baseDepts = computed(() => {
      return allDepts.value.filter((d) => d.college && d.college !== "未知").filter((d) => d.dept_s && d.dept_s !== "未知").filter((d) => {
        if (selectedStype.value === "全部") return true;
        if (selectedStype.value === "學士班+研究所") {
          return ["學士班", "研究所"].includes(d.stype);
        }
        if (selectedStype.value === "學院+學士班+研究所") {
          return ["學院", "學士班", "研究所"].includes(d.stype);
        }
        return d.stype === selectedStype.value;
      });
    });
    const collegeList = computed(() => [
      ...new Set(baseDepts.value.map((d) => d.college))
    ]);
    watch(
      collegeList,
      () => {
        selectedColleges.value = [...collegeList.value];
      },
      { immediate: true }
    );
    const filteredDepts = computed(
      () => baseDepts.value.filter((d) => selectedColleges.value.includes(d.college)).filter(
        (d) => keyword.value ? d.dept?.includes(keyword.value) || d.dept_s?.includes(keyword.value) : true
      )
    );
    watch(filteredDepts, (list) => {
      selectedDeptIds.value = list.map((d) => d.id);
    });
    const groupedDepts = computed(() => {
      const map = {};
      filteredDepts.value.forEach((d) => {
        if (!map[d.college]) map[d.college] = [];
        map[d.college].push(d);
      });
      return Object.keys(map).map((k) => ({
        college: k,
        items: map[k],
        count: map[k].length
      }));
    });
    const outputList = computed(() => {
      const list = filteredDepts.value.filter((d) => selectedDeptIds.value.includes(d.id)).map(
        (d) => mode.value === "email" ? d.agent_email?.toLowerCase() : d.agent_ext
      ).filter(Boolean);
      return [...new Set(list)];
    });
    const outputText = computed(() => outputList.value.join("\n"));
    const outputCount = computed(() => outputList.value.length);
    const selectAll = () => selectedDeptIds.value = filteredDepts.value.map((d) => d.id);
    const clearAll = () => selectedDeptIds.value = [];
    const invert = () => {
      selectedDeptIds.value = filteredDepts.value.map((d) => d.id).filter((id) => !selectedDeptIds.value.includes(id));
    };
    const selectAllColleges = () => selectedColleges.value = [...collegeList.value];
    const clearColleges = () => selectedColleges.value = [];
    const invertColleges = () => {
      selectedColleges.value = collegeList.value.filter(
        (c) => !selectedColleges.value.includes(c)
      );
    };
    const selectGroup = (g) => {
      const ids = g.items.map((d) => d.id);
      selectedDeptIds.value = [.../* @__PURE__ */ new Set([...selectedDeptIds.value, ...ids])];
    };
    const clearGroup = (g) => {
      const ids = g.items.map((d) => d.id);
      selectedDeptIds.value = selectedDeptIds.value.filter(
        (id) => !ids.includes(id)
      );
    };
    const copyResult = async () => {
      await (void 0).clipboard.writeText(outputText.value);
      snackbar.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ fluid: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="left-panel" data-v-45496bd1${_scopeId3}>`);
                        _push4(ssrRenderComponent(VCard, { class: "pa-4" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="d-flex align-baseline block-gap" data-v-45496bd1${_scopeId4}><h2 data-v-45496bd1${_scopeId4}>輸出格式</h2>`);
                              _push5(ssrRenderComponent(VBtnToggle, {
                                modelValue: mode.value,
                                "onUpdate:modelValue": ($event) => mode.value = $event,
                                mandatory: "",
                                class: "format-toggle ml-5"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, { value: "email" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Email`);
                                        } else {
                                          return [
                                            createTextVNode("Email")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, { value: "ext" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`分機`);
                                        } else {
                                          return [
                                            createTextVNode("分機")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, { value: "email" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Email")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VBtn, { value: "ext" }, {
                                        default: withCtx(() => [
                                          createTextVNode("分機")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="d-flex align-baseline block-gap" data-v-45496bd1${_scopeId4}><h2 style="${ssrRenderStyle({ "min-width": "90px" })}" data-v-45496bd1${_scopeId4}>輸出條件</h2><div class="d-flex ml-5 flex-grow-1" style="${ssrRenderStyle({ "gap": "20px" })}" data-v-45496bd1${_scopeId4}>`);
                              _push5(ssrRenderComponent(VSelect, {
                                label: "學制",
                                items: stypeList.value,
                                modelValue: selectedStype.value,
                                "onUpdate:modelValue": ($event) => selectedStype.value = $event,
                                density: "compact",
                                style: { "flex": "1" }
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTextField, {
                                modelValue: keyword.value,
                                "onUpdate:modelValue": ($event) => keyword.value = $event,
                                label: "搜尋",
                                density: "compact",
                                clearable: "",
                                style: { "flex": "2" }
                              }, null, _parent5, _scopeId4));
                              _push5(`</div></div><div class="d-flex justify-space-between block-gap" data-v-45496bd1${_scopeId4}><h2 data-v-45496bd1${_scopeId4}>學院</h2><span data-v-45496bd1${_scopeId4}>${ssrInterpolate(selectedColleges.value.length)} / ${ssrInterpolate(collegeList.value.length)}筆</span></div><div class="mb-3" data-v-45496bd1${_scopeId4}>`);
                              _push5(ssrRenderComponent(VBtn, {
                                class: "btn-op",
                                onClick: selectAllColleges
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`全選`);
                                  } else {
                                    return [
                                      createTextVNode("全選")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                class: "btn-op mx-1",
                                onClick: clearColleges
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`取消`);
                                  } else {
                                    return [
                                      createTextVNode("取消")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                class: "btn-op",
                                onClick: invertColleges
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`反選`);
                                  } else {
                                    return [
                                      createTextVNode("反選")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                              _push5(ssrRenderComponent(VRow, { class: "ma-0" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(collegeList.value, (c) => {
                                      _push6(ssrRenderComponent(VCol, {
                                        key: c,
                                        cols: "6",
                                        md: "4",
                                        class: "pa-0"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VCheckbox, {
                                              modelValue: selectedColleges.value,
                                              "onUpdate:modelValue": ($event) => selectedColleges.value = $event,
                                              label: c,
                                              value: c,
                                              density: "compact",
                                              "hide-details": "",
                                              class: "my-0"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VCheckbox, {
                                                modelValue: selectedColleges.value,
                                                "onUpdate:modelValue": ($event) => selectedColleges.value = $event,
                                                label: c,
                                                value: c,
                                                density: "compact",
                                                "hide-details": "",
                                                class: "my-0"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value"])
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(collegeList.value, (c) => {
                                        return openBlock(), createBlock(VCol, {
                                          key: c,
                                          cols: "6",
                                          md: "4",
                                          class: "pa-0"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VCheckbox, {
                                              modelValue: selectedColleges.value,
                                              "onUpdate:modelValue": ($event) => selectedColleges.value = $event,
                                              label: c,
                                              value: c,
                                              density: "compact",
                                              "hide-details": "",
                                              class: "my-0"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value"])
                                          ]),
                                          _: 2
                                        }, 1024);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "d-flex align-baseline block-gap" }, [
                                  createVNode("h2", null, "輸出格式"),
                                  createVNode(VBtnToggle, {
                                    modelValue: mode.value,
                                    "onUpdate:modelValue": ($event) => mode.value = $event,
                                    mandatory: "",
                                    class: "format-toggle ml-5"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, { value: "email" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Email")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VBtn, { value: "ext" }, {
                                        default: withCtx(() => [
                                          createTextVNode("分機")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "d-flex align-baseline block-gap" }, [
                                  createVNode("h2", { style: { "min-width": "90px" } }, "輸出條件"),
                                  createVNode("div", {
                                    class: "d-flex ml-5 flex-grow-1",
                                    style: { "gap": "20px" }
                                  }, [
                                    createVNode(VSelect, {
                                      label: "學制",
                                      items: stypeList.value,
                                      modelValue: selectedStype.value,
                                      "onUpdate:modelValue": ($event) => selectedStype.value = $event,
                                      density: "compact",
                                      style: { "flex": "1" }
                                    }, null, 8, ["items", "modelValue", "onUpdate:modelValue"]),
                                    createVNode(VTextField, {
                                      modelValue: keyword.value,
                                      "onUpdate:modelValue": ($event) => keyword.value = $event,
                                      label: "搜尋",
                                      density: "compact",
                                      clearable: "",
                                      style: { "flex": "2" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                createVNode("div", { class: "d-flex justify-space-between block-gap" }, [
                                  createVNode("h2", null, "學院"),
                                  createVNode("span", null, toDisplayString(selectedColleges.value.length) + " / " + toDisplayString(collegeList.value.length) + "筆", 1)
                                ]),
                                createVNode("div", { class: "mb-3" }, [
                                  createVNode(VBtn, {
                                    class: "btn-op",
                                    onClick: selectAllColleges
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("全選")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    class: "btn-op mx-1",
                                    onClick: clearColleges
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("取消")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    class: "btn-op",
                                    onClick: invertColleges
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("反選")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(VRow, { class: "ma-0" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(collegeList.value, (c) => {
                                      return openBlock(), createBlock(VCol, {
                                        key: c,
                                        cols: "6",
                                        md: "4",
                                        class: "pa-0"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VCheckbox, {
                                            modelValue: selectedColleges.value,
                                            "onUpdate:modelValue": ($event) => selectedColleges.value = $event,
                                            label: c,
                                            value: c,
                                            density: "compact",
                                            "hide-details": "",
                                            class: "my-0"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value"])
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCard, { class: "pa-3 d-flex flex-column mt-4 dept-card" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="d-flex justify-space-between mb-1" data-v-45496bd1${_scopeId4}><h2 data-v-45496bd1${_scopeId4}>系所清單</h2><span data-v-45496bd1${_scopeId4}>${ssrInterpolate(filteredDepts.value.length)}筆</span></div><div class="mb-2" data-v-45496bd1${_scopeId4}>`);
                              _push5(ssrRenderComponent(VBtn, {
                                class: "btn-op",
                                onClick: selectAll
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`全選`);
                                  } else {
                                    return [
                                      createTextVNode("全選")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                class: "btn-op mx-1",
                                onClick: clearAll
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`取消`);
                                  } else {
                                    return [
                                      createTextVNode("取消")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                class: "btn-op",
                                onClick: invert
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`反選`);
                                  } else {
                                    return [
                                      createTextVNode("反選")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="scroll flex-grow-1" data-v-45496bd1${_scopeId4}>`);
                              _push5(ssrRenderComponent(VExpansionPanels, { multiple: "" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(groupedDepts.value, (group) => {
                                      _push6(ssrRenderComponent(VExpansionPanel, {
                                        key: group.college
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VExpansionPanelTitle, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<div class="d-flex justify-space-between w-100" data-v-45496bd1${_scopeId7}><div data-v-45496bd1${_scopeId7}>${ssrInterpolate(group.college)}</div><div data-v-45496bd1${_scopeId7}>${ssrInterpolate(group.count)}筆</div></div>`);
                                                } else {
                                                  return [
                                                    createVNode("div", { class: "d-flex justify-space-between w-100" }, [
                                                      createVNode("div", null, toDisplayString(group.college), 1),
                                                      createVNode("div", null, toDisplayString(group.count) + "筆", 1)
                                                    ])
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(VExpansionPanelText, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`<div class="mb-2" data-v-45496bd1${_scopeId7}>`);
                                                  _push8(ssrRenderComponent(VBtn, {
                                                    class: "btn-op",
                                                    onClick: ($event) => selectGroup(group)
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`全選`);
                                                      } else {
                                                        return [
                                                          createTextVNode("全選")
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(ssrRenderComponent(VBtn, {
                                                    class: "btn-op mx-1",
                                                    onClick: ($event) => clearGroup(group)
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`取消`);
                                                      } else {
                                                        return [
                                                          createTextVNode("取消")
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                  _push8(`</div>`);
                                                  _push8(ssrRenderComponent(VRow, {
                                                    dense: "",
                                                    class: "ma-0"
                                                  }, {
                                                    default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                      if (_push9) {
                                                        _push9(`<!--[-->`);
                                                        ssrRenderList(group.items, (d) => {
                                                          _push9(ssrRenderComponent(VCol, {
                                                            key: d.id,
                                                            cols: "6",
                                                            md: "4",
                                                            class: "pa-0"
                                                          }, {
                                                            default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                              if (_push10) {
                                                                _push10(ssrRenderComponent(VCheckbox, {
                                                                  modelValue: selectedDeptIds.value,
                                                                  "onUpdate:modelValue": ($event) => selectedDeptIds.value = $event,
                                                                  value: d.id,
                                                                  label: d.dept_s + " - " + (d.agent_name || ""),
                                                                  density: "compact",
                                                                  "hide-details": "",
                                                                  class: "my-0"
                                                                }, null, _parent10, _scopeId9));
                                                              } else {
                                                                return [
                                                                  createVNode(VCheckbox, {
                                                                    modelValue: selectedDeptIds.value,
                                                                    "onUpdate:modelValue": ($event) => selectedDeptIds.value = $event,
                                                                    value: d.id,
                                                                    label: d.dept_s + " - " + (d.agent_name || ""),
                                                                    density: "compact",
                                                                    "hide-details": "",
                                                                    class: "my-0"
                                                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
                                                                ];
                                                              }
                                                            }),
                                                            _: 2
                                                          }, _parent9, _scopeId8));
                                                        });
                                                        _push9(`<!--]-->`);
                                                      } else {
                                                        return [
                                                          (openBlock(true), createBlock(Fragment, null, renderList(group.items, (d) => {
                                                            return openBlock(), createBlock(VCol, {
                                                              key: d.id,
                                                              cols: "6",
                                                              md: "4",
                                                              class: "pa-0"
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(VCheckbox, {
                                                                  modelValue: selectedDeptIds.value,
                                                                  "onUpdate:modelValue": ($event) => selectedDeptIds.value = $event,
                                                                  value: d.id,
                                                                  label: d.dept_s + " - " + (d.agent_name || ""),
                                                                  density: "compact",
                                                                  "hide-details": "",
                                                                  class: "my-0"
                                                                }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
                                                              ]),
                                                              _: 2
                                                            }, 1024);
                                                          }), 128))
                                                        ];
                                                      }
                                                    }),
                                                    _: 2
                                                  }, _parent8, _scopeId7));
                                                } else {
                                                  return [
                                                    createVNode("div", { class: "mb-2" }, [
                                                      createVNode(VBtn, {
                                                        class: "btn-op",
                                                        onClick: ($event) => selectGroup(group)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("全選")
                                                        ]),
                                                        _: 1
                                                      }, 8, ["onClick"]),
                                                      createVNode(VBtn, {
                                                        class: "btn-op mx-1",
                                                        onClick: ($event) => clearGroup(group)
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode("取消")
                                                        ]),
                                                        _: 1
                                                      }, 8, ["onClick"])
                                                    ]),
                                                    createVNode(VRow, {
                                                      dense: "",
                                                      class: "ma-0"
                                                    }, {
                                                      default: withCtx(() => [
                                                        (openBlock(true), createBlock(Fragment, null, renderList(group.items, (d) => {
                                                          return openBlock(), createBlock(VCol, {
                                                            key: d.id,
                                                            cols: "6",
                                                            md: "4",
                                                            class: "pa-0"
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(VCheckbox, {
                                                                modelValue: selectedDeptIds.value,
                                                                "onUpdate:modelValue": ($event) => selectedDeptIds.value = $event,
                                                                value: d.id,
                                                                label: d.dept_s + " - " + (d.agent_name || ""),
                                                                density: "compact",
                                                                "hide-details": "",
                                                                class: "my-0"
                                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
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
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VExpansionPanelTitle, null, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "d-flex justify-space-between w-100" }, [
                                                    createVNode("div", null, toDisplayString(group.college), 1),
                                                    createVNode("div", null, toDisplayString(group.count) + "筆", 1)
                                                  ])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(VExpansionPanelText, null, {
                                                default: withCtx(() => [
                                                  createVNode("div", { class: "mb-2" }, [
                                                    createVNode(VBtn, {
                                                      class: "btn-op",
                                                      onClick: ($event) => selectGroup(group)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("全選")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"]),
                                                    createVNode(VBtn, {
                                                      class: "btn-op mx-1",
                                                      onClick: ($event) => clearGroup(group)
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode("取消")
                                                      ]),
                                                      _: 1
                                                    }, 8, ["onClick"])
                                                  ]),
                                                  createVNode(VRow, {
                                                    dense: "",
                                                    class: "ma-0"
                                                  }, {
                                                    default: withCtx(() => [
                                                      (openBlock(true), createBlock(Fragment, null, renderList(group.items, (d) => {
                                                        return openBlock(), createBlock(VCol, {
                                                          key: d.id,
                                                          cols: "6",
                                                          md: "4",
                                                          class: "pa-0"
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(VCheckbox, {
                                                              modelValue: selectedDeptIds.value,
                                                              "onUpdate:modelValue": ($event) => selectedDeptIds.value = $event,
                                                              value: d.id,
                                                              label: d.dept_s + " - " + (d.agent_name || ""),
                                                              density: "compact",
                                                              "hide-details": "",
                                                              class: "my-0"
                                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
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
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(groupedDepts.value, (group) => {
                                        return openBlock(), createBlock(VExpansionPanel, {
                                          key: group.college
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VExpansionPanelTitle, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "d-flex justify-space-between w-100" }, [
                                                  createVNode("div", null, toDisplayString(group.college), 1),
                                                  createVNode("div", null, toDisplayString(group.count) + "筆", 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(VExpansionPanelText, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "mb-2" }, [
                                                  createVNode(VBtn, {
                                                    class: "btn-op",
                                                    onClick: ($event) => selectGroup(group)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("全選")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"]),
                                                  createVNode(VBtn, {
                                                    class: "btn-op mx-1",
                                                    onClick: ($event) => clearGroup(group)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("取消")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"])
                                                ]),
                                                createVNode(VRow, {
                                                  dense: "",
                                                  class: "ma-0"
                                                }, {
                                                  default: withCtx(() => [
                                                    (openBlock(true), createBlock(Fragment, null, renderList(group.items, (d) => {
                                                      return openBlock(), createBlock(VCol, {
                                                        key: d.id,
                                                        cols: "6",
                                                        md: "4",
                                                        class: "pa-0"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(VCheckbox, {
                                                            modelValue: selectedDeptIds.value,
                                                            "onUpdate:modelValue": ($event) => selectedDeptIds.value = $event,
                                                            value: d.id,
                                                            label: d.dept_s + " - " + (d.agent_name || ""),
                                                            density: "compact",
                                                            "hide-details": "",
                                                            class: "my-0"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
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
                                        }, 1024);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "d-flex justify-space-between mb-1" }, [
                                  createVNode("h2", null, "系所清單"),
                                  createVNode("span", null, toDisplayString(filteredDepts.value.length) + "筆", 1)
                                ]),
                                createVNode("div", { class: "mb-2" }, [
                                  createVNode(VBtn, {
                                    class: "btn-op",
                                    onClick: selectAll
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("全選")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    class: "btn-op mx-1",
                                    onClick: clearAll
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("取消")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    class: "btn-op",
                                    onClick: invert
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("反選")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "scroll flex-grow-1" }, [
                                  createVNode(VExpansionPanels, { multiple: "" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(groupedDepts.value, (group) => {
                                        return openBlock(), createBlock(VExpansionPanel, {
                                          key: group.college
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VExpansionPanelTitle, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "d-flex justify-space-between w-100" }, [
                                                  createVNode("div", null, toDisplayString(group.college), 1),
                                                  createVNode("div", null, toDisplayString(group.count) + "筆", 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(VExpansionPanelText, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "mb-2" }, [
                                                  createVNode(VBtn, {
                                                    class: "btn-op",
                                                    onClick: ($event) => selectGroup(group)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("全選")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"]),
                                                  createVNode(VBtn, {
                                                    class: "btn-op mx-1",
                                                    onClick: ($event) => clearGroup(group)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("取消")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"])
                                                ]),
                                                createVNode(VRow, {
                                                  dense: "",
                                                  class: "ma-0"
                                                }, {
                                                  default: withCtx(() => [
                                                    (openBlock(true), createBlock(Fragment, null, renderList(group.items, (d) => {
                                                      return openBlock(), createBlock(VCol, {
                                                        key: d.id,
                                                        cols: "6",
                                                        md: "4",
                                                        class: "pa-0"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(VCheckbox, {
                                                            modelValue: selectedDeptIds.value,
                                                            "onUpdate:modelValue": ($event) => selectedDeptIds.value = $event,
                                                            value: d.id,
                                                            label: d.dept_s + " - " + (d.agent_name || ""),
                                                            density: "compact",
                                                            "hide-details": "",
                                                            class: "my-0"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
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
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "left-panel" }, [
                            createVNode(VCard, { class: "pa-4" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex align-baseline block-gap" }, [
                                  createVNode("h2", null, "輸出格式"),
                                  createVNode(VBtnToggle, {
                                    modelValue: mode.value,
                                    "onUpdate:modelValue": ($event) => mode.value = $event,
                                    mandatory: "",
                                    class: "format-toggle ml-5"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, { value: "email" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Email")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VBtn, { value: "ext" }, {
                                        default: withCtx(() => [
                                          createTextVNode("分機")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode("div", { class: "d-flex align-baseline block-gap" }, [
                                  createVNode("h2", { style: { "min-width": "90px" } }, "輸出條件"),
                                  createVNode("div", {
                                    class: "d-flex ml-5 flex-grow-1",
                                    style: { "gap": "20px" }
                                  }, [
                                    createVNode(VSelect, {
                                      label: "學制",
                                      items: stypeList.value,
                                      modelValue: selectedStype.value,
                                      "onUpdate:modelValue": ($event) => selectedStype.value = $event,
                                      density: "compact",
                                      style: { "flex": "1" }
                                    }, null, 8, ["items", "modelValue", "onUpdate:modelValue"]),
                                    createVNode(VTextField, {
                                      modelValue: keyword.value,
                                      "onUpdate:modelValue": ($event) => keyword.value = $event,
                                      label: "搜尋",
                                      density: "compact",
                                      clearable: "",
                                      style: { "flex": "2" }
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ])
                                ]),
                                createVNode("div", { class: "d-flex justify-space-between block-gap" }, [
                                  createVNode("h2", null, "學院"),
                                  createVNode("span", null, toDisplayString(selectedColleges.value.length) + " / " + toDisplayString(collegeList.value.length) + "筆", 1)
                                ]),
                                createVNode("div", { class: "mb-3" }, [
                                  createVNode(VBtn, {
                                    class: "btn-op",
                                    onClick: selectAllColleges
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("全選")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    class: "btn-op mx-1",
                                    onClick: clearColleges
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("取消")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    class: "btn-op",
                                    onClick: invertColleges
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("反選")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(VRow, { class: "ma-0" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(collegeList.value, (c) => {
                                      return openBlock(), createBlock(VCol, {
                                        key: c,
                                        cols: "6",
                                        md: "4",
                                        class: "pa-0"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VCheckbox, {
                                            modelValue: selectedColleges.value,
                                            "onUpdate:modelValue": ($event) => selectedColleges.value = $event,
                                            label: c,
                                            value: c,
                                            density: "compact",
                                            "hide-details": "",
                                            class: "my-0"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value"])
                                        ]),
                                        _: 2
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCard, { class: "pa-3 d-flex flex-column mt-4 dept-card" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex justify-space-between mb-1" }, [
                                  createVNode("h2", null, "系所清單"),
                                  createVNode("span", null, toDisplayString(filteredDepts.value.length) + "筆", 1)
                                ]),
                                createVNode("div", { class: "mb-2" }, [
                                  createVNode(VBtn, {
                                    class: "btn-op",
                                    onClick: selectAll
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("全選")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    class: "btn-op mx-1",
                                    onClick: clearAll
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("取消")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    class: "btn-op",
                                    onClick: invert
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode("反選")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "scroll flex-grow-1" }, [
                                  createVNode(VExpansionPanels, { multiple: "" }, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(groupedDepts.value, (group) => {
                                        return openBlock(), createBlock(VExpansionPanel, {
                                          key: group.college
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VExpansionPanelTitle, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "d-flex justify-space-between w-100" }, [
                                                  createVNode("div", null, toDisplayString(group.college), 1),
                                                  createVNode("div", null, toDisplayString(group.count) + "筆", 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(VExpansionPanelText, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "mb-2" }, [
                                                  createVNode(VBtn, {
                                                    class: "btn-op",
                                                    onClick: ($event) => selectGroup(group)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("全選")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"]),
                                                  createVNode(VBtn, {
                                                    class: "btn-op mx-1",
                                                    onClick: ($event) => clearGroup(group)
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode("取消")
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick"])
                                                ]),
                                                createVNode(VRow, {
                                                  dense: "",
                                                  class: "ma-0"
                                                }, {
                                                  default: withCtx(() => [
                                                    (openBlock(true), createBlock(Fragment, null, renderList(group.items, (d) => {
                                                      return openBlock(), createBlock(VCol, {
                                                        key: d.id,
                                                        cols: "6",
                                                        md: "4",
                                                        class: "pa-0"
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(VCheckbox, {
                                                            modelValue: selectedDeptIds.value,
                                                            "onUpdate:modelValue": ($event) => selectedDeptIds.value = $event,
                                                            value: d.id,
                                                            label: d.dept_s + " - " + (d.agent_name || ""),
                                                            density: "compact",
                                                            "hide-details": "",
                                                            class: "my-0"
                                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
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
                                        }, 1024);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ])
                              ]),
                              _: 1
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCard, { class: "pa-3 right-panel" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="d-flex justify-space-between align-center mb-2" data-v-45496bd1${_scopeId4}><div class="d-flex align-center" data-v-45496bd1${_scopeId4}><h2 data-v-45496bd1${_scopeId4}>輸出結果</h2>`);
                              _push5(ssrRenderComponent(VBtn, {
                                class: "ml-5",
                                color: "#688cb3",
                                onClick: copyResult,
                                "append-icon": "mdi-email-multiple-outline"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` 複製 `);
                                  } else {
                                    return [
                                      createTextVNode(" 複製 ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><span data-v-45496bd1${_scopeId4}>${ssrInterpolate(outputCount.value)}筆</span></div>`);
                              _push5(ssrRenderComponent(VTextarea, {
                                modelValue: outputText.value,
                                "onUpdate:modelValue": ($event) => outputText.value = $event,
                                class: "output-area",
                                style: { "white-space": "pre-wrap" }
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "d-flex justify-space-between align-center mb-2" }, [
                                  createVNode("div", { class: "d-flex align-center" }, [
                                    createVNode("h2", null, "輸出結果"),
                                    createVNode(VBtn, {
                                      class: "ml-5",
                                      color: "#688cb3",
                                      onClick: copyResult,
                                      "append-icon": "mdi-email-multiple-outline"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" 複製 ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("span", null, toDisplayString(outputCount.value) + "筆", 1)
                                ]),
                                createVNode(VTextarea, {
                                  modelValue: outputText.value,
                                  "onUpdate:modelValue": ($event) => outputText.value = $event,
                                  class: "output-area",
                                  style: { "white-space": "pre-wrap" }
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCard, { class: "pa-3 right-panel" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex justify-space-between align-center mb-2" }, [
                                createVNode("div", { class: "d-flex align-center" }, [
                                  createVNode("h2", null, "輸出結果"),
                                  createVNode(VBtn, {
                                    class: "ml-5",
                                    color: "#688cb3",
                                    onClick: copyResult,
                                    "append-icon": "mdi-email-multiple-outline"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" 複製 ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("span", null, toDisplayString(outputCount.value) + "筆", 1)
                              ]),
                              createVNode(VTextarea, {
                                modelValue: outputText.value,
                                "onUpdate:modelValue": ($event) => outputText.value = $event,
                                class: "output-area",
                                style: { "white-space": "pre-wrap" }
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    createVNode(VCol, {
                      cols: "12",
                      md: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "left-panel" }, [
                          createVNode(VCard, { class: "pa-4" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex align-baseline block-gap" }, [
                                createVNode("h2", null, "輸出格式"),
                                createVNode(VBtnToggle, {
                                  modelValue: mode.value,
                                  "onUpdate:modelValue": ($event) => mode.value = $event,
                                  mandatory: "",
                                  class: "format-toggle ml-5"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, { value: "email" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Email")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VBtn, { value: "ext" }, {
                                      default: withCtx(() => [
                                        createTextVNode("分機")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode("div", { class: "d-flex align-baseline block-gap" }, [
                                createVNode("h2", { style: { "min-width": "90px" } }, "輸出條件"),
                                createVNode("div", {
                                  class: "d-flex ml-5 flex-grow-1",
                                  style: { "gap": "20px" }
                                }, [
                                  createVNode(VSelect, {
                                    label: "學制",
                                    items: stypeList.value,
                                    modelValue: selectedStype.value,
                                    "onUpdate:modelValue": ($event) => selectedStype.value = $event,
                                    density: "compact",
                                    style: { "flex": "1" }
                                  }, null, 8, ["items", "modelValue", "onUpdate:modelValue"]),
                                  createVNode(VTextField, {
                                    modelValue: keyword.value,
                                    "onUpdate:modelValue": ($event) => keyword.value = $event,
                                    label: "搜尋",
                                    density: "compact",
                                    clearable: "",
                                    style: { "flex": "2" }
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ])
                              ]),
                              createVNode("div", { class: "d-flex justify-space-between block-gap" }, [
                                createVNode("h2", null, "學院"),
                                createVNode("span", null, toDisplayString(selectedColleges.value.length) + " / " + toDisplayString(collegeList.value.length) + "筆", 1)
                              ]),
                              createVNode("div", { class: "mb-3" }, [
                                createVNode(VBtn, {
                                  class: "btn-op",
                                  onClick: selectAllColleges
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("全選")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  class: "btn-op mx-1",
                                  onClick: clearColleges
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("取消")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  class: "btn-op",
                                  onClick: invertColleges
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("反選")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode(VRow, { class: "ma-0" }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(collegeList.value, (c) => {
                                    return openBlock(), createBlock(VCol, {
                                      key: c,
                                      cols: "6",
                                      md: "4",
                                      class: "pa-0"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VCheckbox, {
                                          modelValue: selectedColleges.value,
                                          "onUpdate:modelValue": ($event) => selectedColleges.value = $event,
                                          label: c,
                                          value: c,
                                          density: "compact",
                                          "hide-details": "",
                                          class: "my-0"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value"])
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCard, { class: "pa-3 d-flex flex-column mt-4 dept-card" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex justify-space-between mb-1" }, [
                                createVNode("h2", null, "系所清單"),
                                createVNode("span", null, toDisplayString(filteredDepts.value.length) + "筆", 1)
                              ]),
                              createVNode("div", { class: "mb-2" }, [
                                createVNode(VBtn, {
                                  class: "btn-op",
                                  onClick: selectAll
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("全選")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  class: "btn-op mx-1",
                                  onClick: clearAll
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("取消")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  class: "btn-op",
                                  onClick: invert
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("反選")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "scroll flex-grow-1" }, [
                                createVNode(VExpansionPanels, { multiple: "" }, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(groupedDepts.value, (group) => {
                                      return openBlock(), createBlock(VExpansionPanel, {
                                        key: group.college
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VExpansionPanelTitle, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "d-flex justify-space-between w-100" }, [
                                                createVNode("div", null, toDisplayString(group.college), 1),
                                                createVNode("div", null, toDisplayString(group.count) + "筆", 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(VExpansionPanelText, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "mb-2" }, [
                                                createVNode(VBtn, {
                                                  class: "btn-op",
                                                  onClick: ($event) => selectGroup(group)
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("全選")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"]),
                                                createVNode(VBtn, {
                                                  class: "btn-op mx-1",
                                                  onClick: ($event) => clearGroup(group)
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode("取消")
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick"])
                                              ]),
                                              createVNode(VRow, {
                                                dense: "",
                                                class: "ma-0"
                                              }, {
                                                default: withCtx(() => [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(group.items, (d) => {
                                                    return openBlock(), createBlock(VCol, {
                                                      key: d.id,
                                                      cols: "6",
                                                      md: "4",
                                                      class: "pa-0"
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(VCheckbox, {
                                                          modelValue: selectedDeptIds.value,
                                                          "onUpdate:modelValue": ($event) => selectedDeptIds.value = $event,
                                                          value: d.id,
                                                          label: d.dept_s + " - " + (d.agent_name || ""),
                                                          density: "compact",
                                                          "hide-details": "",
                                                          class: "my-0"
                                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
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
                                      }, 1024);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ])
                            ]),
                            _: 1
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, { class: "pa-3 right-panel" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex justify-space-between align-center mb-2" }, [
                              createVNode("div", { class: "d-flex align-center" }, [
                                createVNode("h2", null, "輸出結果"),
                                createVNode(VBtn, {
                                  class: "ml-5",
                                  color: "#688cb3",
                                  onClick: copyResult,
                                  "append-icon": "mdi-email-multiple-outline"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" 複製 ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("span", null, toDisplayString(outputCount.value) + "筆", 1)
                            ]),
                            createVNode(VTextarea, {
                              modelValue: outputText.value,
                              "onUpdate:modelValue": ($event) => outputText.value = $event,
                              class: "output-area",
                              style: { "white-space": "pre-wrap" }
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
            _push2(ssrRenderComponent(VSnackbar, {
              modelValue: snackbar.value,
              "onUpdate:modelValue": ($event) => snackbar.value = $event
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`已複製 ✅`);
                } else {
                  return [
                    createTextVNode("已複製 ✅")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "left-panel" }, [
                        createVNode(VCard, { class: "pa-4" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex align-baseline block-gap" }, [
                              createVNode("h2", null, "輸出格式"),
                              createVNode(VBtnToggle, {
                                modelValue: mode.value,
                                "onUpdate:modelValue": ($event) => mode.value = $event,
                                mandatory: "",
                                class: "format-toggle ml-5"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, { value: "email" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Email")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, { value: "ext" }, {
                                    default: withCtx(() => [
                                      createTextVNode("分機")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "d-flex align-baseline block-gap" }, [
                              createVNode("h2", { style: { "min-width": "90px" } }, "輸出條件"),
                              createVNode("div", {
                                class: "d-flex ml-5 flex-grow-1",
                                style: { "gap": "20px" }
                              }, [
                                createVNode(VSelect, {
                                  label: "學制",
                                  items: stypeList.value,
                                  modelValue: selectedStype.value,
                                  "onUpdate:modelValue": ($event) => selectedStype.value = $event,
                                  density: "compact",
                                  style: { "flex": "1" }
                                }, null, 8, ["items", "modelValue", "onUpdate:modelValue"]),
                                createVNode(VTextField, {
                                  modelValue: keyword.value,
                                  "onUpdate:modelValue": ($event) => keyword.value = $event,
                                  label: "搜尋",
                                  density: "compact",
                                  clearable: "",
                                  style: { "flex": "2" }
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])
                            ]),
                            createVNode("div", { class: "d-flex justify-space-between block-gap" }, [
                              createVNode("h2", null, "學院"),
                              createVNode("span", null, toDisplayString(selectedColleges.value.length) + " / " + toDisplayString(collegeList.value.length) + "筆", 1)
                            ]),
                            createVNode("div", { class: "mb-3" }, [
                              createVNode(VBtn, {
                                class: "btn-op",
                                onClick: selectAllColleges
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("全選")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                class: "btn-op mx-1",
                                onClick: clearColleges
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("取消")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                class: "btn-op",
                                onClick: invertColleges
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("反選")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(VRow, { class: "ma-0" }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(collegeList.value, (c) => {
                                  return openBlock(), createBlock(VCol, {
                                    key: c,
                                    cols: "6",
                                    md: "4",
                                    class: "pa-0"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VCheckbox, {
                                        modelValue: selectedColleges.value,
                                        "onUpdate:modelValue": ($event) => selectedColleges.value = $event,
                                        label: c,
                                        value: c,
                                        density: "compact",
                                        "hide-details": "",
                                        class: "my-0"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "value"])
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VCard, { class: "pa-3 d-flex flex-column mt-4 dept-card" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex justify-space-between mb-1" }, [
                              createVNode("h2", null, "系所清單"),
                              createVNode("span", null, toDisplayString(filteredDepts.value.length) + "筆", 1)
                            ]),
                            createVNode("div", { class: "mb-2" }, [
                              createVNode(VBtn, {
                                class: "btn-op",
                                onClick: selectAll
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("全選")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                class: "btn-op mx-1",
                                onClick: clearAll
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("取消")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                class: "btn-op",
                                onClick: invert
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("反選")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "scroll flex-grow-1" }, [
                              createVNode(VExpansionPanels, { multiple: "" }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(groupedDepts.value, (group) => {
                                    return openBlock(), createBlock(VExpansionPanel, {
                                      key: group.college
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VExpansionPanelTitle, null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "d-flex justify-space-between w-100" }, [
                                              createVNode("div", null, toDisplayString(group.college), 1),
                                              createVNode("div", null, toDisplayString(group.count) + "筆", 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(VExpansionPanelText, null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "mb-2" }, [
                                              createVNode(VBtn, {
                                                class: "btn-op",
                                                onClick: ($event) => selectGroup(group)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("全選")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"]),
                                              createVNode(VBtn, {
                                                class: "btn-op mx-1",
                                                onClick: ($event) => clearGroup(group)
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode("取消")
                                                ]),
                                                _: 1
                                              }, 8, ["onClick"])
                                            ]),
                                            createVNode(VRow, {
                                              dense: "",
                                              class: "ma-0"
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(true), createBlock(Fragment, null, renderList(group.items, (d) => {
                                                  return openBlock(), createBlock(VCol, {
                                                    key: d.id,
                                                    cols: "6",
                                                    md: "4",
                                                    class: "pa-0"
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(VCheckbox, {
                                                        modelValue: selectedDeptIds.value,
                                                        "onUpdate:modelValue": ($event) => selectedDeptIds.value = $event,
                                                        value: d.id,
                                                        label: d.dept_s + " - " + (d.agent_name || ""),
                                                        density: "compact",
                                                        "hide-details": "",
                                                        class: "my-0"
                                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "value", "label"])
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
                                    }, 1024);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ])
                          ]),
                          _: 1
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VCard, { class: "pa-3 right-panel" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "d-flex justify-space-between align-center mb-2" }, [
                            createVNode("div", { class: "d-flex align-center" }, [
                              createVNode("h2", null, "輸出結果"),
                              createVNode(VBtn, {
                                class: "ml-5",
                                color: "#688cb3",
                                onClick: copyResult,
                                "append-icon": "mdi-email-multiple-outline"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" 複製 ")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("span", null, toDisplayString(outputCount.value) + "筆", 1)
                          ]),
                          createVNode(VTextarea, {
                            modelValue: outputText.value,
                            "onUpdate:modelValue": ($event) => outputText.value = $event,
                            class: "output-area",
                            style: { "white-space": "pre-wrap" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VSnackbar, {
                modelValue: snackbar.value,
                "onUpdate:modelValue": ($event) => snackbar.value = $event
              }, {
                default: withCtx(() => [
                  createTextVNode("已複製 ✅")
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/Converters/CopyDeptsDetails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CopyDeptsDetails = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-45496bd1"]]);

export { CopyDeptsDetails as default };
//# sourceMappingURL=CopyDeptsDetails-DaSRAehC.mjs.map
