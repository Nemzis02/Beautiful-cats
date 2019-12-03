const yup = require('yup');

module.exports = {
  createUser: yup.object().shape({
    userName: yup
      .string()
      .required()
      .min(2),
    avatar: yup.string(),
    email: yup.string().email(),
    password: yup
      .string()
      .required()
      .min(6)
  })
};
