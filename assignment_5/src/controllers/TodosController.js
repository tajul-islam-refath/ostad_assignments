const TodosModel = require("../models/TodosModel");

exports.createTodo = (req, res) => {
  let reqBody = req.body;
  TodosModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(200).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

exports.deleteTodo = (req, res) => {
  let id = req.params.id;
  let Query = { _id: id };
  TodosModel.remove(Query, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

exports.updateTodoStatus = (req, res) => {
  let id = req.params.id;
  let status = req.params.status;
  let Query = { _id: id };
  let reqBody = { status: status };
  TodosModel.updateOne(Query, reqBody, (err, data) => {
    if (err) {
      res.status(400).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

exports.listTodoByStatus = (req, res) => {
  let status = req.params.status;
  TodosModel.aggregate(
    [
      { $match: { status: status } },
      {
        $project: {
          _id: 1,
          userName: 1,
          subject: 1,
          description: 1,
          status: 1,
          createdDate: {
            $dateToString: {
              date: "$createdDate",
              format: "%d-%m-%Y",
            },
          },
        },
      },
    ],
    (err, data) => {
      if (err) {
        res.status(400).json({ status: "fail", data: err });
      } else {
        res.status(200).json({ status: "success", data: data });
      }
    }
  );
};
