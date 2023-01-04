export const StringHelpers = {
  capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
  firstLowerCased: (str: string) => str.charAt(0).toLowerCase() + str.slice(1),
}
