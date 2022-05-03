const clientsRoutes = (app, fs) => {
  // variables
  const dataPath = './data/clients.json';
  var lodash = require("lodash");


  //INSERT
  app.post('/client', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
        return
      }
      const clientsData = JSON.parse(data);
      const newClient = JSON.parse(JSON.stringify(req.body));
      if (newClient.id != '' && newClient.name != '') {
        var retorno = lodash.filter(clientsData.clients, { "id": newClient.id });
        if (retorno.length <= 0) {
          clientsData.clients.push(newClient);

          fs.writeFile(dataPath, JSON.stringify(clientsData, null, 2), 'utf8', err => {
            if (err) {
              res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
              return
            }
            res.status(200).send(JSON.parse('{"msg": "novo cliente criado"}'));
          });
        } else res.status(500).send(JSON.parse('{"msg": "CPF já existente"}'));
      } else res.status(500).send(JSON.parse('{"msg": "preencha os campos do formulário"}'));
    });
  });

  //SELECT ALL
  app.get('/clients', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
        return
      }
      const clientsData = JSON.parse(data);
      res.send(clientsData);
    });
  });

  //SELECT ONE
  app.get('/client/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
        return
      }
      const busca = req.params['id'];
      const clientsData = JSON.parse(data);
      var retorno = lodash.filter(clientsData.clients, { "id": busca });

      if (retorno.length <= 0) {
        res.status(404).send(JSON.parse('{"msg": "cliente não encontrado"}'));
        return
      }
      res.send(retorno);
    });
  });

  //UPDATE
  app.put('/client/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
      }
      const id = req.params['id'];
      const clientUpdated = JSON.parse(JSON.stringify(req.body));
      const clientsData = JSON.parse(data);

      var index = clientsData.clients.map(function (x) { return x["id"]; }).indexOf(id);
      if (index == -1) {
        res.status(404).send(JSON.parse('{"msg": "cliente não encontrado"}'));
        return;
      }
      clientsData.clients[index].name = clientUpdated.name;

      fs.writeFile(dataPath, JSON.stringify(clientsData, null, 2), 'utf8', err => {
        if (err) {
          res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
          return
        }
        res.status(200).send(JSON.parse('{"msg": "cliente alterado"}'));
      });
    });
  });

  //DELETE
  app.delete('/client/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
        return
      }
      const id = req.params['id'];
      const clientsData = JSON.parse(data);
      var index = clientsData.clients.map(function (x) { return x["id"]; }).indexOf(id);
      if (index == -1) {
        res.status(404).send(JSON.parse('{"msg": "cliente não encontrado"}'));
        return;
      }
      clientsData.clients.splice(index, 1);
      fs.writeFile(dataPath, JSON.stringify(clientsData, null, 2), 'utf8', err => {
        if (err) {
          res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
          return
        }
        res.status(200).send(JSON.parse('{"msg": "cliente apagado"}'));
      });
    });
  });

};

module.exports = clientsRoutes;