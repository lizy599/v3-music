import { get } from "./base";

export const getRecommend = () => {
  return get('/api/getRecommend')
}
// 获取歌单详情
export function getAlbum(album) {
  return get('/api/getAlbum', {
    id: album.id
  })
}