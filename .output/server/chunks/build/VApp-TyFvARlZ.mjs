import { createElementVNode, normalizeStyle, normalizeClass } from 'vue';
import { u as useRender, c as makeComponentProps } from './dimensions-B7KURZuc.mjs';
import { c as createLayout, b as makeLayoutProps } from './layout-BYmWGd6C.mjs';
import { g as genericComponent, j as provideTheme, l as useRtl, p as propsFactory, m as makeThemeProps, o as omit } from './server.mjs';

const makeVAppProps = propsFactory({
  ...makeComponentProps(),
  ...omit(makeLayoutProps(), ["fullHeight"]),
  ...makeThemeProps()
}, "VApp");
const VApp = genericComponent()({
  name: "VApp",
  props: makeVAppProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const theme = provideTheme(props);
    const {
      layoutClasses,
      getLayoutItem,
      items,
      layoutRef
    } = createLayout({
      ...props,
      fullHeight: true
    });
    const {
      rtlClasses
    } = useRtl();
    useRender(() => createElementVNode("div", {
      "ref": layoutRef,
      "class": normalizeClass(["v-application", theme.themeClasses.value, layoutClasses.value, rtlClasses.value, props.class]),
      "style": normalizeStyle([props.style])
    }, [createElementVNode("div", {
      "class": "v-application__wrap"
    }, [slots.default?.()])]));
    return {
      getLayoutItem,
      items,
      theme
    };
  }
});

export { VApp as V };
//# sourceMappingURL=VApp-TyFvARlZ.mjs.map
