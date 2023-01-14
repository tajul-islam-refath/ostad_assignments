const router = require("express").Router();
const ProfileController = require("../controllers/ProfileController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const TodosController = require("../controllers/TodosController");

router.post("/registration", ProfileController.registration);
router.post("/login", ProfileController.login);
router.post(
  "/profileUpdate",
  AuthVerifyMiddleware,
  ProfileController.profileUpdate
);
router.get(
  "/profileDetails",
  AuthVerifyMiddleware,
  ProfileController.profileDetails
);

router.post("/createTodos", AuthVerifyMiddleware, TodosController.createTodos);
router.get(
  "/updateTodosStatus/:id/:status",
  AuthVerifyMiddleware,
  TodosController.updateTodosStatus
);
router.get(
  "/listTodosByStatus/:status",
  AuthVerifyMiddleware,
  TodosController.listTodosByStatus
);
router.get(
  "/deleteTodos/:id",
  AuthVerifyMiddleware,
  TodosController.deleteTodos
);

module.exports = router;
