// src/models/User.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const User = {
  // Função para encontrar um usuário pelo email
  findByEmail: async (email) => {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  },

  // Função para criar um novo usuário
  create: async (data) => {
    return await prisma.user.create({
      data: data,
    });
  },

  // Função para atualizar a senha de um usuário
  updatePassword: async (userId, newPassword) => {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newPassword,
      },
    });
  },
};

export default User;
