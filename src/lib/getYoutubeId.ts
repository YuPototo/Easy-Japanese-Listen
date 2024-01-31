// https:/www.youtube.com/watch?v=_htphHWq5bM
// --> _htphHWq5bM
// or
// https://www.youtube.com/watch?v=H7ZlUDYypWE&ab_channel=DailyJapanesewithNaoko
// --> H7ZlUDYypWE
// or
// https://youtu.be/H7ZlUDYypWE
// --> H7ZlUDYypWE
// or
// https://youtu.be/H7ZlUDYypWE?si=Wmbrpa0MSR4-7XgJ
// --> H7ZlUDYypWE

export default function getYoutubeId(url: string): string {
    const youtubeUrl = new URL(url)
    const youtubeId = youtubeUrl.searchParams.get('v')

    if (youtubeId) {
        return youtubeId
    }

    const youtubeShortUrl = youtubeUrl.pathname.split('/').pop()

    if (youtubeShortUrl) {
        return youtubeShortUrl
    }

    return ''
}
