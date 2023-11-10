import { get } from "./base.js";
export function processSongs(songs) {
  if (!songs.length) {
    return Promise.resolve(songs)
  }
  console.log(songs.map(item => item.mid));
  return get('/api/getSongsUrl', {
    mid: songs.map(item => item.mid)
  }).then(res => {
    const map = res.map
    return songs.map(item => {
      item.url = map[item.mid]
      return item
    }).filter((item => item.url.indexOf('vkey') > -1))
  })
}