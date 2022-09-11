
fetch('https://snapsave.io/en', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:103.0) Gecko/20100101 Firefox/103.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Referer': 'https://www.google.com/',
    'Connection': 'keep-alive',
    'Cookie': '__cflb=0H28v5h2Jp1uMMG3ZEQBd8KKQyRTGF92kCkBAupH5df; _ga_914CLHGVRY=GS1.1.1662376584.1.0.1662376584.0.0.0; _ga=GA1.1.712022602.1662376585; __atuvc=1%7C36; __atuvs=6315da877ad108f8000; __atssc=google%3B1',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'cross-site',
    'Pragma': 'no-cache',
    'Cache-Control': 'no-cache'
  }
});

fetch('https://snapsave.io/api/ajaxSearch', {
  method: 'POST',
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:103.0) Gecko/20100101 Firefox/103.0',
    'Accept': '*/*',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'Origin': 'https://snapsave.io',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'Referer': 'https://snapsave.io/en',
    'Connection': 'keep-alive',
    'Cookie': '.AspNetCore.Antiforgery.tzLLsEchi_4=CfDJ8ClPndJ0vfFBgIX4PL9DiWl-jG_JP9QelMr8KXQ-7ugbK9x4AtDYGXAeVv5Kfl78rinLlNFmVhx9IaR4JFZJAr7pZ-U4gsLtv3Wunufe-hphuhbwRCRgLFhzUt6koCwvSkzFLkQjxFLIsrFd9GztrIA; __cflb=0H28v5h2Jp1uMMG3ZEQBd8KKQyRTGF92kCkBAupH5df; _ga_914CLHGVRY=GS1.1.1662376584.1.1.1662376645.0.0.0; _ga=GA1.1.712022602.1662376585; __atuvc=2%7C36; __atuvs=6315da877ad108f8001; __atssc=google%3B2'
  },
  body: new URLSearchParams({
    'q': 'https://www.instagram.com/reel/Ch74NvrD2UV/',
    'vt': 'home'
  })
})();