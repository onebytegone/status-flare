# Status Flare

[![Build Status](https://travis-ci.org/onebytegone/status-flare.svg?branch=master)](https://travis-ci.org/onebytegone/status-flare)
[![Coverage Status](https://coveralls.io/repos/github/onebytegone/status-flare/badge.svg?branch=master)](https://coveralls.io/github/onebytegone/status-flare?branch=master)
[![Dependency Status](https://david-dm.org/onebytegone/status-flare.svg)](https://david-dm.org/onebytegone/status-flare)
[![Dev Dependency Status](https://david-dm.org/onebytegone/status-flare/dev-status.svg)](https://david-dm.org/onebytegone/status-flare?type=dev)

## Setup

This utility can be installed via `npm`:

```
npm install -g status-flare
```

The `config` directory is located within the package. The path to the package can be found using:

```
npm list -g status-flare
```

### If using Gmail as transport:

1. Setup [app password](https://security.google.com/settings/security/apppasswords) if needed ([Help doc](https://support.google.com/accounts/answer/185833?hl=en))
2. Create the needed config file at `config/custom-user.json`:

   ```json
   {
      "email": {
         "account": {
            "user": "statusflare@example.com",
            "pass": "PASSWORD"
         }
      }
   }
   ```

3. (Optional) Add a `from` field under `email.account`

   ```
   "from": "\"Status Flare @ STATUSFLAREHOST\" <statusflare@example.com>",
   ```


## Examples

### Basic CLI usage

```
NODE_ENV=custom-user status-flare --to 'youremail@example.com' --subject 'Hello World' --body 'Status Flare is working'
```

### Using `stdin`

```
echo "From stdin" | NODE_ENV=custom-user status-flare --to 'youremail@example.com' --subject 'Hello World' --body
'No data from stdin'
```


## License

This is released under the MIT license. See [LICENSE.md](LICENSE.md) for more information.
