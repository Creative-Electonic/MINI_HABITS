import UAParser from 'ua-parser-js'

const ua = new UAParser()

console.log(ua)

export const isMobile = ['iOS', 'Android'].includes(ua.getOS().name)
