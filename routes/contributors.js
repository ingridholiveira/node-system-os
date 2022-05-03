const contributorsRoutes = (app, fs) => {
  // variables
  const dataPath = './data/contributors.json';
  var lodash = require("lodash");

  //INSERT
  app.post('/contributor', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
        return
      }
      const contributorsData = JSON.parse(data);
      const newContributor = JSON.parse(JSON.stringify(req.body));
      contributorsData.contributors.push(newContributor);

      fs.writeFile(dataPath, JSON.stringify(contributorsData, null, 2), 'utf8', err => {
        if (err) {
          res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
          return
        }
        res.status(200).send(JSON.parse('{"msg": "novo colaborador criado"}'));
      });
    });
  });

  //SELECT ALL
  app.get('/contributors', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
        return
      }
      const contributorsData = JSON.parse(data);
      res.send(contributorsData);
    });
  });

  //SELECT ONE
  app.get('/contributor/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
        return
      }
      const busca = req.params['id'];
      const contributorsData = JSON.parse(data);
      var retorno = lodash.filter(contributorsData.contributors, {
        "id": busca
      });

      if (retorno.length <= 0) {
        res.status(404).send(JSON.parse('{"msg": "colaborador não encontrado"}'));
        return
      }
      res.send(retorno);
    });
  });

  //UPDATE
  app.put('/contributor/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
      }
      const id = req.params['id'];
      const contributorUpdated = JSON.parse(JSON.stringify(req.body));
      const contributorsData = JSON.parse(data);

      var index = contributorsData.contributors.map(function (x) {
        return x["id"];
      }).indexOf(id);
      if (index == -1) {
        res.status(404).send(JSON.parse('{"msg": "colaborador não encontrado"}'));
        return;
      }
      contributorsData.contributors[index].name = contributorUpdated.name;
      contributorsData.contributors[index].email = contributorUpdated.email;
      contributorsData.contributors[index].password = contributorUpdated.password;

      fs.writeFile(dataPath, JSON.stringify(contributorsData, null, 2), 'utf8', err => {
        if (err) {
          res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
          return
        }
        res.status(200).send(JSON.parse('{"msg": "colaborador alterado"}'));
      });
    });
  });

  //DELETE
  app.delete('/contributor/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
        return
      }
      const id = req.params['id'];
      const contributorsData = JSON.parse(data);
      var index = contributorsData.contributors.map(function (x) {
        return x["id"];
      }).indexOf(id);
      if (index == -1) {
        res.status(404).send(JSON.parse('{"msg": "colaborador não encontrado"}'));
        return;
      }
      contributorsData.contributors.splice(index, 1);
      fs.writeFile(dataPath, JSON.stringify(contributorsData, null, 2), 'utf8', err => {
        if (err) {
          res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
          return
        }
        res.status(200).send(JSON.parse('{"msg": "colaborador apagado"}'));
      });
    });
  });

  //SELECT ONE
  app.post('/contributor/login', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      const contributorsData = JSON.parse(data);
      const login = JSON.parse(JSON.stringify(req.body));
      var retorno = lodash.filter(contributorsData.contributors, function (contributor){
        return contributor.email == login.login && contributor.password == login.password;
      });
      if (retorno.length <= 0) {
        res.status(404).send(JSON.parse('{"msg": "login ou senha invalidos"}'));
        return
      }
      res.send(retorno);
    });
  });

};

module.exports = contributorsRoutes;