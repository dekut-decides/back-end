import supertest from "supertest"
import { should,expect } from "chai";
import mocha from "mocha";
import dotenv from "dotenv";
import app from "../index.js"
import { model, models } from "mongoose";

const server = supertest.agent(app);
dotenv.config();

const validAdmin = {email:"",
               password:""};

               
const invalidAdmin = {email:"",
               password:""};


before((done)=>{
    models.sequelize.sync({force:true}).then(()=>{
        done(null);
    }).catch((errors)=>{
        done(errors);
    })
})

describe("Admin api",()=>{
    it("return a valid Html and 200 response code",(done)=>{
            server
               .post('/AdminLogin')
               .set('Connection','keep alive')
               .set('Content-type', 'application/json')
               .type('form')
               .send(validAdmin)
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
               .post('/AdminLogin')
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
})


