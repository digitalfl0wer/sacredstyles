import Replicate from 'replicate'
import dotenv from 'dotenv'
import { writeFile } from "node:fs/promises";
dotenv.config()

const replicate = new Replicate({
auth: process.env.REPLICATE_API_TOKEN,
  userAgent: 'https://www.npmjs.com/package/create-replicate'
})
//  const model = 'black-forest-labs/flux-schnell:131d9e185621b4b4d349fd262e363420a6f74081d8c27966c9c5bcf120fa3985'

const input = {
  //  prompt: 'black forest gateau cake spelling out the words "FLUX SCHNELL", tasty, food photography, dynamic shot',
  // prompt: 'photo of man looking super-cool, riding on a segway scooter',
  // prompt: 'photo of SIR_SAVAGE_THE_21ST making a pizza',
  // prompt:' portrait of @brie, woman, waist-length knotless individualbraids, middle part, defined braid texture,tight clean parting, neat edges, natural hairline,honey blonde with golden highlights, subtle dark roots,beauty editorial lighting, soft studio rim light, plain studio background,no hat, no bangs, no head covering, no veils',
  // prompt:'portrait of @brie, woman, knotless braids waist-length, middle part, crisp parts, laid edges, even density, clean scalp visibility, honey blonde overall with golden highlights, gloss finish, neutral studio lighting, seamless backdrop, no accessories, no hair clips, no headwear',
  prompt:'portrait of @brie, black woman, on scalp finger waves, laid edges, even density, clean scalp visibility,honey blonde overall with golden highlights, gloss finish,neutral studio lighting, seamless backdrop,no accessories, no hair clips, no headwear',
  seed:89,
  num_inference_steps: 35,
// increased to 32 to get better results (detailed results)
  megapixels: '1',
// megapixels; adding hair detail
  guidance_scale: 4.5,
// guidance scale when number is lower resulkts are more realistic, but less obedient to the prompt
  aspect_ratio:'3:4',
  // portrait rartio to focus on hair detail
  num_outputs: 1,
  lora_scale:1,
  output_format: 'webp',
  output_quality: 80,
}

console.log('Using model: %s', model)
console.log('With input: %O', input)

console.log('Running...')
const output = await replicate.run(model, { input })
console.log('Done!', output)

const imageUrl = output[0]

// Fetch the image data
const response = await fetch(imageUrl)
const arrayBuffer = await response.arrayBuffer()
const buffer = Buffer.from(arrayBuffer)

// Save to file as PNG
await writeFile('./output.png', buffer)
console.log('Image saved as output.png')
// const seeds = [7, 13, 19, 23, 29, 37, 42, 55, 73, 89]; // spaced out
// for (const s of seeds) {
//   const out = await replicate.run(model, { input: { ...input, seed: s } });
//   const url = typeof out[0] === "string" ? out[0] : out[0].url();
//   const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
//   await writeFile(`./out_seed_${s}.webp`, buf);
// } loop for seed sweep, when you use remember to comment seed out of input
