import { test, expect } from '../../utils/fixtures';
import { extractPasswordFromJar } from '../../utils/javaRunner';

//get call
// test('get api call',async({request})=>{
//     const resp= await request.get('https://reqres.in/api/users?id=2')
//     // const resp=await request.get('https://api.escuelajs.co/api/v1/products/73')
//     const respBody=await resp.json()
//     // expect (respBody.data).toHaveProperty("first_name","/^janet$/i")
//     // expect (respBody._meta.message).toMatch(/sign up here/i)
//     const signMsg=respBody._meta.message.match(/is/gi)

    
//     console.log(signMsg)
// })


//post call 
test.only('post api call', async({request})=>{
    const resp=await request.post('https://dummyjson.com/posts/add',{
        data:{ title: extractPasswordFromJar(),
        // data:{ title: 'I am in love with someone else.',
        userId: 50
}}
    )
    const respBody=await resp.json()
    const id=respBody.id

    expect (respBody).toHaveProperty("userId",50)
    console.log(respBody)

    const getResp= await request.get(`https://dummyjson.com/posts/${id}`)
  const getRespBody= await getResp.json()
  console.log(getRespBody)

    
})

