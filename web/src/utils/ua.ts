import UAParser from 'ua-parser-js'

const ua = new UAParser()

console.log(ua.getOS())

export const isMobile = ['iOS', 'Android'].includes(ua.getOS().name)
