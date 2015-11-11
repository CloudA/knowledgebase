/*
Title: Backups | Duplicity
Sort: 9
*/

Bulk Storage is a perfect destination for backups and archived data, and there
are a number of Backup solutions that support Swift as a backend, a quick
search turns up the following list:

 - [Duplicity](http://duplicity.nongnu.org/)
 - [BackupNinja](https://launchpad.net/backupninja)
 - [Zmanda](http://www.zmanda.com/) (windows)
 - [Commvault Simpana](http://www.commvault.com/solutions-cloud-integration.html)

This is a quick example on how to use configure and start using Duplicity to
backup files to Cloud-A's Bulk Storage service on an Ubuntu 12.04 server.

### Installing Dependencies

```
pip install python-swiftclient
pip install python-keystoneclient
pip install lockfile
```

You'll need to also install the rsync dev library.

Ubuntu or Debian:
```
apt-get install librsync-dev
```

CentOS, Fedora < 22, or RHEL:
```
yum install librsync-devel
```

Fedora >= 22:
```
dnf install librsync-devel
```

### Download and Install Duplicity

The latest version of Duplicity is required, as swift support was recently
added to the project, so we'll grab the latest release at the time of writing
(0.6.26) from launchpad, and install.

```
wget https://launchpad.net/duplicity/0.6-series/0.6.26/+download/duplicity-0.6.26.tar.gz
tar -zxvf duplicity-0.6.26.tar.gz
cd duplicity-0.6.26/
python setup.py install
```

### Configure Authentication

You'll need to export a couple key environment variables for Duplicity to work
correctly. After you have everything working, I'd highly suggest adding these
to a more permanent location on your server so you can automate your backups
more easily.

#### Keystone Authentication

```
export SWIFT_USERNAME=<TENANT_NAME>:<USER_NAMEL>
export SWIFT_PASSWORD=<PASSWORD>
export SWIFT_AUTHURL=https://keystone.ca-ns-1.clouda.ca:8443/v2.0
export SWIFT_AUTHVERSION=2
```

#### Container Keys Authentication

```
export SWIFT_USERNAME=<TENANT_NAME>:Full-Key
export SWIFT_PASSWORD=<Container Key>
export SWIFT_AUTHURL=https://ca-ns-1.bulkstorage.ca:8444/keys_auth/<container_name>
export SWIFT_AUTHVERSION=2
```

### Execute your first backup!

The first backup with Duplicity will be a full backup, and subsequent backups
will be incremental and take much less time to complete. Although our example
uses the "--no-encryption" option, we **highly** suggest configuring the backup
encryption for your data. For the sake of expediency, we'll throw caution to
the wind.

```
duplicity --no-encryption /dir/to/backup swift://my_backups
```

If you're interested in how it stores full and incremental backups, you can
view the container in your dashboard at
`https://dash.clouda.ca/project/containers/my_backups` and see your backup
data in action!

### Restore your backup
Restoring backups are just as easy as creating them. Here's an example of a
full restore!

```
duplicity --no-encryption swift://my_backups /dir/to/restore
```

For more information on using Duplicity, check their official docs page:
http://duplicity.nongnu.org/docs.html. There is a wealth of information
available for this powerful and flexible backup tool.
