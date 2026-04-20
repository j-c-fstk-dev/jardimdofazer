import { verifyToken, getTokenFromHeader } from '../services/jwtService.js';

export const authMiddleware = (req, res, next) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token não fornecido. Acesso negado.'
    });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

export const logAuthMiddleware = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (token) {
    try {
      const decoded = verifyToken(token);
      console.log(`[AUTH] Usuário ${decoded.email} acessou ${req.method} ${req.path}`);
    } catch (error) {
      console.log(`[AUTH] Token inválido em ${req.method} ${req.path}`);
    }
  }
  next();
};
