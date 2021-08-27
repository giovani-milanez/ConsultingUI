// helper function: generate a new file from base64 String
export const dataURLtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(',')
  const mime = arr[0].split(':')[1]
  const name = filename + '.' + mime.split('/')[1].split(';')[0]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1)
    n -= 1 // to make eslint happy
  }
  return new File([u8arr], name, { type: mime })
}
