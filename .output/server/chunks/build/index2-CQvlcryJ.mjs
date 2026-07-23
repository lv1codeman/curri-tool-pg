import { defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { u as useHead } from './v4-DA-K8OMZ.mjs';
import { _ as _export_sfc } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'axios';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index2",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "課務輔助工具",
      meta: [
        {
          name: "description",
          content: "課務輔助工具歡迎頁面"
        },
        { property: "og:title", content: "課務輔助工具" },
        { property: "og:description", content: "點擊以進入課務輔助工具。" },
        {
          property: "og:image",
          content: "https://raw.githubusercontent.com/lv1codeman/curri-tool/refs/heads/main/app/assets/sixer1200_896.png"
        },
        {
          property: "og:type",
          content: "university, class, converter, curriculum, Taiwan"
        },
        { property: "og:url", content: "https://lv1codeman.github.io/curri-tool/" }
      ]
    });
    const isExiting = ref(false);
    const isMainAnimationFinished = ref(false);
    const isFlashing = ref(false);
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["welcome-container", { "is-exiting": isExiting.value }]
      }, _attrs))} data-v-7684fd4e><div class="${ssrRenderClass([{ "fade-out-and-rotate": isExiting.value }, "welcome-content"])}" data-v-7684fd4e><img src="https://media.istockphoto.com/id/1460535745/photo/e-learning-graduate-certificate-program-concept-lightbulb-on-the-book-with-graduation-hat-and.jpg?s=2048x2048&amp;w=is&amp;k=20&amp;c=k5MXyGvT8TTyHQ-eMAiajmA1rp9p9VIrimnPqr0l2q8=" alt="" class="main-image" data-v-7684fd4e><h1 class="font-bold welcome-text" data-v-7684fd4e>課務輔助工具</h1><h2 class="${ssrRenderClass([{
        "is-visible": isMainAnimationFinished.value,
        "is-flashing": isFlashing.value
      }, "subtitle-text"])}" data-v-7684fd4e> - PRESS TO CONTINUE - </h2></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index2.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7684fd4e"]]);

export { index2 as default };
//# sourceMappingURL=index2-CQvlcryJ.mjs.map
