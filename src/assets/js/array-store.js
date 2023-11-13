import storage from 'good-storage'
// 插入数组中
function inertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  // 已经存在，不需要插入
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 不存在插入到数组中
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    // 最早的收藏删掉
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
// 保存收藏列表
export function save(item, key, compare, maxLen) {
  // 取本地存储里面的数据，没有就设为[]
  const items = storage.get(key, [])
  inertArray(items, item, compare, maxLen)
  // 修改本地
  storage.set(key, items)
  return items
}

export function remove(key, compare) {
  const items = storage.get(key, [])
  deleteFromArray(items, compare)
  // 修改本地
  storage.set(key, items)
  return items
}

export function load(key) {
  return storage.get(key, [])
}

export function clear(key) {
  storage.remove(key)
  return []
}

export function saveAll(items, key) {
  storage.set(key, items)
}
