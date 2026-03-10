## Template for bun/pkl docker service
### Idea
- Configuration schema defined in `config/AppConfig.pkl`
- Defaults defined in `config/default.pkl`
- Types generated with [@pkl-community/pkl-typescript](https://github.com/pkl-community/pkl-typescript) (`bun run gen:config-types`)
- Defaults overridden with `./config.pkl`
- Validation done with `@pkl-community/pkl-typescript` once on program start.
    - The service stays agnostic to the schema and validation.

- No "meta-configuration"; everything is through Pkl.

### Warning

- [@pkl-community/pkl-typescript](https://github.com/pkl-community/pkl-typescript) is in pre-release. Had some problems with generating the types with the bun script in the docker build stage, so for now that will have to be invoked manually before build.

### Dev usage
1. Install deps `bun install`
2. Modify configs -> update src types `bun run gen:config:types`