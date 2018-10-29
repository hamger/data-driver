import DD from "@";

export default DD.extend({
  props: {
    staticA: {
      default: 0
    },
    dynamicA: {
      default: 0
    }
  },
  watch: {
    dynamicA(val, oldVal) {
      console.log(`sub.dynamicA 从 ${oldVal} 变更为 ${val}`);
    }
  },
});
