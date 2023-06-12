const connection = require("../config/database");
const { getALLUsers , getUserById, updateUserById, deleteUserById} = require("../services/CRUDService");
const getHomePage = async (req, res) => {
  let results = await getALLUsers();
  return res.render("home.ejs", { listUsers: results });
};
const getABC = (req, res) => {
  res.send("ABC");
};
const getHoiDanIT = (req, res) => {
  res.render("sample.ejs");
};
const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  console.log(">>>email = ", email, " name = ", name, " city = ", city);

  let [results, fields] = await connection.query(
    `INSERT INTO Users (email,name,city)
    Values (?,?,?)`,
    [email, name, city]
  );
  res.send("Created user succed!");
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async(req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render("edit.ejs",{userEdit: user});
};
const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let userId = req.body.userId;
  
  await updateUserById(email, name, city, userId);
  res.redirect('/');
};

const postDeleteUser = async(req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render("delete.ejs",{userEdit: user});
};
const postHandleRemoveUser = async(req, res) => {
  const id = req.body.userId;
  await deleteUserById(id);
  res.redirect('/');
}


module.exports = {
  getHomePage,
  getABC,
  getHoiDanIT,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,postDeleteUser,postHandleRemoveUser
};
