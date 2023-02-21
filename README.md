# Delete untagged GitHub Container Registry images

A very simple GitHub Action to delete untagged GitHub Container
Registry images.  Example usage:

```
name: Clean up old Docker image versions

on:
  workflow_dispatch:

jobs:
  cleanup:
    name: Cleanup
    runs-on: ubuntu-latest
    steps:
      - name: Clean up covid-19-puerto-rico-website
        uses: sacundim/delete-untagged-ghcr-action@v1
        with:
          package: [your package name]
```
