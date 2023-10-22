import UserModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { createAccessToken } from '../libs/jwt.js'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'
export const newUser = async (req, res) => {
  const { name, phone, email, password } = req.body
  try {
    const userFound = await UserModel.findOne({ email })
    if (userFound) {
      return res.status(400).json({
        message: 'This email is already use'
      })
    }
    const hash = await bcrypt.hash(password, 12)
    const newUser = new UserModel({
      name,
      phone,
      email,
      password: hash
    })
    const userSave = await newUser.save()
    const token = await createAccessToken({
      id: userSave.id
    })
    res.cookie('token', token)
    res.json(userSave)
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}
export const Login = async (req, res) => {
  const { email, password } = req.body
  try {
    const userFound = await UserModel.findOne({ email })
    if (!userFound) {
      return res.status(400).json({
        message: ['Invalid credentials']
      })
    }
    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) {
      return res.status(400).json({
        message: ['Invalid credentials']
      })
    }
    const token = await createAccessToken({
      id: userFound._id,
      name: userFound.name
    })
    res.cookie('token', token)
    res.json({
      id: userFound._id,
      username: userFound.name,
      email: userFound.email
    })
    console.log(userFound._id)
  } catch (err) {
    return res.status(500).json({
      message: 'Bad request, server response: ', err
    })
  }
}

export const profile = async (req, res) => {
  try {
    const userProfile = await UserModel.findById(req.params.id)
    if (!userProfile) {
      return res.status(404).json({
        message: 'please Sign up'
      })
    }
    return res.json({
      name: userProfile.name,
      phone: userProfile.phone,
      email: userProfile.email,
      role: userProfile.role,
      createdAt: userProfile.createdAt
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Somethings goes wrong'
    })
  }
}

export const Logout = async (req, res) => {
  res.clearCookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}

export const verifyToken = async (req, res) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  jwt.verify(token, SECRET_KEY, async (error, user) => {
    if (error) return res.status(401).json({ message: 'Unauthorized' })

    const userFound = await UserModel.findById(user.id)
    if (!userFound) return res.status(401).json({ message: 'Unauthorized' })

    return res.json({
      id: userFound._id,
      username: userFound.name,
      email: userFound.email
    })
  })
}
