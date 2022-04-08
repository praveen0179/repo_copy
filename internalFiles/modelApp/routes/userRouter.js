const express = require('express');

const app = express();

app.use(express.json());

const userRouter = express.Router();

const {getUser, postUser, deleteUser, updateUser, getAllUser, getUserById, getCookies, setCookies, protectRoute} = require('../../controller/userController');

/*
userRouter.route('/').get(protectRoute, getUser).post(postUser).patch(updateUser).delete(deleteUser);

userRouter.route('/getCookies').get(getCookies);

userRouter.route('/setCookies').get(setCookies);

userRouter.route('/:id').get(getUserById);
*/

//options for user
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser);

app.use(protectRoute);
userRouter.route('/userProfile').get(getUser);

app.use(isAuthorized(['admin']));
userRouter.route('').get(getAllUser);

module.exports = userRouter;
