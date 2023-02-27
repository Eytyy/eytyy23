const remoteUrl = `https://core-gules.vercel.app/`
const localUrl = `http://localhost:3000`
const secret = '63tnj20yik'

export default function resolvePreviewUrl(doc: any) {
  const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl
  const previewUrl = new URL(baseUrl)
  previewUrl.pathname = `/api/preview`
  previewUrl.searchParams.append(`secret`, secret)

  if (doc?.slug?.current) {
    previewUrl.searchParams.append(`slug`, doc.slug.current)
  }

  return previewUrl.toString()
}
