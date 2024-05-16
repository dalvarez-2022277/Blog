import User from '../users/user.model.js';

export const existeEmail = async (email = '') => {
    try {
        const existe = await User.findOne({ email });
        if (existe) {
            throw new Error(`El email ${email} ya fue registrado`);
        }
        const role = email === 'ricardoalvaraez@gmail.com' ? 'admin' : 'user';
        return { email, role };
    } catch (error) {
        throw new Error(`Error al verificar el correo electrónico: ${error.message}`);
    }
};



export const existeUsuarioById = async (id = "") => {
  const existeUsuario = await User.findById(id);
  if (!existeUsuario) {
    throw new Error(` el ID: ${id} no existe`);
  }
};
