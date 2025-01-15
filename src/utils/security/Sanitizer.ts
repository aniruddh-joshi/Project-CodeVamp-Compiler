// Security utilities for code execution
export class CodeSanitizer {
  private static readonly BLOCKED_PATTERNS = [
    /process\.exit/,
    /require\s*\(/,
    /import\s*\(/,
    /eval\s*\(/,
    /Function\s*\(/,
    /child_process/,
    /fs\./,
    /localStorage/,
    /sessionStorage/,
    /indexedDB/,
    /document\./,
    /window\./,
  ];

  static sanitize(code: string): string {
    // Check for potentially dangerous patterns
    for (const pattern of this.BLOCKED_PATTERNS) {
      if (pattern.test(code)) {
        throw new Error('Potentially harmful code detected');
      }
    }
    return code;
  }

  static validateInput(input: string): string {
    if (input.length > 1000) {
      throw new Error('Input exceeds maximum length');
    }
    return input;
  }
}