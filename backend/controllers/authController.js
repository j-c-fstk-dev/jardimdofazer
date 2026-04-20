import { generateToken } from '../services/jwtService.js';

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email e senha são obrigatórios'
    });
  }

  const ADMIN_EMAIL = 'admin@jardim.com';
  const ADMIN_PASSWORD = 'senha123';

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(401).json({
      success: false,
      message: 'Email ou senha incorretos'
    });
  }

  const token = generateToken(1, email);

  return res.status(200).json({
    success: true,
    message: 'Login realizado com sucesso',
    data: {
      token,
      user: {
        id: 1,
        email,
        name: 'Admin'
      }
    }
  });
};

export const logout = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Logout realizado com sucesso'
  });
};

export const verifyAuth = (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Token válido',
    user: req.user
  });
};
