export function parseJSONSafely(value: string): any {
    if (value.length > 1) {
        try {
        return JSON.parse(value);
        } catch (e) {
        console.error('Error parsing JSON:', e);
        return [];
        }
    } else {
        return [];
    }
    
  }