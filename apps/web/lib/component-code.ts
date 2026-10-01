export interface ComponentCode {
  files: { path: string; content: string; type: string }[];
  install: { dependencyCommand: string | null; registryDependencyCommand: string | null; instructions: string[] };
  license: string;
}
