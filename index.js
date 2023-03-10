const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    const package_name = core.getInput('package');
    const per_page = core.getInput('per-page');
    const token = core.getInput('token');

    const octokit = github.getOctokit(token)

    const versionsResponse = await octokit.request(
        'GET /user/packages/{package_type}/{package_name}/versions', 
        {
            package_type: 'container',
            package_name: package_name,
            per_page: per_page,
            state: 'active'
        }
    );

    if (core.isDebug()) {
        core.debug("versions = " + versions);
    }

    for(version of versionsResponse.data) {
        if (version.metadata.container.tags.length == 0) {
            core.info("delete " + version.id)
            const deleteResponse = await octokit.request(
                'DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}', 
                {
                    package_type: 'container',
                    package_name: package_name,
                    package_version_id: version.id
                }
            );
            core.info("delete status " + deleteResponse.status)
        } else {
            core.info("Keeping version: " + version.id);
        }
    }
}

run();
