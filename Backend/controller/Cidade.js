
module.exports = {
    async index(req, res) {
      let cep = req.query.cep;
      return cep;
      // let result = await fetch('https://cep.awesomeapi.com.br/json/'+cep)
      // return result
    }
} 