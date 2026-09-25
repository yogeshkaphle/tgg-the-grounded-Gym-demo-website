interface ImportMetaEnv {
  /** Web3Forms access key. Set in Vercel project settings; empty means test mode. */
  readonly PUBLIC_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
