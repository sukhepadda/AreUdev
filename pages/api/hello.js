export default function handler(req, res) {
  res.status(200).json({
    message: "Hello Api is Working",
    name: "Monkey",
    age: 20,
  })
}