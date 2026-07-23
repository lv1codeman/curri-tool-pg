import { createVNode, normalizeStyle, normalizeClass, createElementVNode } from 'vue';
import { a as useDimension, u as useRender, m as makeTagProps, b as makeDimensionProps, c as makeComponentProps } from './dimensions-B7KURZuc.mjs';
import { u as useLayout } from './layout-BYmWGd6C.mjs';
import { u as useSsrBoot } from './ssrBoot-ZQn7gOuX.mjs';
import { g as genericComponent, p as propsFactory } from './server.mjs';

const makeVMainProps = propsFactory({
  scrollable: Boolean,
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps({
    tag: "main"
  })
}, "VMain");
const VMain = genericComponent()({
  name: "VMain",
  props: makeVMainProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      mainStyles
    } = useLayout();
    const {
      ssrBootStyles
    } = useSsrBoot();
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-main", {
        "v-main--scrollable": props.scrollable
      }, props.class]),
      "style": normalizeStyle([mainStyles.value, ssrBootStyles.value, dimensionStyles.value, props.style])
    }, {
      default: () => [props.scrollable ? createElementVNode("div", {
        "class": "v-main__scroller"
      }, [slots.default?.()]) : slots.default?.()]
    }));
    return {};
  }
});

export { VMain as V };
//# sourceMappingURL=VMain-IjnDn4rS.mjs.map
