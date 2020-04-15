/**
 * Copyright (c) 2020 - 2022 - ChowChiKwan
 */
const _replace = (val) => {
  return val.replace(/[^0-9]/g, '');
};
export default {
  install(Vue) {
    Vue.directive('numbers', {
      // 事件内部使用event.target代替el，兼容element-ui el-input
      bind(el, binding, vnode) {
        el.addEventListener('keydown', (event) => {
          const { key } = event;
          if (new RegExp(/[0-9]/).test(key) || key === 'Backspace') return;
          event.preventDefault();
        });

        el.addEventListener('compositionend', (event) => {
          event.target.value = _replace(event.target.value);
          if (vnode.componentInstance) vnode.componentInstance.$emit('input', event.target.value);
        });

        el.addEventListener('paste', (event) => {
          setTimeout(() => { // 模拟onafterpaste
            event.target.value = _replace(event.target.value);
            event.target.dispatchEvent(new Event('input')); // update v-model
            if (vnode.componentInstance) vnode.componentInstance.$emit('input', _replace(event.target.value));
          }, 0);
        });
      },
    });
  }
};
