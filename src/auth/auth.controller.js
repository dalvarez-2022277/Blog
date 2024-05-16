import User from "../users/user.model.js";
import bcryptjs from "bcryptjs";
//import { generarJWT } from "../helpers/generate-JWT.js";
import { generarJWT } from "../helpers/generate-JWT.js";
import { existeEmail } from "../helpers/db-validators.js";


export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt);

    // Utiliza el middleware para verificar el correo y determinar el rol
    const { role } = await existeEmail(email);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role // Usa el rol obtenido de la función existeEmail
    });

    return res.status(200).json({
      msg: "user has been added to database",
      userDetails: {
        user: user.username,
        email: user.email,
        role: user.role // Incluye el rol en la respuesta
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("No se pudo registrar el usuario");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //verificar si el email existe:
    const user = await User.findOne({ email: email.toLowerCase() });

    if(user && (await bcryptjs.compare(password, user.password))){
      const token = await generarJWT(user.id, user.email)

      res.status(200).json({
        msg: "Login",
        userDetails: {
          email: user.email,
          token: token
        },
      });
    }

    if (!user) {
      return res
        .status(400)
        .send(`Wrong credentials, ${email} doesn't exists en database`);
    }

    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).send("wrong password");
    }
   
  } catch (e) {
    res.status(500).send("Comuniquese con el administrador");
  }
};
