import DD from "@";

export default DD.extend({
  props: {
    fatherName: {
      default: 'fatherName'
    },
    dynamicA: {
      default: 0
    }
  },
  methods: {
    setFatherCount (num) {
      this.$emit('setCount', num)
    }
  },
  watch: {
    dynamicA(val, oldVal) {
      console.log(`sub.dynamicA 从 ${oldVal} 变更为 ${val}`);
    }
  },
});
