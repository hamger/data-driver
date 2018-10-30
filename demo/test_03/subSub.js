import DD from "@";

export default DD.extend({
  props: {
    fatherName: {
      default: "fatherName"
    },
    dynamicB: {
      default: 0
    }
  },
  methods: {
    setFatherCount2 (num) {
      // console.log('haha: ' + num)
      this.$emit('setFatherCount', num)
    }
  },
  watch: {
    dynamicB(val, oldVal) {
      console.log(`subSub.dynamicB 从 ${oldVal} 变更为 ${val}`);
    }
  }
});
