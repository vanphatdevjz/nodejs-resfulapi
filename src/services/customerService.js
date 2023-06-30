const Customer = require("../models/customer");
const aqp = require("api-query-params");

const createCustomerService = async (customerData) => {
  try {
    let result = await Customer.create({
      name: customerData.name,
      address: customerData.address,
      phone: customerData.phone,
      email: customerData.email,
      image: customerData.image,
      description: customerData.description,
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const createArrayCustomerService = async (arr) => {
  try {
    let result = await Customer.insertMany(arr);
    return result;
  } catch (error) {
    console.log("error>>>>", error);
    return null;
  }
};
const getAllCustomerService = async (limit, page, name, queryString) => {
  try {
    let result = null;

    if (limit && page && name) {
    
      let offset = (page - 1) * limit;
      const { filter } = aqp(queryString);
      delete filter.page;
      console.log("filter: ", filter);
      result = await Customer.find(filter).skip(offset).limit(limit).exec();
    } else {
      result = await Customer.find({});
    }
    return result;
  } catch (error) {
    console.log(">>>error ", error);
    return null;
  }
};
const putUpdateCustomerService = async (id, name, email, address) => {
  try {
    let result = await Customer.updateOne(
      { _id: id },
      { name, email, address }
    );
    return result;
  } catch (error) {
    console.log(">>>error: ", error);
    return null;
  }
};
const deleteACustomerService = async (id) => {
  try {
    let result = await Customer.deleteById(id);
    return result;
  } catch (error) {
    console.log(">>>error: ", error);
    return null;
  }
};
const deleteArrayCustomerService = async (ids) => {
  try {
    let result = await Customer.delete({ _id: { $in: ids } });
    return result;
  } catch (error) {
    console.log(">>>error: ", error);
    return null;
  }
};

module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomerService,
  putUpdateCustomerService,
  deleteACustomerService,
  deleteArrayCustomerService,
};
