import supertest from "supertest"
import { should,expect } from "chai";
import mocha from "mocha";
import dotenv from "dotenv";
import app from "../index.js";

const server = supertest.agent(app);
dotenv.config();

const newUser = {email:"",
               password:""};

               
const invalidUser = {email:"",
               password:"",};

const registerUser = {regNo:"",
                      address:"",}


before((done)=>{
    models.sequelize.sync({force:true}).then(()=>{
        done(null);
    }).catch((errors)=>{
        done(errors);
    })
})

describe("User api",()=>{
    it("return a valid Html and 200 response code",(done)=>{
            server
               .post('/VoterSignUp')
               .set('Connection','keep alive')
               .set('Content-type', 'application/json')
               .type('form')
               .send(newUser)
               .expect(200)
               .end((err,res)=>{
                   if(err){
                    console.log(err);
                   }
                   res.status.should.equal(200);
                   done();
               })
    })

      it("throw a 400 error code when supplied with invalid credentials",(done)=>{
            server
               .post('/VoterLogin')
               .set('Connection','keep alive')
               .set('Content-type', 'application/json')
               .type('form')
               .send(invalidAdmin)
               .expect(400)
               .end((err,res)=>{
                   if(err){
                    console.log(err);
                   }
                   res.status.should.equal(400);
                   done();
               })
    })


      it("return a 200 response code when a user registers",(done)=>{
            server
               .post('/RegisterVoter')
               .set('Connection','keep alive')
               .set('Content-type', 'application/json')
               .type('form')
               .send(registerUser)
               .expect(200)
               .end((err,res)=>{
                   if(err){
                    console.log(err);
                   }
                   res.status.should.equal(400);
                   done();
               })
    })
})



