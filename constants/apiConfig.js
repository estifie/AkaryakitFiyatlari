export const API_VERSION = "v1";
export const BASE_URL = `http://192.168.1.46:3000`;
export const API_URL = `${BASE_URL}/api/${API_VERSION}`;
export const FUELS_URL = `${API_URL}/fuel`;
export const CITIES_URL = `${API_URL}/city`;
export const DISTRICTS_URL = `${CITIES_URL}/{cityId}/districts`;
export const STATIONS_URL = `${API_URL}/station/stations`;
export const PUBLIC_URL = `${BASE_URL}/public/`;
