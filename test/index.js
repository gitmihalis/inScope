const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()

chai.use(chaiHttp)

describe('Api', function(){
  it('should have a live api', function(done){
    chai.request('localhost:3000')
      .get('/api')
      .end(function(err, res){
        res.status.should.equal(200)
        done()
      })
  })
})