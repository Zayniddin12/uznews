<template>
  <div class="container">
    <CommonSectionWrapper
      :title="$t('photo_reports')"
      :all-link="'/reports/photo'"
      :all-title="$t('all')"
      class="mb-5 md:mb-8"
    />
    <div class="photo-repo gap-6">
      <div>
        <div v-if="loading" class="w-[787px] h-full">
          <BlockPreloader width="100%" height="100%" loading />
        </div>
        <div v-else>
          <CardsPhotoReportSliderCard
            :card="photoReports[0]"
            main
            class="main_photoreport"
            v-bind="{
              auto: {
                delay: 3000 + getRandomNumber() * 1000,
                disableOnInteraction: true,
                reverseDirection: true,
              },
            }"
          />
        </div>
      </div>
      <div
        v-if="loading"
        class="grid lg:justify-between justify-center lg:flex-nowrap flex-wrap gap-4 pr-10"
      >
        <BlockPhotoReportSmall v-for="item in 3" :key="item" />
      </div>
      <div v-else>
        <div
          class="grid lg:justify-between lg:flex-nowrap flex-wrap gap-4 main_smallreport"
        >
          <template
            v-for="(item, index) in photoReports.slice(1, 4)"
            :key="index"
          >
            <CardsPhotoReports
              v-if="item?.images?.length"
              class="h-fit"
              v-bind="{
                card: item,
                auto: {
                  delay: 3000 + getRandomNumber() * 1000,
                  disableOnInteraction: true,
                  reverseDirection: true,
                },
              }"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data?: object
  photoReports: object
  loading: boolean
}
defineProps<Props>()
function getRandomNumber() {
  return Math.floor(Math.random() * 5) + 1
}
</script>

<style>
@media screen and (min-width: 1041px) {
  .photo-repo {
    display: flex !important;
  }
  .main_photoreport {
    max-width: 787px !important;
    width: 100% !important;
    height: 500px !important;
  }
  .main_smallreport {
    justify-content: center;
    padding-right: 40px;
  }
}
@media screen and (max-width: 1040px) {
  .photo-repo {
    flex-direction: column !important;
  }
  .main_photoreport {
    width: 100% !important;
  }
  .main_smallreport {
    width: 100% !important;
    margin-top: 32px !important;
  }
}
@media screen and (max-width: 768px) {
  .main_smallreport {
    padding-right: 0 !important;
  }
}
</style>
