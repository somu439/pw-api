import { test, expect } from '../../utils/fixtures';
import { extractPasswordFromJar } from '../../utils/javaRunner';
import * as fs from 'fs';
import * as path from 'path';

function readCsvIds(csvPath: string): number[] {
    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.trim().split('\n').map(l => l.trim());
    // skip header row
    return lines.slice(1).map(Number);
}
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


test('post request from json file', async ({ request }) => {
    const jsonFile=require('../../test-data/post_req_body.json')
   const postResp =await request.post('/booking', {
        data:jsonFile})
        
        const respBody= await postResp.json()
        console.log(respBody) 
        expect(postResp.status()).toBe(200)  
        expect(postResp.ok()).toBeTruthy();   
        expect(respBody.booking).toHaveProperty("firstname","lets talk")
        expect(respBody.booking.bookingdates).toHaveProperty("checkin","2018-01-01")

});


/post call
test.only('post api call with csv check', async({request})=>{
    const csvPath = path.resolve(__dirname, '../resources/csv/data.csv');
    const validUserIds = readCsvIds(csvPath);

    const userId = 50;

    if (!validUserIds.includes(userId)) {
        test.info().annotations.push({
            type: 'Mismatch',
            description: `userId ${userId} is not in CSV values [${validUserIds.join(', ')}]`
        });
        expect.soft(validUserIds, `Mismatch: userId ${userId} is not in CSV values [${validUserIds.join(', ')}]`).toContain(userId);
        return;
    }

    const resp=await request.post('https://dummyjson.com/posts/add',{
        // data:{ title: extractPasswordFromJar(),
        data:{ title: 'I am in love with someone else.',
        userId
}}
    )
    const respBody=await resp.json()
    const id=respBody.id

    expect(respBody).toHaveProperty("userId", userId)
    console.log(respBody)

    const getResp= await request.get(`https://dummyjson.com/posts/${id}`)
  const getRespBody= await getResp.json()
//   console.log(getRespBody)


})

