export default function parseStringAsArray(arrayAsString: string): string[] {
  return arrayAsString.split(',').map(tech => tech.trim());
}
