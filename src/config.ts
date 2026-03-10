import { loadFromPath } from "./generated/config.pkl";
// No "meta-configuration" here. Just a static path.
export const AppConfig = await loadFromPath("./config.pkl");