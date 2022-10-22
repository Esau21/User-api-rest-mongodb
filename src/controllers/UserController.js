const User = require('../models/UserModel');
const bcrypt = require('bcrypt');


const GetUser = (req, res) => {
    User.find((err, usuarios) => {
        if (!err) {
            res.status(200).json(usuarios);
        } else {
            res.status(400).send(err.message);
        }
    });
}

const GetUserId = (req, res) => {
   User.findById(req.params.id, (err, users) => {
        if (!err) {
            res.status(200).json(users);
        } else {
            res.status(400).send(err.message);
        }
   });
}

const RegisterUser = async (req, res) => {
    const { username, email, password, pais } = req.body;
    const PasswordHashed = await bcrypt.hash(password, 10);
    const new_user = new User({
        username,
        email,
        password: PasswordHashed,
        pais,
    });

    try {
        const guardar_datos = await new_user.save();
        res.status(200).json(guardar_datos);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const LoginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({
            username,
        });
        if (!user) {
            res.status(400).json("tu nombre de usuario no es valido");
        }
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            res.status(400).json("Tu clave no es correcta");
        }

        res.status(200).json("Tu estas logueado");
       
    } catch (error) {
        res.status(400).send(error.message);
    }

}

const UpdateUser = async (req, res) => {
    const {username, email, password, pais} = req.body;
    const PasswordHashed = await bcrypt.hash(password, 10);
    const id = req.params.id;
    const update_user = ({
        username,
        email,
        password: PasswordHashed,
        pais,
    });
    const opciones = { opciones: true };
    try {
        const updated = await User.findByIdAndUpdate(
            id,
            update_user,
            opciones,
        );
        if (!updated) {
            res.status(400).json("no se ah podido actualizar el usuario");
        }
        res.status(200).json({ status: "Usuario actualizado con exito" });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const DeleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const delete_user = await User.findByIdAndDelete(
            id,
        );
        if (!delete_user) {
            res.status(400).json("no se ha podido eliminar el usuario")
        }
        res.status(200).json("Usuario eliminado con exito");
    } catch (error) {
        res.status(400).send(error.message);
    }
}



module.exports = { GetUser, GetUserId, RegisterUser, LoginUser, UpdateUser, DeleteUser };