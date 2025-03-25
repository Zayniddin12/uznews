import { defineStore } from 'pinia'

function calculateProgress(audioCurrentTime: number, audioTotalTime: number) {
  return (audioCurrentTime / audioTotalTime) * 100
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes
  const formattedSeconds = seconds < 10 ? '0' + seconds : seconds

  return formattedMinutes + ':' + formattedSeconds
}

export const useAudioStore = defineStore('audio', {
  state: () => ({
    isAudioFixed: false,
    currentTime: '00:00',
    totalDuration: '00:00',
    seekSliderVal: '0',
    isPlaying: false,
    progress: 'linear-gradient(to right, #52618F 0%, #E6E6E6 0%)',
    volumeColor: 'linear-gradient(to right, #52618F 0%, #E6E6E6 0%)',
    volume: '50',
    normalSpeed: true,
    audio: {} as HTMLAudioElement,
    podcastImg: '',
    isDownloading: false,
    icon: false,
  }),

  actions: {
    makeFixed() {
      this.$state.isAudioFixed = true
    },
    makeUnfixed() {
      this.$state.isAudioFixed = false
    },

    trackSeekSliderValue(val: string) {
      this.seekSliderVal = val
    },

    setCurrentTime(time: string) {
      this.currentTime = time
    },

    setTotalDuration(time: string) {
      this.totalDuration = time
    },

    initiateAudio(url?: string) {
      if (url !== this.audio.src) {
        if (this.audio.src) {
          this.destroyAudio()
        }
        this.audio = new Audio(url)
        this.audio.addEventListener('loadedmetadata', this.onLoadedmetadata)
        this.audio.addEventListener('timeupdate', this.onTimeupdate)
      }
    },

    setPodcastImg(img: string) {
      this.podcastImg = img
    },

    onLoadedmetadata() {
      this.updateColorTrackerVolume((+this.volume / 100) * 100)
      this.totalDuration = formatTime(this.audio.duration)
    },

    onTimeupdate() {
      this.updateColorTracker()

      this.seekSliderVal =
        '' + calculateProgress(this.audio.currentTime, this.audio.duration)
      this.currentTime = formatTime(this.audio.currentTime)
    },

    downloadAudio() {
      this.isDownloading = true
      fetch(this.audio.src)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = 'mp3 audio'
          link.click()
          this.isDownloading = false
        })
    },

    destroyAudio() {
      this.isDownloading = false
      this.isPlaying = false
      this.audio.src = ''
      this.icon = false
      this.normalSpeed = true
      this.audio.remove()

      this.progress = 'linear-gradient(to right, #52618F 0%, #E6E6E6 0%)'
      this.volumeColor = 'linear-gradient(to right, #52618F 0%, #E6E6E6 0%)'
    },

    updateColorTracker() {
      this.progress = `linear-gradient(to right, #52618F ${calculateProgress(
        this.audio.currentTime,
        this.audio.duration
      )}%, #E6E6E6 ${calculateProgress(
        this.audio.currentTime,
        this.audio.duration
      )}%)`
    },

    mute() {
      this.volume = '0'
      this.audio.volume = 0
      this.volumeColor = 'linear-gradient(to right, #52618F 0%, #E6E6E6 0%)'
    },

    updateColorTrackerVolume(precent: number) {
      this.volumeColor = `linear-gradient(to right, #52618F ${precent}%, #E6E6E6 ${precent}%)`
    },

    onInputSeekSlider(e: Event) {
      this.audio.currentTime =
        (+(e.target as HTMLInputElement).value / 100) * this.audio.duration
      this.updateColorTracker()
    },

    onChangeSeekSlider(e) {
      this.audio.currentTime = (e.target.value / 100) * this.audio.duration
    },

    onInputVolume(e: Event) {
      const val = +(e.target as HTMLInputElement).value
      this.audio.volume = val / 100
      const precent = (val / e.target.max) * 100
      this.volume = '' + precent

      this.updateColorTrackerVolume(precent)
    },

    setAudioTag(el: HTMLAudioElement) {
      this.audio = el
    },

    pauseAudio() {
      this.isPlaying = true
      this.audio.pause()
      this.icon = !this.icon
    },

    playAudio() {
      this.audio.play()
      this.isPlaying = true
      this.icon = !this.icon
    },

    forward() {
      this.audio.currentTime += 15
    },

    backward() {
      this.audio.currentTime -= 15
    },

    makeFaster() {
      if (this.normalSpeed) {
        this.audio.playbackRate = 2.0
        this.normalSpeed = false
      } else {
        this.normalSpeed = true
        this.audio.playbackRate = 1.0
      }
    },
  },

  getters: {
    getCurrentTime(): string {
      return this.currentTime
    },

    getImgage(): string {
      return this.podcastImg
    },

    getVolumeColor(): string {
      return this.volumeColor
    },

    getTotalDuration(): string {
      return this.totalDuration
    },

    getSeekSliderValue(): string {
      return this.seekSliderVal
    },

    getProgress(): string {
      return this.progress
    },

    getVolume(): string {
      return this.volume
    },
  },
})
