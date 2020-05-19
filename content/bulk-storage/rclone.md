/*
Title: Application | rclone
Sort: 7
*/

> updated for rclone 1.51.0

`rclone` is an rsync-like utility which copies data between a Linux host and 
an object storage provider. This article will show how to configure `rclone` 
to sync files with Bulk Storage using using [container key](/bulk-storage/container-keys) auth.

## Installing rclone

There are several ways to install `rclone`, all of which are pretty 
straightforward. You can visit their [installation page](https://rclone.org/install/)
for more info.

## Configuring rclone using Container Keys

You can configure your container to use container keys by following our 
[documentation](/bulk-storage/container-keys).

The following will show you how to use `rclone config` to connect to Bulk 
Storage. In the commands below, replace `MYAPIKEY` with your Container's Full-Key,
`MYCONTAINER` with the container name, and `TENANTID` with your Tenant ID.
Don't worry if you've made a small mistake in the `rclone config` wizard, you
can quickly edit the configuration afterward at `~/.config/rclone/rclone.conf`.

> If you don't know your Tenant ID, you can find it in the
> dashboard under [API Access](https://dash.clouda.ca/project/api_access/).


```asciidoc
$ rclone config
No remotes found - make a new one
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n
name> clouda
Type of storage to configure.
Choose a number from below, or type in your own value
[...]
Storage> swift
env_auth> false
user> Full-Key
key> MYAPIKEY
auth> https://ca-ns-1.bulkstorage.ca/keys_auth/MYCONTAINER
user_id>
domain>
tenant>
tenant_id> TENANTID
tenant_domain>
region> regionOne
storage_url>
auth_token>
application_credential_id>
application_credential_name>
application_credential_secret>
auth_version> 2
endpoint_type> public
storage_policy>

Edit advanced config? (y/n)
y/n> n

Remote config
--------------------
[clouda]
type = swift
env_auth = false
user = Full-Key
key = MYAPIKEY
auth = https://ca-ns-1.bulkstorage.ca/keys-auth/MYCONTAINER
tenant_id = TENANTID
region = regionOne
auth_version = 2
endpoint_type = public
--------------------
y) Yes this is OK (default)
y/e/d> y
Current remotes:

Name                 Type
====                 ====
clouda               swift

q) Quit config
e/n/d/r/c/s/q> q
```

To sync data to your new rclone remote, use the following format:

```asciidoc
$ rclone copy test clouda:/MYCONTAINER
```

This will copy a file or folder named `test` on your local machine into your
container `MYCONTAINER`, and subsequent uploads will check to see if there
is a difference in the remote and local files before uploading.

## Configuring Encryption

By default, `rclone` sends data in plaintext, and Bulk Storage will store it as such. If you need to encrypt your data,
 rclone provides a built in mechanism to do so. It's as simple as setting up a separate remote of the `encrypt` type and
uploading data to that remote instead of to the Cloud-A remote directly.

```asciidoc
$ rclone config
e/n/d/r/c/s/q> n
name> secret
Storage> crypt
remote> clouda:MYCONTAINER
filename_encryption> standard
directory_name_encryption> true

Password or pass phrase for encryption.
y) Yes type in my own password
g) Generate random password
y/g> y

Enter the password:
password:
Confirm the password:
password:

Password or pass phrase for salt. Optional but recommended.
Should be different to the previous password.
y) Yes type in my own password
g) Generate random password
n) No leave this optional password blank
y/g/n> n

Remote config
--------------------
[secret]
type = crypt
remote = clouda:MYCONTAINER
filename_encryption = standard
password = *** ENCRYPTED ***
password2 =
--------------------
y) Yes this is OK
e) Edit this remote
d) Delete this remote
y/e/d> y
```

The above will create a remote called "secret" that's encrypted using a 
passphrase of your choice with no salt. Feel free to change the encryption 
settings as you see fit.

To sync data to your new encrypted remote, use the following:

```asciidoc
$ rclone copy test secret:/test
```

That will encrypt and copy a file / folder named `test` from your local 
machine to `MYCONTAINER/test/` on Bulk Storage.

If you'd like to restore the files you've backed up using rclone, simply run
the following:

```asciidoc
$ rclone copy secret:/test test-restore
```

