import { expect, test } from 'vitest'
import getYoutubeId from '../getYoutubeId'

test('https:/www.youtube.com/watch?v=_htphHWq5bM', () => {
    const url = 'https:/www.youtube.com/watch?v=_htphHWq5bM'
    const result = getYoutubeId(url)

    expect(result).toEqual('_htphHWq5bM')
})

test('https://www.youtube.com/watch?v=H7ZlUDYypWE&ab_channel=DailyJapanesewithNaoko', () => {
    const url =
        'https://www.youtube.com/watch?v=H7ZlUDYypWE&ab_channel=DailyJapanesewithNaoko'
    const result = getYoutubeId(url)

    expect(result).toEqual('H7ZlUDYypWE')
})

test('https://youtu.be/H7ZlUDYypWE', () => {
    const url = 'https://youtu.be/H7ZlUDYypWE'
    const result = getYoutubeId(url)

    expect(result).toEqual('H7ZlUDYypWE')
})

test('https://youtu.be/H7ZlUDYypWE?si=Wmbrpa0MSR4-7XgJ', () => {
    const url = 'https://youtu.be/H7ZlUDYypWE?si=Wmbrpa0MSR4-7XgJ'
    const result = getYoutubeId(url)

    expect(result).toEqual('H7ZlUDYypWE')
})
