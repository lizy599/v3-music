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
const lyricMap = {}

export function getLyric(song) {
  if (song.lyric) {
    return Promise.resolve(song.lyric)
  }
  const mid = song.mid
  const lyric = lyricMap[mid]
  if (lyric) {
    return Promise.resolve(lyric)
  }

  return get('/api/getLyric', {
    mid
  }).then((result) => {
    const lyric = result ? result.lyric : '[00:00:00]该歌曲暂时无法获取歌词'
    lyricMap[mid] = lyric
    return lyric
  })
}
