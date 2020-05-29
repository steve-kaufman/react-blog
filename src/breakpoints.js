import breakpoints from './sass/breakpoints.scss'

const md = Number(breakpoints.md)
const lg = Number(breakpoints.lg)

let width = window.innerWidth

console.log(width)

window.addEventListener('resize', () => {
  width = window.innerWidth
  console.log(width)
})

export const isMd = () => width > md

export const isLg = () => width > lg
