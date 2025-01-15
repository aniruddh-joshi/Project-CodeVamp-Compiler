import { ExecutionManager } from './execution/ExecutionManager';

export async function executeCode(
  code: string,
  languageId: string,
  input: string = ''
): Promise<string> {
  return ExecutionManager.execute(code, languageId, input);
}