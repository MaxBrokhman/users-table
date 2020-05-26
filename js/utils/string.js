import { compose } from './compose.js'

export const normalizeString = (str) => str.trim().toLowerCase()
export const replaceSpacesWithUnderlines = (str) => str.split(' ').join('_')
export const convertHeaderToProp = compose(
  replaceSpacesWithUnderlines,
  normalizeString,
)
