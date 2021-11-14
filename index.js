const fs = require('fs')
const path = require('path')
const jimp = require('jimp')

const inputDirectoryPath = path.join(__dirname, './input')
const outputDirectoryPath = path.join(__dirname, './output')
const processedDirecoryPath = path.join(__dirname, './processed')

if (!fs.existsSync(inputDirectoryPath)) {
  fs.mkdirSync(inputDirectoryPath)
}
if (!fs.existsSync(outputDirectoryPath)) {
  fs.mkdirSync(outputDirectoryPath)
}
if (!fs.existsSync(processedDirecoryPath)) {
  fs.mkdirSync(processedDirecoryPath)
}

async function run() {
  const files = await fs.promises.readdir(inputDirectoryPath)
  await Promise.all(
    files
      .map(async (file) => {
        console.log(file)
        const inputImagePath = path.join(inputDirectoryPath, file)
        const outputImagePath = path.join(outputDirectoryPath, file)
        const processedImagePath = path.join(processedDirecoryPath, file)
        const image = await jimp.read(inputImagePath)
        await image.cover(160, 160)
        await image.quality(60)
        await image.writeAsync(outputImagePath)
        await fs.promises.rename(inputImagePath, processedImagePath)
      })
  )
}

run()
