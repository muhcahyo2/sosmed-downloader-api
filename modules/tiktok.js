import { parse, splitCookiesString } from 'https://cdn.skypack.dev/set-cookie-parser';
import { cheerio } from 'https://deno.land/x/denocheerio@1.0.0/mod.ts'
import rua from 'https://deno.land/x/rua/mod.js'
const ua = rua()
let headers = {
  'user-agent': ua,
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "accept-language": "id,en-US;q=0.9,en;q=0.8",
  "cache-control": "max-age=0",
  "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "none",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1"
}

const tikTokDomains = [
  'http://vt.tiktok.com', 'http://app-va.tiktokv.com', 'http://vm.tiktok.com', 'http://m.tiktok.com', 'http://tiktok.com', 'http://www.tiktok.com', 'http://link.e.tiktok.com', 'http://us.tiktok.com',
  'https://vt.tiktok.com', 'https://app-va.tiktokv.com', 'https://vm.tiktok.com', 'https://m.tiktok.com', 'https://tiktok.com', 'https://www.tiktok.com', 'https://link.e.tiktok.com', 'https://us.tiktok.com'
]
const getToken = async function (url) {
  let cookieString = ''
  try {
    const response = await fetch('https://ssstik.io/id', {
      method: 'GET',
      headers: headers,
    })
    const cookies = parse(splitCookiesString(response.headers.get('set-cookie')))
    cookies.forEach(cookie => {
      cookieString += `${cookie.name}=${cookie.value}; `
    });
    const data = new URLSearchParams({
      id: url,
      locale: 'en',
      gc: 0,
      tt: 0,
      ts: 0
    })
    return { status: true, cookies, cookieString, data }
  } catch (error) {
    return { status: false }
  }

}
const getTiktokVideo = async function (url) {
  url = (!url.startsWith('http')) ? url = 'https://' + url : url
  const { status, cookieString, data } = await getToken(url);
  try {
    const response = await fetch('https://ssstik.io/abc?url=dl', {
      method: 'POST',
      headers: {
        'User-Agent': ua,
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'HX-Request': 'true',
        'HX-Trigger': '_gcaptcha_pt',
        'HX-Target': 'target',
        'HX-Current-URL': 'https://ssstik.io/id',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://ssstik.io',
        'Connection': 'keep-alive',
        'Referer': 'https://ssstik.io/id',
        'Cookie': cookieString,
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
      },
      body: data
    });
    const $ = cheerio.load(await response.text())
    if($('.panel.error').length == 0){
      const imgLink = $('img').attr('src')
      const linkVideo = $('a.u-bl.dl-button.download_link.without_watermark_hd.vignette_active').attr('href')
      return { success: true, imgLink, linkVideo }
    }
    
    throw new Error($('.panel.error').text())
  } catch (error) {
    return { success: false, massage: error.message }
  }
}

// console.log(await getTiktokVideo('https://www.instagram.com/instagram/reels/'))

export{
  getTiktokVideo
}
