import { fetchAsJson } from '@site/src/utils/helpers';
import { getStorageItem } from '@site/src/utils/store';

type PackagistData = Record<string, unknown>;

/**
 * Get Packagist Data from localStorage or make an API request and cache data for a day.
 */
export async function getPackagistData(vendor: string, project: string, cacheKey: string, forceFresh = false): Promise<PackagistData> {
  const packagistData = getStorageItem<PackagistData>(cacheKey);
  const cachedDate = getStorageItem<string>(`${cacheKey}_date`);
  const oneDay = 24 * 60 * 60 * 1000; // 24 hours in ms

  const parsedData = packagistData ?? null;
  const parsedDate = cachedDate ? new Date(parseInt(cachedDate, 10)) : null;
  const isCacheValid = parsedData && parsedDate && Date.now() - parsedDate.getTime() <= oneDay;

  if (isCacheValid && !forceFresh) {
    return JSON.parse(parsedData);
  }

  const json = await fetchAsJson<{ package: PackagistData }>(`https://packagist.org/packages/${vendor}/${project}.json?ts=${Date.now()}`)
  localStorage.setItem(cacheKey, JSON.stringify(json.package));
  localStorage.setItem(`${cacheKey}_date`, Date.now().toString());

  return json.package;
}


function semverCompare(a: string, b: string): number {
  const aParts = a.split(".");
  const bParts = b.split(".");
  for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
    const aPart = Number(aParts[i]) || 0;
    const bPart = Number(bParts[i]) || 0;
    if (aPart < bPart) {
      return -1;
    } else if (aPart > bPart) {
      return 1;
    }
  }
  return 0;
}

export function getLatestVersionByMajor(majorVersion: string, versions: Record<string, unknown>): string | undefined {
  const major = 'v' + majorVersion.replace('.x', '');

  return Object.keys(versions)
    .filter(version => version.startsWith(major))
    .sort((a, b) => semverCompare(b, a))[0];
}
