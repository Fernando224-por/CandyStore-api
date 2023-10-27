import ProductModel from '../models/product.model.js'
export const newProduct = async (req, res) => {
  const { name, region, price, category } = req.body
  try {
    const newProduct = new ProductModel({
      name,
      region,
      price,
      category,
      user: req.user.id // anclaje al usuario que registra el producto
    })
    const saveProduct = await newProduct.save()
    console.log(saveProduct)
    res.json(saveProduct)
  } catch (err) {
    return res.status(500).json({
      message: 'Bad request, Server response: ', err
    })
  }
}

export const getProductsSeller = async (req, res) => {
  try {
    const productsSeller = await ProductModel.find({
      user: req.user.id
    }).populate('user')
    res.json(productsSeller)
  } catch (err) {
    return res.status(500).json({
      message: 'Bad request, Server response', err
    })
  }
}

export const getProductsGuest = async (req, res) => {
  try {
    const products = await ProductModel.find({})
    console.log(req.user)
    res.json(products)
  } catch (err) {
    return res.status(500).json({
      message: 'bad request, Server response:', err
    })
  }
}
