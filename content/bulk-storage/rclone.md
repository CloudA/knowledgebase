/*
Title: Application | rclone
Sort: 9
*/

`rclone` is an rsync-like utility which copies data between a Linux host and an object storage provider. This article 
will show how to configure `rclone` to sync files with Bulk Storage using using [container key](/bulk-storage/container-keys)
 auth. 

## Installing rclone

There are several ways to install `rclone`, all of which are pretty straightforward. You can visit
 their [installation page](https://rclone.org/install/) for more info.

## Configuring rclone using Container Keys

You can configure your container to use container keys by following our [documentation](/bulk-storage/container-keys).

The following will show you how to use `rclone config` to connect to Bulk Storage:

```asciidoc
$ rclone config
No remotes found - make a new one
n) New remote
s) Set configuration password
q) Quit config
n/s/q> n
name> Cloud-A
Type of storage to configure.
Choose a number from below, or type in your own value
 1 / Amazon Drive
   \ "amazon cloud drive"
 2 / Amazon S3 (also Dreamhost, Ceph, Minio)
   \ "s3"
 3 / Backblaze B2
   \ "b2"
 4 / Dropbox
   \ "dropbox"
 5 / Encrypt/Decrypt a remote
   \ "crypt"
 6 / FTP Connection
   \ "ftp"
 7 / Google Cloud Storage (this is not Google Drive)
   \ "google cloud storage"
 8 / Google Drive
   \ "drive"
 9 / Hubic
   \ "hubic"
10 / Local Disk
   \ "local"
11 / Microsoft OneDrive
   \ "onedrive"
12 / Openstack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
   \ "swift"
13 / SSH/SFTP Connection
   \ "sftp"
14 / Yandex Disk
   \ "yandex"
15 / http Connection
   \ "http"
Storage> 12
User name to log in.
user> Full-Key
API key or password.
key> MyAPIKey
Authentication URL for server.
Choose a number from below, or type in your own value
 1 / Rackspace US
   \ "https://auth.api.rackspacecloud.com/v1.0"
 2 / Rackspace UK
   \ "https://lon.auth.api.rackspacecloud.com/v1.0"
 3 / Rackspace v2
   \ "https://identity.api.rackspacecloud.com/v2.0"
 4 / Memset Memstore UK
   \ "https://auth.storage.memset.com/v1.0"
 5 / Memset Memstore UK v2
   \ "https://auth.storage.memset.com/v2.0"
 6 / OVH
   \ "https://auth.cloud.ovh.net/v2.0"
auth> https://ca-ns-1.bulkstorage.ca:8444/keys_auth/mycontainer
User domain - optional (v3 auth)
domain> 
Tenant name - optional for v1 auth, required otherwise
tenant> TENANTID
Tenant domain - optional (v3 auth)
tenant_domain> 
Region name - optional
region> regionOne
Storage URL - optional
storage_url> 
AuthVersion - optional - set to (1,2,3) if your auth URL has no version
auth_version> 2
Remote config
--------------------
[ca]
user = Full-Key
key = MyAPIKey
auth = https://ca-ns-1.bulkstorage.ca:8444/keys_auth/mycontainer
domain = 
tenant = TENANTID
tenant_domain = 
region = regionOne
storage_url = 
auth_version = 2
--------------------
y) Yes this is OK
e) Edit this remote
d) Delete this remote
y/e/d> y
```

Be sure to replace `MyAPIKey`, `mycontainer`, and `TENANTID` with your Full-Key, container name, 
and tenant ID respectively.

## Configuring Encryption

By default, `rclone` sends data in plaintext, and Bulk Storage will store it as such. If you need to encrypt your data,
 rclone provides a built in mechanism to do so. It's as simple as setting up a separate remote of the `encrypt` type and 
uploading data to that remote instead of to the Cloud-A remote directly.

```asciidoc
$ rclone config
e/n/d/r/c/s/q> n
name> secret
Type of storage to configure.
Choose a number from below, or type in your own value
 1 / Amazon Drive
   \ "amazon cloud drive"
 2 / Amazon S3 (also Dreamhost, Ceph, Minio)
   \ "s3"
 3 / Backblaze B2
   \ "b2"
 4 / Dropbox
   \ "dropbox"
 5 / Encrypt/Decrypt a remote
   \ "crypt"
 6 / FTP Connection
   \ "ftp"
 7 / Google Cloud Storage (this is not Google Drive)
   \ "google cloud storage"
 8 / Google Drive
   \ "drive"
 9 / Hubic
   \ "hubic"
10 / Local Disk
   \ "local"
11 / Microsoft OneDrive
   \ "onedrive"
12 / Openstack Swift (Rackspace Cloud Files, Memset Memstore, OVH)
   \ "swift"
13 / SSH/SFTP Connection
   \ "sftp"
14 / Yandex Disk
   \ "yandex"
15 / http Connection
   \ "http"
Storage> 5
Remote to encrypt/decrypt.
Normally should contain a ':' and a path, eg "myremote:path/to/dir",
"myremote:bucket" or maybe "myremote:" (not recommended).
remote> Cloud-A:mycontainer
How to encrypt the filenames.
Choose a number from below, or type in your own value
 1 / Don't encrypt the file names.  Adds a ".bin" extension only.
   \ "off"
 2 / Encrypt the filenames see the docs for the details.
   \ "standard"
 3 / Very simple filename obfuscation.
   \ "obfuscate"
filename_encryption> 2
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
remote = Cloud-A:mycontainer
filename_encryption = standard
password = *** ENCRYPTED ***
password2 = 
--------------------
y) Yes this is OK
e) Edit this remote
d) Delete this remote
y/e/d> y
```

The above will create a remote called "secret" that's encrypted using a passphrase of your choice with no salt. Feel 
free to change the encryption settings as you see fit.

To sync data to your new encrypted remote, use the following:

```asciidoc
$ rclone copy test secret:test/
```

That will encrypt and copy a file / folder named `test` from your local machine to `mycontainer:test/` on Bulk Storage.
