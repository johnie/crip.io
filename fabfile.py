from __future__ import with_statement

import os.path

from fabric.api import *
from fabric.contrib.project import *

"""
Environments
"""

def prod():
  env.hosts = ['162.243.196.109']
  env.user = 'johnie'
  env.path = '/usr/share/nginx/www/crip/public_html'

prod()

"""
Deployment
"""

def deploy():
  require('path', provided_by=[prod])

  extra_opts = '--omit-dir-times --no-perms'
  rsync_project(
    env.path,
    '%s/' % os.path.dirname(__file__),
    ['log/*', 'cache/*', '.git', '.DS_Store', 'fabfile.py*', 'node_modules/*', '.sass-cache/*'],
    False,
    extra_opts=extra_opts,
  )

  with cd(env.path):
    run('jekyll build')
