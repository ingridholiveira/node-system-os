const ordersRoutes = (app, fs) => {
  // variables
  const dataPath = './data/orders.json';
  var lodash = require("lodash");


  //INSERT
  app.post('/order', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
        return
      }
      const ordersData = JSON.parse(data);
      const newOrder = JSON.parse(JSON.stringify(req.body));
      ordersData.orders.push(newOrder);

      fs.writeFile(dataPath, JSON.stringify(ordersData, null, 2), 'utf8', err => {
        if (err) {
          res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
          return
        }
        res.status(200).send(JSON.parse('{"msg": "nova ordem de serviço criada"}'));
      });
    });
  });

  //SELECT ALL
  app.get('/orders', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
        return
      }
      const ordersData = JSON.parse(data);
      res.send(ordersData);
    });
  });

  //SELECT ONE
  app.get('/order/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
        return
      }
      const busca = req.params['id'];
      const ordersData = JSON.parse(data);
      var retorno = lodash.filter(ordersData.orders, {
        "id": busca
      });

      if (retorno.length <= 0) {
        res.status(404).send(JSON.parse('{"msg": "order not found"}'));
        return
      }
      res.send(retorno);
    });
  });

  //UPDATE
  app.put('/order/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
      }
      const id = req.params['id'];
      const orderUpdated = JSON.parse(JSON.stringify(req.body));
      const ordersData = JSON.parse(data);

      var index = ordersData.orders.map(function (x) {
        return x["id"];
      }).indexOf(id);
      if (index == -1) {
        res.status(404).send(JSON.parse('{"msg": "order not found"}'));
        return;
      }
      ordersData.orders[index].date = orderUpdated.date;
      ordersData.orders[index].client = orderUpdated.client;
      ordersData.orders[index].problem = orderUpdated.problem;
      ordersData.orders[index].contributor = orderUpdated.contributor;

      fs.writeFile(dataPath, JSON.stringify(ordersData, null, 2), 'utf8', err => {
        if (err) {
          res.status(500).send(JSON.parse('{"msg": "' + err + '"}'));
          return
        }
        res.status(200).send(JSON.parse('{"msg": "order updated"}'));
      });
    });
  });


};

module.exports = ordersRoutes;