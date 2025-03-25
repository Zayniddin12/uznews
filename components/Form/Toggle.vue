<template>
  <label
    class="flex relative w-10 h-5 rounded-[10px] border border-solid border-blue-100 cursor-pointer"
  >
    <client-only>
      <input
        v-model="checked"
        type="checkbox"
        class="absolute w-px h-px opacity-0"
        @change="handleChange"
      />
      <span
        class="absolute w-[14px] h-[14px] rounded-full top-0.5 bg-blue-200 left-0.5 transition-200 dark:bg-white"
        :class="!checked ? 'translate-x-0' : 'translate-x-5'"
      />
    </client-only>
  </label>
</template>
<script setup lang="ts">
interface Props {
  modelValue?: boolean
  label?: string
}

const props = withDefaults(defineProps<Props>(), {})

const themeMode = useColorMode()

const checked = ref(themeMode.value === 'dark')

const handleChange = () => {
  // const target = e?.target
  // if (target === null) {
  //   return
  // }
  // value.value = target.checked
  // emit('input', value.value)
  if (themeMode.preference === 'light') {
    themeMode.preference = 'dark'
    checked.value = true
    return
  }
  themeMode.preference = 'light'
  checked.value = false
}
</script>
