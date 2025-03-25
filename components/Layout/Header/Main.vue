<template>
  <div class="!w-[170px] overflow-hidden">
    <Swiper v-if="exchangeRate?.id" v-bind="settings" class="h-5 w-full">
      <SwiperSlide>
        <LayoutHeaderSalary
          symbol="$"
          :rate="exchangeRate.usd"
          :rate-differ="exchangeRate.usd_diff"
        />
      </SwiperSlide>
      <SwiperSlide>
        <LayoutHeaderLegal
          :salary="currency?.mpot"
          type="МPОТ"
          currency="UZS"
        />
      </SwiperSlide>
      <SwiperSlide>
        <LayoutHeaderLegal :salary="currency.brv" type="БРВ" currency="UZS" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed } from 'vue'

import { mainSwiperData } from '~/data'
import { useCurrencyStore } from '~/store/currency'

const currencyStore = useCurrencyStore()
useAsyncData('header-currency', async () => {
  await currencyStore.fetchCurrency().catch((err) => showError(err))
  await currencyStore.fetchExchangeRate().catch((err) => showError(err))
})
const currency = computed(() => currencyStore.currency)
const exchangeRate = computed(() => currencyStore.exchangeRate)

const settings = {
  loop: true,
  direction: 'vertical',
  autoplay: {
    delay: 4000,
    disableOnInteraction: true,
  },
  modules: [Autoplay],
}
</script>
