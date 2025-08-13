// fetcher.ts
const BASE_URL = process.env.API_URL;
if (!BASE_URL) {
  throw new Error(
    "API_URL n'est pas défini dans les variables d'environnement."
  );
}

type NextOptions = {
  next?: { revalidate: number };
};

export type FetcherInit = RequestInit & NextOptions;

// Réponse en cas de succès
export interface ApiResponseSuccess<T> {
  data: T;
  error?: never;
}

// Réponse en cas d’erreur
export interface ApiResponseError {
  data: null;
  error: string;
}

// Union discriminée
export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;

/**
 * fetcher<T>
 * @param path  Chemin relatif à BASE_URL (sans slash initial)
 * @param init  Options Fetch (headers, body, method...) + Next.js revalidation
 * @returns     Promise<ApiResponse<T>>
 */
export async function fetcher<T>(
  path: string,
  init: FetcherInit = {}
): Promise<ApiResponse<T>> {
  const url = new URL(path, BASE_URL).toString();

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        // ajoutez ici vos tokens si besoin
      },
      ...init,
    });

    if (!res.ok) {
      const errText = await res.text();
      return {
        data: null,
        error: `API error ${res.status}: ${errText}`,
      };
    }

    // On suppose que la réponse JSON est bien au format T
    const json = (await res.json()) as T;
    return { data: json };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : String(err) || "Erreur inconnue";
    return {
      data: null,
      error: message,
    };
  }
}
