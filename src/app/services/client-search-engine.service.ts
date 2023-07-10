/**
 * Provides an abstraction to make efficient search operations based on prefixes.
 * This service can't be injected and should instead be instantiated every time a new set of data is needed
 */
export class ClientSearchEngineService {
  private trie: Trie | undefined;

  constructor() {
    this.trie = {};
  }

  initSearchEngine(data: string[]): void {
    this.resetSearchEngine();

    for (const term of data) {
      let cur = this.trie;
      const normalizedTerm = `${term.toLowerCase().trim()}$`;
      for (const char of normalizedTerm) {
        const c = char as Char;

        if (!cur![c]) {
          cur![c] = {};
        }

        cur = cur![c];
      }
    }
  }

  query(query: string): string[] {
    const normalizedQuery = query.toLowerCase().trim();

    let cur = this.trie;
    for (const char of normalizedQuery) {
      const c = char as Char;

      if (!cur![c]) {
        // The query did not match any result
        return [];
      }

      cur = cur![c];
    }

    return this.getAllTerms(cur!, query);
  }

  private getAllTerms(cur: Trie, currentTerm: string, res: string[] = []): string[] {
    const chars = Object.keys(cur);

    for (const char of chars) {
      const c = char as Char;

      if (c === '$') {
        res.push(currentTerm);
      } else {
        this.getAllTerms(cur![c]!, `${currentTerm}${c}`, res);
      }
    }

    return res;
  }

  private resetSearchEngine(): void {
    this.trie = {};
  }
}

type Char = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'k' | 
'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 
'x' | 'y' | 'z' | '$' | ' ';

type Trie = {
  [index in Char]?: Trie;
};
