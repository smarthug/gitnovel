import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as git from 'isomorphic-git'

import FS from '@isomorphic-git/lightning-fs'

const useStyles = makeStyles(theme => ({

}))


export default function () {
    const classes = useStyles()

    useEffect(() => {
        window.fs = new FS('fs')
        git.plugins.set('fs', window.fs)
        // I prefer using the Promisified version honestly
        var pfs = window.fs.promises

        Test(pfs)
    }, [])

    return (
        <div>Hello ,git</div>
    )
}

async function Test(pfs) {
    var dir = '/tutorial'
    console.log(dir);
    //await pfs.mkdir(dir);
    // Behold - it is empty!
    await pfs.readdir(dir);


    await git.clone({
        dir,
        corsProxy: 'https://cors.isomorphic-git.org',
        url: 'https://github.com/isomorphic-git/isomorphic-git',
        ref: 'master',
        singleBranch: true,
        depth: 10
    });

    // Now it should not be empty...
    await pfs.readdir(dir);

    await git.log({ dir })

    await git.status({ dir, filepath: 'README.md' })

    await pfs.writeFile(`${dir}/README.md`, 'Very short README', 'utf8')
    await git.status({ dir, filepath: 'README.md' })

    let sha = await git.commit({
        dir,
        message: 'Delete package.json and overwrite README.',
        author: {
          name: 'Mr. Test',
          email: 'mrtest@example.com'
        }
      })

      console.log(sha)

      console.log('whihi')
}

