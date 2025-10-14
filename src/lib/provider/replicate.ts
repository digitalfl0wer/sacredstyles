import Replicate from 'replicate';

type RunArgs = {
  prompt: string;
  seed?: number;
  steps?: number;
  guidance?: number;
  aspect?: '1:1' | '3:4' | '4:3';
  megapixels?: '1' | '1.5';
  lora_scale?: number;
  signal?: AbortSignal;
};

const DEFAULTS = {
  steps: 32,
  guidance: 4.2,
  aspect: '3:4' as const,
  megapixels: '1' as const,
  lora_scale: 1
};

async function resolveModelIdentifier(rawModel: string, client: Replicate): Promise<string> {
  // Allow env forms: "owner/model:version", "owner/model:latest", or just "owner/model"
  const hasVersion = rawModel.includes(':') && !rawModel.endsWith(':latest');
  if (hasVersion) return rawModel;

  const slug = rawModel.replace(':latest', '');
  const [owner, name] = slug.split('/');
  if (!owner || !name) throw new Error('Invalid model slug; expected "owner/model"');
  const model = await (client as any).models.get(owner, name);
  const latestVersionId = (model as any)?.latest_version?.id;
  if (!latestVersionId) throw new Error('Unable to resolve latest model version');
  return `${(model as any).owner}/${(model as any).name}:${latestVersionId}`;
}

export async function runReplicate({ prompt, seed, steps, guidance, aspect, megapixels, lora_scale, signal }: RunArgs): Promise<{
  imageUrl: string;
  meta: { steps: number; guidance: number; aspect: string };
}> {
  const token = process.env.REPLICATE_API_TOKEN;
  const model = process.env.REPLICATE_MODEL;
  console.log('[replicate] env set:', {
    hasToken: Boolean(token),
    hasModel: Boolean(model)
  });
  if (!token || !model) throw new Error('Missing Replicate env vars');

  const replicate = new Replicate({ auth: token, userAgent: 'sacred-styles-web' });

  // Support versionless or ":latest" model references by resolving to the latest version id
  const modelIdentifier = await resolveModelIdentifier(model!, replicate);

  const input: Record<string, unknown> = {
    prompt,
    seed: seed ?? 89,
    num_inference_steps: steps ?? DEFAULTS.steps,
    guidance_scale: guidance ?? DEFAULTS.guidance,
    aspect_ratio: aspect ?? DEFAULTS.aspect,
    megapixels: megapixels ?? DEFAULTS.megapixels,
    lora_scale: lora_scale ?? DEFAULTS.lora_scale,
    num_outputs: 1,
    output_format: 'webp',
    output_quality: 80
  };

  const output = (await replicate.run(modelIdentifier as any, { input })) as any;
  const first = Array.isArray(output) ? output[0] : output;
  const imageUrl: string = typeof first === 'string' ? first : first?.url?.() ?? String(first);
  return { imageUrl, meta: { steps: DEFAULTS.steps, guidance: DEFAULTS.guidance, aspect: DEFAULTS.aspect } };
}

