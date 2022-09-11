import { Router } from "https://deno.land/x/oak/mod.ts";
import {getLink as getLinkIg} from '../modules/mod.js'
import {getTiktokVideo} from '../modules/mod.js'

const ApiRouter = new Router({
  prefix: '/api'
})

ApiRouter
.get('/ig', ({request, response})=>{
  response.body = {
    'a':'asdfsfad'
  }
  response.type = 'application/json'
  response.status = 200
  console.log(request)
})
.post('/ig', async ({request, response})=> {
  const {url} = await request.body({type: 'json'}).value
  response.body = await getLinkIg(url)
})
.post('/tiktok', async ({request, response})=> {
  const {url} = await request.body({type: 'json'}).value
  const tiktokData = await getTiktokVideo(url)
  response.type = 'applications/json'

  if(!tiktokData.success){
    response.status = 422
    response.body = tiktokData
  }
  response.body = tiktokData
  return response

})
export default ApiRouter