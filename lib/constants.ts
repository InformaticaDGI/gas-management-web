/**
 * @constant
 * URL base para la API de GraphQL de suministro y facturación para gas doméstico.
 */

export const API_BASE_URL: string = "https://demo-api-sgd.guarico.gob.ve/graphql";

/**
 * @constant
 * Factor de conversión para cilindros: Litros por Kilogramo (L/Kg).
 * Usado en la fórmula: Volumen (L) = Capacidad (Kg) * CILINDER_CONVERSION_FACTOR
 */
export const CILINDER_CONVERSION_FACTOR: number = 1.97;

/**
 * @constant
 * Factor de conversión para granel: Litros por Galón (L/Galón).
 * Usado en la fórmula: Volumen (L) = Volumen de Venta (Galones) * BULK_CONVERSION_FACTOR
 */
export const BULK_CONVERSION_FACTOR: number = 3.7854;
