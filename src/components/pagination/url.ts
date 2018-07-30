export const extractIntParamNumberFromUrl = (url: string) => (param: string): number | null => {
  const parts = url.split(`&${param}=`).length > 1 ? url.split(`&${param}=`) : url.split(`?${param}=`)

  if (parts.length > 1) {
    const n = Number(parts[1].split('&')[0])
    return !isNaN(n) ? n : null
  } else {
    return null
  }
}
