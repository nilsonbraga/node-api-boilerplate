import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation Fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const { name, email, password_hash } = await User.create(req.body);

    return res.json({ name, email, password_hash });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      old_password: Yup.string().min(6),
      password: Yup.string().when('old_password', (old_password, field) =>
        old_password ? field.required() : field
      ),
      confirm_password: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { old_password } = req.body;

    if (req.body.email) {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res
          .status(400)
          .json({ error: 'This email was already registered' });
      }
    }

    const user = await User.findByPk(req.user_id);

    if (!(await user.checkPassword(old_password))) {
      return res.status(401).json({ error: 'Old password does not match' });
    }

    const { id, name, email } = await user.update(req.body);

    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(req.params.id);

    if (user) {
      await User.destroy({ where: { id } });
      return res.json('Item deleted.');
    }
    return res.json('Id does not exists.');
  }

  async findAll(req, res) {
    const user = await User.findAll({
      attributes: ['id', 'name', 'email'],
      order: [['name', 'ASC']],
    });
    return res.json(user);
  }
}

export default new UserController();
