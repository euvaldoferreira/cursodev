import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import user from "models/users.js";

const router = createRouter();

router.get(getHandler);
router.patch(patchHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const username = request.query.username;
  const userFound = await user.findOnebyUsername(username);
  return response.status(200).json(userFound);
}
async function patchHandler(request, response) {
  const username = request.query.username;
  const userInputValues = request.body;

  const updateUser = await user.update(username, userInputValues);
  return response.status(200).json(updateUser);
}
