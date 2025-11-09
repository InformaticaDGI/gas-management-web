
import type { CodegenConfig } from '@graphql-codegen/cli';
import { API_BASE_URL } from './lib/constants';

const config: CodegenConfig = {
  overwrite: true,
  schema: API_BASE_URL,
  documents: "**/*.{gql,graphql}",
  generates: {
    "graphql/generated/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false
      }
    }
  }
};

export default config;
