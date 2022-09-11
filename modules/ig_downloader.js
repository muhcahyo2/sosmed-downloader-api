import{ parse, splitCookiesString } from 'https://cdn.skypack.dev/set-cookie-parser';
import rua from 'https://deno.land/x/rua/mod.js'
import { cheerio } from 'https://deno.land/x/denocheerio@1.0.0/mod.ts';

const ua = rua()

const getToken = async() => {
  const response = await fetch('https://sssinstagram.com/id', {
    headers: {
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'no-cache',
      'pragma': 'no-cache',
      'referer': 'https://www.google.com/',
      'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'cross-site',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent': ua,
    }
  });
  const cookies = parse(splitCookiesString(response.headers.get('set-cookie')), {map: true})
  const body = await response.text()
  const $ = cheerio.load(body)
  return {cookies}
}

const getLink = async (url) => {
  url = (!url.startsWith('http')) ? url = 'https://' + url : url
  const {cookies} = await getToken()
  const cookie = `${cookies.laravel_session.name}=${cookies.laravel_session.value};${cookies['XSRF-TOKEN'].name = cookies['XSRF-TOKEN'].value};`
  const response = await fetch('https://sssinstagram.com/id/request', {
    method: 'POST',
    headers: {
      'User-Agent': ua,
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json;charset=utf-8',
      'X-XSRF-TOKEN': cookies['XSRF-TOKEN'].value,
      'Origin': 'https://sssinstagram.com',
      'Connection': 'keep-alive',
      'Cookie': cookie,
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin'
    },
    body: JSON.stringify({
      'link': url,
      'token': ''
    })
  });
  return response.json()
}

export{
  getLink
}