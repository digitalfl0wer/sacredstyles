import Replicate from 'replicate'
import 'dotenv/config'

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN })

const zipUrl = process.env.TRAINING_ZIP_URL // e.g., https://.../photos.zip
const trigger = process.env.TRAINING_TRIGGER || '@brie'
const baseModel = process.env.TRAINING_BASE_MODEL || 'black-forest-labs/flux-schnell:131d9e18...'

if (!zipUrl) {
  console.error('Missing TRAINING_ZIP_URL')
  process.exit(1)
}

console.log('Starting LoRA training…')
console.log({ trigger, zipUrl, baseModel })

// Placeholder: replace with actual Replicate training endpoint when available for your model
// For some models, training uses "replicate.trainings.create" (check provider docs).
// Here we demonstrate a generic call signature.ADDED
try {
  const training = await replicate.trainings.create(baseModel, {
    input: {
      input_images: zipUrl,
      trigger_word: trigger
    }
  })
  console.log('Training started:', training)
} catch (e) {
  console.error('Training failed:', e)
  process.exit(1)
}

