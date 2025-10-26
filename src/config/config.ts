export const externalUrl = process.env.RENDER_EXTERNAL_URL;
export const port =
	externalUrl && process.env.PORT ? parseInt(process.env.PORT) : 3000;
