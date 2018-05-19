export const userAgent = window.navigator.userAgent

export const iOS = !!userAgent.match(/iPad/i) || !!userAgent.match(/iPhone/i)
export const webkit = !!userAgent.match(/WebKit/i)
export const iOSSafari = iOS && webkit && !userAgent.match(/CriOS/i)
