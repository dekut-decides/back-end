import supertest from "supertest"
import { should,expect } from "chai";
import mocha from "mocha";
import app from "../index.js"
const server = supertest.agent(app);
describe("Server should",()=>{
    it("return success message after GET / request",(done)=>{
            server
               .get('/')
               .set('Connection','keep alive')
               .set('Content-type', 'application/json')
               .expect(200)
               .end((err,res)=>{
                   if(err){
                    console.log(err);
                   }
                   res.status.should.equal(200);
                   done();
               })
    })
})