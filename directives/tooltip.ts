import { DirectiveBinding } from 'vue'

export function VTooltip(el: HTMLElement, binding: DirectiveBinding) {
  el.classList.add('tooltip', 'relative', '_v-tooltip')
  const tooltip = document.createElement('div')
  tooltip.classList.add(
    'absolute',
    'top-0',
    '-translate-y-full',
    'opacity-0',
    'bg-[#2B2B30]',
    'dark:bg-white',
    'text-white',
    'text-xs',
    'py-1',
    'px-2',
    'rounded',
    'pointer-events-none',
    'after:absolute',
    'after:w-2.5',
    'after:h-2.5',
    'after:rotate-45',
    'after:rounded-sm',
    'after:bg-[#2B2B30]',
    'dark:after:bg-white',
    'transition-all',
    'duration-300',
    'after:-bottom-1',
    'w-max',
    'max-w-[300px]',
    'text-center'
  )
  if (binding.modifiers?.right) {
    tooltip.classList.add('-right-1', 'after:right-2')
  } else if (binding.modifiers?.left) {
    tooltip.classList.add('-left-1', 'after:left-2')
  } else {
    tooltip.classList.add(
      '-translate-x-1/2',
      'left-1/2',
      'after:left-1/2',
      'after:-translate-x-1/2'
    )
  }
  const span = document.createElement('span')
  span.classList.add(
    'text-white',
    'dark:!text-blue-900',
    'z-50',
    'relative',
    'font-sans'
  )
  span.innerText = binding.value
  tooltip.appendChild(span)
  el.appendChild(tooltip)
}
