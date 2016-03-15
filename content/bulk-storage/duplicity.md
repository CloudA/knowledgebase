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

You'll need to first install the python and rsync dev libraries.

Ubuntu or Debian:
```asciidoc
apt-get install python-dev librsync-dev
```

CentOS, Fedora < 22, or RHEL:
```asciidoc
yum install python-dev librsync-devel
```

Fedora >= 22:
```asciidoc
dnf install python-dev librsync-devel
```


```asciidoc
pip install python-swiftclient
pip install python-keystoneclient
pip install lockfile
```



### Download and Install Duplicity

You'll need at least version 0.6.26 of Duplicity to have swift support which
should be provided by most distributions at this point.

Ubuntu or Debian:
```asciidoc
apt-get install duplicity
```

CentOS, Fedora < 22, or RHEL:
```asciidoc
yum install duplicity
```

Fedora >= 22:
```asciidoc
dnf install duplicity
```

### Configure Authentication

You'll need to export a couple key environment variables for Duplicity to work
correctly. After you have everything working, I'd highly suggest adding these
to a more permanent location on your server so you can automate your backups
more easily.

#### Keystone Authentication

You can get your <TENANT_NAME> and <USERNAME> from
[API Access](https://dash.clouda.ca/project/api_access/) in your Account details.


```asciidoc
export SWIFT_USERNAME=<TENANT_NAME>:<USERNAME>
export SWIFT_PASSWORD=<PASSWORD>
export SWIFT_AUTHURL=https://keystone.ca-ns-1.clouda.ca:8443/v2.0
export SWIFT_AUTHVERSION=2
```

#### Container Keys Authentication

You will first need to create a container by clicking "New Container" on the [Containers](https://dash.clouda.ca/project/containers/) page. Then click "Keys",
and "Generate Initial Keys." You'll want to use the  "Full Access Key" as your
<Container Key>.

You can get your <TENANT_ID> from
[API Access](https://dash.clouda.ca/project/api_access/) in your Account details.


```asciidoc
export SWIFT_USERNAME=<TENANT_ID>:Full-Key
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

<container_name> is the same container you created before.

```asciidoc
duplicity --no-encryption /dir/to/backup swift://<container_name>
```

If you're interested in how it stores full and incremental backups, you can
view the container in your dashboard at
`https://dash.clouda.ca/project/containers/my_backups` and see your backup
data in action!

### Restore your backup
Restoring backups are just as easy as creating them. Here's an example of a
full restore!

```asciidoc
duplicity --no-encryption swift://my_backups /dir/to/restore
```

For more information on using Duplicity, check their official docs page:
http://duplicity.nongnu.org/docs.html. There is a wealth of information
available for this powerful and flexible backup tool.
